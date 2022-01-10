import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import StarIcon from "@material-ui/icons/StarOutlined";
import { InputLabel, Input, InputTypeBox, Select } from "./RegisterBody";
import { Container, MainBody, ViewProfile } from "./Appointments";
import SideBar from "./SideBar";
import { ProfileImage } from "./Overview";
import { getHospitals, getLocation } from "../redux/actions";
import { locations } from "../utils/utils";
import useForm from "../utils/useForm";
import { useHistory } from "react-router-dom";

export const DocAppointment = ({ name, NoIcon }) => {
  return (
    <DocDesc>
      <DocImg>
        <img
          src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg"
          alt=""
        />
      </DocImg>
      <DocDetails>
        <DName>{name}</DName>
        <DRating>
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon className="nostar" />
        </DRating>
        <DProfile>
          <ViewProfile>View profile</ViewProfile>
        </DProfile>
        <DTime>
          <Icon>
            <i class="fas fa-calendar-alt"></i> &nbsp;
          </Icon>
          <Time> 10:45AM GMT +1 </Time>
          <Icon>
            {NoIcon ? "" : <i className="fas fa-chevron-down down"></i>}
          </Icon>
        </DTime>
      </DocDetails>
    </DocDesc>
  );
};

export const BookAppointment = ({ name }) => {
  let routerHistory = useHistory();
  const pricing = () => {
    routerHistory.push("/pricings")
}
  return (
    <BookingDetails>
      <DocAppointment name={name} />
      <BookBtn>
        <Button onClick={pricing}>Book</Button>
      </BookBtn>
    </BookingDetails>
  );
};

 //calculate distance in KM using longitude and latitude
 const getDistance = (origin, destination) => {
  const [lat1, lon1] = origin;
  const [lat2, lon2] = destination;
  const radius = 6371; //km 25.99765215004212

  const differenceOfLatitude = Math.radians(lat2 - lat1);
  const differenceOfLongitude = Math.radians(lon2 - lon1);
  const a =
    Math.sin(differenceOfLatitude / 2) * Math.sin(differenceOfLatitude / 2) +
    Math.cos(Math.radians(lat1)) *
      Math.cos(Math.radians(lat2)) *
      Math.sin(differenceOfLongitude / 2) *
      Math.sin(differenceOfLongitude / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = radius * c;
  return distance;
};

 Math.radians = (degree) => degree * Math.PI / 180;

  // the appointment function
  const AppointmentComponent = ({hospitals, sidebar, values, errors, locationAccess, setValues, handleChange}) => {
    const longitude = localStorage.getItem("longitude");
    const latitude = localStorage.getItem("latitude");
    const [location, setLocation] = useState("");
    console.log(hospitals, "here");
   
    const hospitalsWithDistance = hospitals.map(hospital => {
      return {
        ...hospital,
        distance: getDistance([latitude, longitude], [parseFloat(hospital.latitude), parseFloat(hospital.longitude)])
      }
    })
   // console.log(hospitalsWithDistance.sort((a, b) => a.distance - b.distance), "distance")
    const [filterHospitals, setFilterHospitals] = useState([])
    

    // filter onSubmit
  const getDoctor = (e) => {
    e.preventDefault();
   // console.log(values.location, "valiues")
     const filteredHospitals = hospitals.filter(hospital => {
      return hospital.city == values.location || hospital.state == values.location
    })
    setFilterHospitals(filteredHospitals)
}

    return (
      <Containa>
        <Title>Select Appointment</Title>
        <SelectBox sidebar={sidebar}>
          <div>
            <InputLabel htmlFor="Location"> Location </InputLabel>
            <InputTypeBox className="selectAppointment">
              <Select
                className="selectAppointment"
                border={errors.location && "1px solid red"}
                name="location"
                value={location}
                style={location? {color: "#000000"} : {color : "#bdbdbe"}} 
                onChange={(e) => {
                  const selectedLocation = e.target.value;
                  setLocation(selectedLocation);
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  });
                  
                }}
              >

                <option value="" hidden>
                  Location
                </option>
                {Object.entries(locations).map(([key, value], id) => {
                  return (
                    <option key={id} value={value}>
                      {value}
                    </option>
                  );
                })}
              </Select>
            </InputTypeBox>
          </div>
          <SecondInputBox>
            <div>
              <InputLabel htmlFor="Date"> Date </InputLabel>
              <Input
                type="date"
                name="date"
                border={errors.date && "1px solid red"}
                value={values.date}
                onChange={handleChange}
                placeholder="01/01/2020"
              />
            </div>
            <div>
              <InputLabel htmlFor="Persona"> Persona </InputLabel>
              <Input type="text" placeholder="Adult" />
            </div>
          </SecondInputBox>
          <div>
            <ViewMore className="search">
              <Button className="search" onClick={getDoctor}>Search</Button>
            </ViewMore>
          </div>
        </SelectBox>
        <Bookings sidebar={sidebar}>
          <Available>Available</Available>
          <Margin></Margin>
          {
           locationAccess ? 
           (hospitalsWithDistance.sort((a, b) => a.distance - b.distance).map(hospital => {
            return hospital.doctors.map(doctor => {
             return <BookAppointment key={hospital.id} name={doctor.name} />
            })
           }) 
           )
           : 
           (
            filterHospitals?.map(hospital => {
              return hospital.doctors.map(doctor => {
                return <BookAppointment key={hospital.id} name={doctor.name} />
              })
            })
           )
          }
          <Margin className="booking"></Margin>

          <ViewMore>
            <Button className="nobtn">
              View more <i class="fas fa-angle-right"></i>{" "}
            </Button>
          </ViewMore>
        </Bookings>
      </Containa>
    );
  };


