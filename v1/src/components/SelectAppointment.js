import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import StarIcon from "@material-ui/icons/StarOutlined";
import ScheduleIcon from "./../Image/schedule.svg";
import DividerIcon from "./../Image/divider.png";
import TimeIcon from "./../Image/time.svg";
import { InputLabel, Input, InputTypeBox, Select } from "./RegisterBody";
import { Container, MainBody, ViewProfile } from "./Appointments";
import SideBar from "./SideBar";
import { ProfileImage } from "./Overview";
import {
  setPatientBookValues,
  createPatientAppointment,
} from "../redux/actions/PatientActions";
import { locations } from "../utils/utils";
import useForm from "../utils/useForm";
import { useHistory } from "react-router-dom";
import { PatientCalenderModal, ConfirmationModal } from "./Modal";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { getHospitals } from "../redux/actions/HospitalActions";
import { getLocation } from "../redux/actions/utilsActions";
import { getDoctorById } from "../redux/actions/DoctorActions";

export const DocAppointment = ({
  name,
  Hname,
  time,
  NoIcon,
  setArrayId,
  id,
  arrayId,
  select,
  getDoctorById,
  doctorDetails,
  uniqueId,
  daySelected,
  setDaySelected,
  slotSelected,
  setSlotSelected,
}) => {
  const setIdTrue = (arry, setArry, id) => {
    arry = new Array(arry?.length).fill(false);

    if (!arry[id]) {
      arry[id] = true;
      setArry(arry);
      console.log(arry);
    }
  };

  // console.log(Hname, name, doctorDetails,uniqueId, "test")

  const removeClass = (arry, setArry) => {
    arry = new Array(arry?.length).fill(false);
    setArry(arry);
  };

  const [modal, setModal] = useState(false);
  const [allSlots, setAllSlots] = useState("");

  //Get all slots
  const getClass = (arr, inst, id) => {
    if (arr[id] === inst) {
      return "setSlot";
    }
    return "";
  };

  dayjs.extend(LocalizedFormat);

  return (
    <DocDesc className="booked">
      <DocImg>
        <img
          src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg"
          alt=""
        />
      </DocImg>
      <DocDetails>
        <DName>{name}</DName>
        <DHName>{Hname}</DHName>
        {time ? (
          <>
            <DRating className="booked">
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon className="nostar" />
            </DRating>
          </>
        ) : (
          ""
        )}

        <DProfile>
          <ViewProfile className="selectAppointment">View profile</ViewProfile>
        </DProfile>

        <DTime
          className={select ? "setSchedule" : ""}
          onClick={() => {
            setIdTrue(arrayId, setArrayId, id);
            setModal(true);
            getDoctorById(uniqueId);
          }}
        >
          {!daySelected ? (
            <>
              {time ? (
                <>
                  {" "}
                  <Icon>
                    <img src={TimeIcon} alt="schedule" />
                  </Icon>
                  <Time className="booked">
                    {" "}
                    {time} {parseInt(time.slice[(0, 2)]) > 12 ? "PM " : "AM "}
                    GMT +1{" "}
                  </Time>
                </>
              ) : (
                <>
                  {" "}
                  <Time> View schedule </Time>
                </>
              )}
              <Icon>
                {" "}
                {time ? "" : <img src={ScheduleIcon} alt="schedule" />}
              </Icon>
              <Icon>
                {NoIcon ? "" : <i className="fas fa-chevron-down down"></i>}
              </Icon>
            </>
          ) : (
            <>
              <DTime>
                <Icon>
                  <img src={ScheduleIcon} alt="schedule" />
                </Icon>
                <Time>
                  {daySelected &&
                    daySelected
                      ?.format("LL")
                      .slice(0, daySelected?.format("LL").length - 6)}{" "}
                </Time>
                <Icon>
                  <img src={DividerIcon} alt="schedule" />
                </Icon>
                <Icon>
                  <img src={TimeIcon} alt="schedule" />
                </Icon>
                <Time>{slotSelected.value}</Time>
              </DTime>
            </>
          )}
        </DTime>
      </DocDetails>
      {modal ? (
        <PatientCalenderModal
          patient="patient"
          daySelected={daySelected}
          setDaySelected={setDaySelected}
          setModal={setModal}
          setSlotSelected={setSlotSelected}
          slotSelected={slotSelected}
          getClass={getClass}
          removeClass={removeClass}
          arry={arrayId}
          setArry={setArrayId}
          doctorDetails={doctorDetails}
          id={id}
          allSlots={allSlots}
          setAllSlots={setAllSlots}
        />
      ) : (
        ""
      )}
    </DocDesc>
  );
};

