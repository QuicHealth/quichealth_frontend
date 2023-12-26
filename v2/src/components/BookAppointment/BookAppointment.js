import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import { Subtitle, Title } from "../Appointments/Appointmentlayout";
import Appointment from "@material-ui/icons/CalendarTodayOutlined";
import Location from "@material-ui/icons/LocationOnOutlined";
import Search from "@material-ui/icons/SearchOutlined";
import Arrow from "@material-ui/icons/ChevronRightOutlined";
import notify from "./../../assets/notification.png";
import { useNavigate } from "react-router-dom";

import Bookings from "./Booking";
import { SidebarCollapseContext } from "../../context/SidebarCollapseContext";
import { useDoctors, useHospitals } from "../../queries/useAppointment";
import { Spin } from "../../utils/Spinners";
import { hospitals } from "../../api/Hospital";
import AvatarImage from "../../utils/AvatarImage";

const locations = {
  ib: "Ibadan",
  lekki: "Lekki",
  lag: "Lagos",
  ow: "owerri",
};

function BookAppointment() {
  const { collapse, setCollapse, isHover } = useContext(SidebarCollapseContext);
  //const { data } = useHospitals();
  const { data: datas, isLoading } = useDoctors();

  const navigate = useNavigate();
  const dayOfTheWeek = (date) => dayjs(date).format("dddd").toLocaleLowerCase();
  //The use of setState needs to changed to use "useReducer"
  const [location, setLocation] = useState("");
  const [values, setValues] = useState({});
  const [showDate, setShowDate] = useState(false);
  const [modal, setModal] = useState(false);
  const [doctors, setDoctors] = useState(datas?.doctors);
  const [doctorId, setDoctorId] = useState("");
  const [filterType, setFilterType] = useState([]);
  // const [disableBookBtn, setDisableBookBtn] = useState(true);

  // Triggers when clickon search BTN
  const getHospitals = (e, filterType) => {
    e.preventDefault();

    const convTime = dayjs(values.date).format("DD-MM-YYYY");

    filterType = filterType?.join(",");

    switch (filterType) {
      case "date":
        // filter by date
        const getDoctorsByDate = [];
        console.log(datas, "date");
        datas?.doctors?.filter((doctor) => {
          return doctor?.availablity.forEach((avail) => {
            if (avail.day === dayOfTheWeek(values?.date)) {
              getDoctorsByDate.push(doctor);
            }
          });
        });

        setDoctors(getDoctorsByDate);
        break;
      case "location":
        // filter by location

        const getDoctorsByLocation = datas?.doctors?.filter(
          (doctor) =>
            doctor?.availablity && doctor?.hospital.city === values.location
        );

        setDoctors(getDoctorsByLocation);
        break;

      default:
        // filter by both date and location
        const filteredHospitals = [];
        console.log(
          dayjs(values.date).format("DD-MM-YYYY") === "sunday",
          "availab"
        );
        datas?.doctors?.filter((doctor) => {
          return doctor?.availablity.forEach((avail) => {
            if (avail?.date === dayjs(values.date).format("DD-MM-YYYY")) {
              filteredHospitals.push(doctor);
            }
          });
        });

        let filteredDoctors = filteredHospitals?.filter(
          (doctor) =>
            doctor?.hospital?.city.toLowerCase() ===
            values?.location?.toLowerCase()
        );
        setDoctors(filteredDoctors);

        break;
    }

    // filter by date first then location

    setFilterType([]);
    // setDisableBookBtn(false);
  };

  console.log(isHover, "isHover");

  useEffect(() => {
    setCollapse(true);
  }, []);
  return (
    <Container collapse={collapse} isHover={isHover}>
      {isLoading && <Spin />}
      <div></div>
      <Layout>
        <Title>Book Appointment</Title>
        {/* <Subtitle>Input your location and desired schedule</Subtitle> */}

        {/* <SearchBox>
          <InputContainer>
            <InputLabel htmlFor="Location">Location</InputLabel>
            <InputSVG>
              <SVG>
                <Location />
              </SVG>
              <Select
                name="location"
                placeholder="Lagos, Nigeria"
                value={location}
                style={location ? { color: "#000000" } : { color: "#bdbdbe" }}
                onChange={(e) => {
                  const selectedLocation = e.target.value;
                  setLocation(selectedLocation);
                  setFilterType([...filterType, "location"]);
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
            </InputSVG>
          </InputContainer>

          <InputContainer>
            <InputLabel htmlFor="Date">Date</InputLabel>
            <InputSVG>
              <SVG>{!showDate && <Appointment />}</SVG>
              <Input
                type="text"
                name="date"
                placeholder="Appointment date"
                onChange={(e) => {
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  });
                  setFilterType([...filterType, "date"]);
                }}
                value={values.date}
                onFocus={(e) => {
                  e.target.type = "date";
                  setShowDate(true);
                }}
                onBlur={(e) => {
                  e.target.type = "text";
                  setShowDate(false);
                }}
              />
            </InputSVG>
          </InputContainer>

          <ButtonBox>
            <p
              onClick={() => {
                //reset all values
                setValues({ ...values, date: "" });
                setLocation("");
                setShowDate(false);
                setDoctors(datas?.doctors);
              }}
            >
              Clear
            </p>
            <InputSVG>
              <SVG className="search">
                <Search />
              </SVG>
              <Button
                disabled={!filterType.length}
                onClick={(e) => getHospitals(e, filterType)}
              >
                Search
              </Button>
            </InputSVG>
          </ButtonBox>
        </SearchBox> */}

        <BookingList isHover={isHover}>
          {/* {!!filterType.length &&
            !doctors?.length &&
            "No Doctor is available for the selected location or date"} */}

          {(!doctors ? datas?.doctors : doctors)?.map((doctor, idx) => {
            console.log(doctor, "doctor");
            return (
              <Booking key={idx}>
                <LeftSection>
                  <Picture>
                    {doctor?.image ? (
                      <img src={doctor.image} alt="notify" />
                    ) : (
                      <AvatarImage name={doctor?.name} />
                    )}
                  </Picture>
                  <Name>
                    <h3>{doctor?.name}</h3>
                    <p
                      onClick={() =>
                        navigate(`/view-profile/${doctor?.unique_id}`)
                      }
                    >
                      View profile
                    </p>
                  </Name>
                </LeftSection>

                <RightSection>
                  <BookButton>
                    <button
                      onClick={() => {
                        setDoctorId(doctor.unique_id);
                        setModal(true);
                      }}
                    >
                      Book
                      <Arrow />
                    </button>
                  </BookButton>
                </RightSection>
              </Booking>
            );
          })}
        </BookingList>
        {modal && (
          <Bookings
            setModal={setModal}
            doctorId={doctorId}
            selectedDate={values?.date}
            selectedDay={dayOfTheWeek(values?.date)}
          />
        )}
      </Layout>
    </Container>
  );
}