//The appointment component functions
function SelectAppointments({ openSidebar, getHospitals, hospitals, locationAccess }) {

  const {
    values,
    errors,
    setErrors,
    setDisabledSubmit,
    handleChange,
    handleBlur,
    setValues,
    disabledSubmit,
    setIsSubmit,
  } = useForm("selectAppointment");
  

  useEffect(() => {
    //getHospitals();
  },[]);


  return (
    <Container sidebar={openSidebar}>
      <SideBar />
      <MainBody>
        <ProfileImage>
          <img
            src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg"
            alt=""
          />
        </ProfileImage>
        <AppointmentComponent hospitals={hospitals} sidebar={openSidebar} values={values} errors={errors} locationAccess={locationAccess} setValues={setValues} handleChange={handleChange}/>
      </MainBody>
    </Container>
  );
}

const mapStateProps = (state) => ({
  openSidebar: state.utils.openSidebar,
  hospitals: state.hospital.hospitals,
  locationAccess: state.hospital.locationAccess,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getHospitals: () => dispatch(getHospitals()),
  };
};
export default SelectAppointments = connect(
  mapStateProps,
  mapDispatchToProps
)(SelectAppointments);

export const Containa = styled.div`
  padding: 2em 0;
  //background: linear-gradient(180deg, #e7e7ed, #ffffff);
  margin: 0 auto;
  margin-right: 0.5em;
  margin-top: 5em;
  margin-left: 0.5em;
  color: #070647;
  border-radius: 15px;
  &.pricing{
    margin-top: 0em;
  }
`;

export const IconBox = styled.div`
  > .MuiSvgIcon-root {
    font-size: 4em;
    color: #070647;
  }
`;
export const Title = styled.h2`
  width: 100%;
  font-size: 2.5em;
  text-align: center;

  &.pricing{
    margin-bottom: 4em;
  }
`;
const SelectBox = styled.div`
  display: grid;
  grid-template-columns: 30% 45% 20%;
  column-gap: 2em;
  width: 100%;
  margin: 2em auto 1em auto;
  position: relative;
  left: -1em;
  @media (max-width: ${500}px) {
    grid-template-columns: 1fr;
    width: ${({ sidebar }) => (sidebar ? "100%" : "110%")};
    left: ${({ sidebar }) => (sidebar ? "0em" : "-3em")};
  }
  > div {
    padding: 0;
    font-size: 1.5em;
    @media (max-width: ${500}px) {
      width: 100%;
      margin: 0 auto;
      padding: 0em;
    }
    input {
      border: 2px solid #2fa5a9;
      width: 100%;
      padding: 0.5em;
      font-size: 1em;
      line-height: 21px;
      background-color: inherit;
      @media (max-width: ${750}px) {
        width: 70%;
      }
      @media (max-width: ${500}px) {
        width: 100%;
        margin-bottom: 1em;
        border: 1px solid #2fa5a9;
        height: unset;
      }
    }
    > div {
      @media (max-width: ${500}px) {
        //justify-content:flex-s;
      }
    }
  }
`;
const Bookings = styled.div`
  padding: 0 5em;
  width: 50em;
  margin: 0 auto;
  margin-top: 4em;
  font-size: 1.2em;
  position: relative;
  right: 2em;
  @media (max-width: ${500}px) {
    width: 100%;
    padding: 0 0em;
    right: ${({ sidebar }) => (sidebar ? "0em" : "2em")};
  }
`;