export const BookAppointment = ({
  name,
  Hname,
  uniqueId,
  setArrayId,
  id,
  arrayId,
  select,
  getDoctorById,
  doctorDetails,
  doctorId,
  setPatientBookValues,
  createPatientAppointment,
  appointmentCreated,
}) => {
  const [modal, setModal] = useState(false);
  const [daySelected, setDaySelected] = useState("");
  const [slotSelected, setSlotSelected] = useState("");
  const [value, setValues] = useState({});
  let routerHistory = useHistory();
  const pricing = () => {
    routerHistory.push("/pricings");
  };
  return (
    <BookingDetails>
      <DocAppointment
        name={name}
        Hname={Hname}
        setArrayId={setArrayId}
        id={id}
        arrayId={arrayId}
        select={select}
        getDoctorById={getDoctorById}
        doctorDetails={doctorDetails}
        uniqueId={uniqueId}
        daySelected={daySelected}
        setDaySelected={setDaySelected}
        slotSelected={slotSelected}
        setSlotSelected={setSlotSelected}
      />
      <BookBtn>
        <Button
          disabled={!(daySelected && slotSelected)}
          onClick={() => {
            setModal(true);
            setValues({
              ...value,
              doctor_id: doctorId,
              date: daySelected.format("DD-MM-YYYY"),
              time_slots: slotSelected,
            });
            //console.log(value);
            //setPatientBookValues(value)
          }}
        >
          Book
        </Button>
      </BookBtn>
      {modal ? (
        <ConfirmationModal
          value={value}
          setPatientBookValues={setPatientBookValues}
          setModal={setModal}
          createPatientAppointment={createPatientAppointment}
          appointmentCreated={appointmentCreated}
        />
      ) : (
        ""
      )}
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

Math.radians = (degree) => (degree * Math.PI) / 180;

//Get Selected Appointment
const getSelectedAppointment = (array, setArray, object, index) => {
  let newArray = array.map((item, id) => {
    return item.doctors.map((ite, idx) => {
      return { ...ite, select: "" };
    });
  });
  const selectedObject = { ...object, select: "selected" };

  newArray = array.map((item, id) => {
    return item.doctors.map((ite, idx) => {
      if (idx === index) {
        ite = selectedObject;
      }
      return ite;
    });
  });

  let newArra = array.map((item, id) => {
    return (item["doctors"] = newArray);
  });

  console.log(newArray, "newGere");
  console.log(newArra, "hhihi");
};

// the appointment function
const AppointmentComponent = ({
  hospitals,
  sidebar,
  values,
  errors,
  locationAccess,
  setValues,
  handleChange,
  getSelectedAppointment,
  id,
  getDoctorById,
  doctorDetails,
  setPatientBookValues,
  createPatientAppointment,
  appointmentCreated,
}) => {
  const longitude = localStorage.getItem("longitude");
  const latitude = localStorage.getItem("latitude");
  const [location, setLocation] = useState("");
  const [filterHospitals, setFilterHospitals] = useState([]);
  console.log(hospitals, "here");

  let hospitalsWithDistance;

  hospitalsWithDistance = hospitals?.map((hospital) => {
    return {
      ...hospital,
      distance: getDistance(
        [latitude, longitude],
        [parseFloat(hospital.latitude), parseFloat(hospital.longitude)]
      ),
    };
  });

  useEffect(() => {
    setFilterHospitals(hospitalsWithDistance);
  }, [hospitals]);

  const getDoctor = (e) => {
    e.preventDefault();
    //console.log(values.location, "valiues")
    const filteredHospitals = hospitals?.filter((hospital) => {
      return hospital.city == values.location;
    });
    setFilterHospitals(filteredHospitals);
  };
  let a;
  let b = new Array(1).fill(false);
  console.log(b, "b");
  const [arrayId, setArrayId] = useState([false]);

  return (
    <Containa sidebar={sidebar}>
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
              style={location ? { color: "#000000" } : { color: "#bdbdbe" }}
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
          {console.log(filterHospitals, "filte")}
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
              className="select"
            />
          </div>
          <div>
            <InputLabel htmlFor="Persona"> Persona </InputLabel>
            <Input type="text" placeholder="Adult" className="select" />
          </div>
        </SecondInputBox>
        <div>
          <ViewMore className="search">
            <Button className="search" onClick={getDoctor}>
              Search
            </Button>
          </ViewMore>
        </div>
      </SelectBox>

      <Bookings sidebar={sidebar}>
        <Available>Available</Available>
        <Margin></Margin>
        {locationAccess
          ? filterHospitals
              .sort((a, b) => a.distance - b.distance)
              .map((hospital) => {
                a = new Array(hospital.doctors.length).fill(false);

                return hospital?.doctors?.map((doctor, idx) => {
                  
                  doctor.select = arrayId[idx];
                  return (
                    <>
                      <BookAppointment
                        key={idx}
                        Hname={hospital?.name}
                        name={doctor?.name}
                        t={doctor?.name}
                        uniqueId={doctor?.unique_id}
                        setArrayId={setArrayId}
                        id={idx}
                        arrayId={arrayId}
                        select={doctor?.select}
                        getDoctorById={getDoctorById}
                        doctorDetails={doctorDetails}
                        doctorId={doctor?.id}
                        setPatientBookValues={setPatientBookValues}
                        createPatientAppointment={createPatientAppointment}
                        appointmentCreated={appointmentCreated}
                      />
                    </>
                  );
                });
              })
          : filterHospitals?.map((hospital) => {
              a = new Array(hospital.doctors.length).fill(false);
              console.log("no location Access here");
              return hospital.doctors?.map((doctor, idx) => {
                doctor.select = arrayId[idx];
                return (
                  <BookAppointment
                    key={idx}
                    Hname={hospital?.name}
                    name={doctor?.name}
                    t={doctor?.name}
                    uniqueId={doctor?.unique_id}
                    setArrayId={setArrayId}
                    id={idx}
                    arrayId={arrayId}
                    select={doctor?.select}
                    getDoctorById={getDoctorById}
                    doctorDetails={doctorDetails}
                    doctorId={doctor?.id}
                    setPatientBookValues={setPatientBookValues}
                    createPatientAppointment={createPatientAppointment}
                    appointmentCreated={appointmentCreated}
                  />
                );
              });
            })}
        <Margin className="booking"></Margin>
        <ViewMore>
          {!filterHospitals.length ? (
            "No Doctor is available for this location"
          ) : (
            <Button className="nobtn">
              View more <i className="fas fa-angle-right"></i>{" "}
            </Button>
          )}
        </ViewMore>
      </Bookings>
    </Containa>
  );
};

//The appointment component functions
function SelectAppointments({
  openSidebar,
  getHospitals,
  hospitals,
  locationAccess,
  getLocation,
  getDoctorById,
  doctor,
  setPatientBookValues,
  createPatientAppointment,
  appointmentCreated,
}) {
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

  const longitude = localStorage.getItem("longitude");
  const latitude = localStorage.getItem("latitude");
  const [location, setLocation] = useState("");

  let hospitalsWithDistance;

  hospitalsWithDistance = hospitals?.map((hospital) => {
    return {
      ...hospital,
      distance: getDistance(
        [latitude, longitude],
        [parseFloat(hospital.latitude), parseFloat(hospital.longitude)]
      ),
    };
  });

  useEffect(() => {
    getLocation();
    getHospitals();
  }, []);

  useEffect(() => {
    setFilterHospitals(hospitalsWithDistance);
  }, [hospitals]);

  const [filterHospitals, setFilterHospitals] = useState([]);

  const getDoctor = (e) => {
    e.preventDefault();
    //console.log(values.location, "valiues")
    const filteredHospitals = hospitals?.filter((hospital) => {
      return hospital.city == values.location;
    });
    setFilterHospitals(filteredHospitals);
  };

  dayjs.extend(LocalizedFormat);

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

        <AppointmentComponent
          hospitals={hospitals}
          sidebar={openSidebar}
          values={values}
          errors={errors}
          locationAccess={locationAccess}
          setValues={setValues}
          handleChange={handleChange}
          getSelectedAppointment={getSelectedAppointment}
          getDoctorById={getDoctorById}
          doctorDetails={doctor}
          setPatientBookValues={setPatientBookValues}
          createPatientAppointment={createPatientAppointment}
          appointmentCreated={appointmentCreated}
        />
      </MainBody>
    </Container>
  );
}

const mapStateProps = (state) => ({
  openSidebar: state.utils.openSidebar,
  hospitals: state.hospital.hospitals,
  locationAccess: state.hospital.locationAccess,
  doctor: state.hospital.doctor,
  appointmentCreated: state.patient.appointmentCreated,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getHospitals: () => dispatch(getHospitals()),
    getDoctorById: (id) => dispatch(getDoctorById(id)),
    getLocation: () => dispatch(getLocation()),
    setPatientBookValues: (value) => dispatch(setPatientBookValues(value)),
    createPatientAppointment: (value) =>
      dispatch(createPatientAppointment(value)),
  };
};
export default SelectAppointments = connect(
  mapStateProps,
  mapDispatchToProps
)(SelectAppointments);

export const Containa = styled.div`
  padding: 2em 0;
  position: relative;
  //left: 3.5em;
  left: ${({ sidebar }) => (sidebar ? "3.5em" : "0em")};
  width: 100%;
  //background: linear-gradient(180deg, #e7e7ed, #ffffff);
  margin: 0 auto;
  margin-right: 0.5em;
  //margin-top: 5em;
  margin-left: 0.5em;
  color: #070647;
  border-radius: 15px;
  &.pricing {
    margin-top: 0em;
  }
  @media (max-width: ${500}px) {
    left: 0;
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

  &.pricing {
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
    height: 6.5em;
    width: 6em;
    border-radius: 50%;
  }
`;

const DocDesc = styled.div`
  display: flex;
  align-items: center;
  //width: 19em;
  gap: 1em;

  @media (max-width: ${500}px) {
    width: unset;
    justify-content: none;
  }
`;

const DocDetails = styled.div`
  display: block;
`;

const DName = styled.h3`
  //padding-left: 0.5em;
  //padding: 0.2em 0;
  font-size: 1.5em;
`;

const DHName = styled.p`
  font-size: 14px;
  color: #7b7b7b;
  padding: 0.2em 0;
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
  &.booked {
    padding-left: 0.7em;
    position: relative;
    left: -1em;
  }
`;
const DProfile = styled.div`
  //padding-left: 0.5em;
  padding: 0.2em 0;
  > span {
    font-size: 15px !important;
    font-weight: 600;
    color: #3c6be4 !important;
  }
`;
const DTime = styled.div`
  display: flex;
  font-size: 0.9em;
  gap: 0.4em;
  color: green;
  width: 100%;
  //justify-content: space-between;
  padding: 0.2em 0;
  cursor: pointer;

  &.setSchedule {
    background: #efefef;
    padding: 0.5em 0.5em;
    border-radius: 10px;
  }

  :hover {
    opacity: 0.8;
  }
`;
export const Icon = styled.span`
  //padding-left: 0.5em;
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
const Time = styled.p`
  color: #7b7b7b;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;

  &.booked {
    color: #32820c;
  }
`;

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
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  &.search {
    padding: 0.45em 2.5em;
    font-size: 0.9em;
    border-radius: 40px;

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
  &.search {
    margin: 1em auto;
    margin-top: 1.7em;
  }

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

const PatientCalenderContainer = styled.div``;

const CalenderSection = styled.div``;

const SlotSection = styled.div``;

const Slots = styled.form``;