export default BookAppointment;

export const Container = styled.div`
  background-color: #f1f1f1;
  position: relative;
  display: grid;
  grid-template-columns: ${(props) =>
    !props.collapse || props.isHover ? "15em auto" : "5em auto"};
  width: 100%;

  @media only Screen and (max-width: 768px) {
    grid-template-columns: 100%;
  }
`;

const Layout = styled.div`
  padding: 0 0em;
`;

const SearchBox = styled.form`
  display: grid;
  grid-template-columns: repeat(3, 31%);
  width: 50em;
  align-items: center;
  margin: 2em auto;
  background: white;
  justify-content: space-around;
  border-radius: 7px;

  @media only Screen and (max-width: 768px) {
    grid-template-columns: 100%;
    width: 100%;
    background: transparent;
    padding: 1em;
  }
`;

const InputContainer = styled.div`
  //margin: em;
  border-right: 1px solid;
  //width: 90%;

  @media only Screen and (max-width: 768px) {
    border-right: 0;
    margin-bottom: 1em;
  }
`;

export const InputLabel = styled.label`
  color: var(--darkGreen);
  font-weight: 500;

  @media only Screen and (max-width: 500px) {
    font-size: 14px;
    // padding: 1em;
  }
`;

export const Input = styled.input`
  padding: 0.7em 1em;
  border-radius: 8px;
  border: 0px solid #d5d5d5;
  width: 100%;
  margin-top: 0.5em;
  font-size: 16px;
  padding-left: 2em;

  &::placeholder {
    color: #d5d5d5;
    font-size: 14px;
  }

  &.notmobile {
  }

  @media only Screen and (max-width: 700px) {
    font-size: 12px;
    padding: 1.5em 1em;
    padding-left: 3em;

    &::placeholder {
      font-size: 12px;
    }
  }
`;