const Available = styled.div`
  width: 7em;
  color: white;
  background-color: #2fa5a9;
  padding: 0.2em 1em;
  font-weight: 600;
  border-radius: 5px;
`;

export const Margin = styled.div`
  width: 100%;
  height: 1px;
  background-color: #2fa5a9;
  @media (max-width: ${500}px) {
    margin-bottom: 2em;
    &.notify {
      background-color: #c4c4c4;
      margin-bottom: 0;
      //margin-top: 2em;
    }
  }
  &.booking {
    @media (max-width: ${500}px) {
      display: none;
    }
  }
`;
const BookingDetails = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1em 0;
  align-items: center;

  @media (max-width: ${500}px) {
    background-color: #e9e9ef;
    border-radius: 16px;
    padding: 1em;
    margin-bottom: 1em;
  }
`;
const DocImg = styled.div`
  > img {
    height: 4em;
    width: 4em;
    border-radius: 50%;
  }
`;

const DocDesc = styled.div`
  display: flex;
  justify-content: space-between;
  width: 16em;

  @media (max-width: ${500}px) {
    width: unset;
    justify-content: none;
  }
`;

const DocDetails = styled.div`
  display: block;
`;

const DName = styled.h3`
  padding-left: 0.5em;
  font-size: 1em;
`;
const DRating = styled.div`
  display: flex;
  padding-left: 0.7em;
  > .MuiSvgIcon-root {
    fill: #ffe324;
    font-size: 1.2em;

    &.nostar {
      fill: #bdbdbe;
    }
  }
`;
const DProfile = styled.div`
  padding-left: 0.5em;
  > span {
    font-size: 11px;
    font-weight: 600;
  }
`;
const DTime = styled.div`
  display: flex;
  font-size: 0.9em;
  color: green;
  width: 100%;
  justify-content: space-evenly;
`;
export const Icon = styled.span`
  padding-left: 0.5em;
  > i {
    color: #8d82828f;
    font-weight: 500;
    &.down {
      font-weight: 900;
    }
  }
  &.noLeftPadding {
    display: none;
    @media (max-width: ${500}px) {
      display: block;
      padding-left: 0;
      padding-right: 0.5em;
    }
  }
  &.big {
    font-size: 2em;
    padding-right: 0.2em;
  }
  &.noIcon {
    display: block;
    @media (max-width: ${500}px) {
      display: none;

      > i {
      }
    }
  }
`;
const Time = styled.span``;

const BookBtn = styled.div``;

export const Button = styled.button`
  padding: 0.5em 2.5em;
  border-radius: 20px;
  background-color: #2fa5a9;
  color: #ffffffd6;
  text-align: center;
  outline: none;
  border: 0;
  font-weight: 600;
  font-size: 1em;
  @media (max-width: ${450}px) {
    font-size: 0.9em;
    padding: 0.5em 1.5em;
    //width: 100%;
  }
  &.nobtn {
    background-color: inherit;
    color: inherit;
  }
  &:hover {
    cursor: pointer;
    opacity: 0.6;
    transition: all 0.5s;
  }
  &.search {
    padding: 0.6em 2.5em;

    @media (max-width: ${500}px) {
      width: 50%;
      line-height: 21px;
      font-size: 1em;
    }
  }
`;

export const ViewMore = styled.div`
  width: 100%;
  margin: 1.4em auto;
  display: flex;
  justify-content: space-around;

  @media (max-width: ${500}px) {
    justify-content: center;
    //width: 100%   ;
  }
  > button {
    @media (max-width: ${750}px) {
      width: 70%;
    }
    @media (max-width: ${500}px) {
      width: 100%;
      padding: 0.7em 1.5em;
    }
    &.search {
    }
  }
`;

const SecondInputBox = styled.div`
  display: flex;
  @media (max-width: ${500}px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 2em;
  }
  > div {
    padding-right: 1em;
    @media (max-width: ${500}px) {
      padding-right: 0;
    }
  }
`;