export const Select = styled.select`
  padding: 0.7em 1em;
  border-radius: 8px;
  border: 0px solid #d5d5d5;
  outline: none;
  color: #bdbdbe;
  margin-top: 0.5em;
  font-size: 16px;
  padding-left: 2em;
  width: 100%;
  @media only Screen and (max-width: 700px) {
    font-size: 12px;
    padding: 1.5em 1em 1.5em 3em;
    //padding-left: 3em;

    &::placeholder {
      font-size: 12px;
    }
  }
  /* &.selectAppointment {
    width: 100%;
    padding: 0.3em 2em 0.3em 1em;
    font-size: 0.8em;
    border: 2px solid #2fa5a9;
    margin-bottom: 1em;
    background-color: inherit;
    @media (max-width: ${500}px) {
      padding: 0.7em 0.5em;
      font-size: 1em;
      border: 1px solid #2fa5a9;
      background-color: inherit;
    }
  } */
`;

const InputSVG = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  color: #d5d5d5;

  &.search {
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
  }
`;

const SVG = styled.div`
  position: absolute;
  //left: 0.3em;
  top: 1em;

  &.search {
    color: white;
    top: 0.56em;
    left: 0.5em;

    &:hover {
      opacity: 1;
    }
  }
  @media only Screen and (max-width: 768px) {
    //top: 1em;
    padding-left: 0.2em;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2em;

  padding: 2em 0em;

  p {
    transition: all 0.2s;
    color: var(--grey);
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
    &:focus {
      transform: scale(0.9);
    }
  }
`;

const Button = styled.button`
  font-size: 15px;
  padding: 0.8rem 2rem;
  border-radius: 7px;
  background-color: var(--lightGreen);
  color: var(--white);
  width: 8em;
  //border: 1px solid var(--lightGreen);
  transition: all 0.2s;

  cursor: pointer;

  &:disabled {
    opacity: 0.5;
  }
  &:hover {
    opacity: 0.5;
  }
  /* &:focus {
    transform: scale(0.9);
  } */
  @media only Screen and (max-width: 768px) {
    font-size: 13px;
    padding: 0.8rem 1rem;
  }
`;

const BookingList = styled.div`
  background: white;
  padding: ${(props) => (props.isHover ? "3em 13em" : "3em 13em")};
  transition: all 0.2s;
  @media only Screen and (max-width: 768px) {
    font-size: 13px;
    padding: 2em 1em;
  }
`;

const Booking = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #d5d5d5;
  padding: 2em 0;
`;

const LeftSection = styled.div`
  display: flex;
  gap: 1em;
  align-items: center;
`;

const RightSection = styled.div``;

const Picture = styled.div`
  img {
    width: unset;
  }
`;

const Name = styled.div`
  h3 {
    font-weight: 500;
    color: var(--grey);
  }

  p {
    color: #2f80ed;
    margin-top: 0.4em;
    font-size: 13px;
    cursor: pointer;

    &:hover {
      opacity: 0.5;
    }
  }
`;

const BookButton = styled.div`
  button {
    font-size: 15px;
    padding: 0.8rem 2rem;
    border-radius: 7px;
    color: var(--lightGreen);
    background-color: transparent;
    width: 8em;
    font-weight: 400;
    border: 2px solid var(--lightGreen);
    display: flex;
    align-items: center;
    transition: all 0.2s;

    cursor: pointer;
    &:disabled {
      opacity: 0.5;
    }

    &:hover {
      opacity: 0.5;
    }
  }
`;
