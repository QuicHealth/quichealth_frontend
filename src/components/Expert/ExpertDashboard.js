import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Container, MainBody, ProfileImage } from "../Overview";
import ExpertSidebar from "./ExpertSidebar";
import SearchIcon from "@material-ui/icons/Search";
import Stat1 from "./../../Image/statimg1.svg";
import Stat2 from "./../../Image/statimg2.svg";
import Stat3 from "./../../Image/statimg3.svg";
import Stat4 from "./../../Image/statimg4.svg";

import SAIcon from "./../../Image/setNote.svg";
import Carret from "./../../Image/carret.svg";
import PAImage1 from "./../../Image/paimg1.jpg";
import dayjs from "dayjs";
import { TimeSelections } from "../../utils/utils";
import useForm from "../../utils/useForm";
import GenericCalender from "../GenericCalender";
import { Modal } from "../Modal";
import { addSchedule } from "../../redux/actions/DoctorActions";
import { getDoctorNotifications } from "../../redux/actions/DoctorActions";

function ExpertDashboard({
  openSidebar,
  addSchedule,
  getDoctorNotifications,
  doctorNotifications,
}) {
  const { values, isSubmit, setIsSubmit } = useForm("time");
  const doctorId = localStorage.getItem("doctorid");

  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState(true);
  const [daySelected, setDaySelected] = useState(dayjs());
  let timeSlot;
  let format = "DD-MM-YYYY";

  const [selectedTime, setSelectedTime] = useState(null);
  const [errors, setErrors] = useState(null);
  const [disabledSubmit, setDisabledSubmit] = useState(true);

  const [checkedState, setCheckedState] = useState(
    new Array(TimeSelections.length).fill(false)
  );
  const handleSelect = (position) => {
    if (disabledSubmit) {
      setDisabledSubmit(false);
      setErrors("");
    }
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    const selected = updatedCheckedState.map((currentState, id) => {
      if (currentState === true) {
        setErrors("");
        setDisabledSubmit(false);
        return TimeSelections[id];
      }
    });

    setSelectedTime(selected);
  };

  let selectedTimeCheck = selectedTime?.every((time, id) => time === undefined);

  const currentDate = dayjs().format("MMMM D, YYYY");
  const time = dayjs().format("hh:mm A");

  console.log(dayjs().year(), dayjs().format("hh:mm a, "), "currentDate");

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = {};

    timeSlot = selectedTime?.filter((slot, id) => {
      if (slot !== undefined) {
        return slot;
      }
    });

    if (timeSlot?.length < 1 || timeSlot === undefined) {
      setErrors("Time Slot cannot be empty");
      setDisabledSubmit(true);
    } else {
      setErrors("");
      setDisabledSubmit(false);
      values.doctor_id = doctorId;
      values.date = daySelected.format(format);
      values.time_slots = timeSlot;
      console.log(values);
      addSchedule(values);
    }
  };

  useEffect(() => {
    getDoctorNotifications();
  }, []);

  useEffect(() => {
    if (selectedTimeCheck === true) {
      setErrors("Time Slot cannot be empty");
      setDisabledSubmit(true);
    } else {
      setErrors(null);
      setDisabledSubmit(false);
    }
  }, [selectedTimeCheck]);

  const GenericBox = ({ Icon, Name, Figure, hrs }) => {
    return (
      <Box>
        <StatIcon>
          <img src={Icon} alt="Stat" />
        </StatIcon>
        <StatName>{Name}</StatName>
        <StatFigure>
          {Figure} {hrs ? "hrs" : ""}{" "}
        </StatFigure>
      </Box>
    );
  };

  const GenericPABox = ({ Image, Names, Datee, Time }) => {
    return (
      <PendingAppointment>
        <PAImage>
          <img src={Image} alt="paimg" />
        </PAImage>
        <NameBox>
          <Name>{Names}</Name>
          <ViewDetails>View details</ViewDetails>
        </NameBox>
        <PADate>
          <Day>{Datee}</Day>
          <Times>{Time}</Times>
        </PADate>
        <PADots>...</PADots>
      </PendingAppointment>
    );
  };

  return (
    <Container sidebar={openSidebar}>
      <ExpertSidebar />
      <MainBody>
        <ProfileImage sidebar={openSidebar}>
          <img
            src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg"
            alt=""
          />
        </ProfileImage>
        {/* Section 1 */}
        <WelcomeContainer sidebar={openSidebar}>
          {/* <HeaderImage> 
                <img
                src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg"
                alt=""
            /></HeaderImage> */}

          <S1LeftSide>
            <BHeading sidebar={openSidebar}>
              Welcome, <b>Dr Alice</b>
            </BHeading>
            <p>
              {currentDate} &nbsp; &nbsp; &nbsp; &nbsp; {time}
            </p>
          </S1LeftSide>
          <S1RightSide>
            <SearchBox>
              <NotificationSearchIcon />
              <SearchInput placeholder="Search" />
            </SearchBox>
          </S1RightSide>
        </WelcomeContainer>

        {/* Section 2 */}
        <StatContainer>
          <StatHeader>Stats</StatHeader>
          <StatsBox>
            <GenericBox
              Icon={Stat1}
              Name="Successful appointment"
              Figure="60"
            />
            <GenericBox Icon={Stat2} Name="Pending appointment" Figure="16" />

            <GenericBox
              Icon={Stat3}
              Name="Total time spent"
              Figure="150"
              hrs={true}
            />

            <GenericBox Icon={Stat4} Name="stat" Figure="-" />
          </StatsBox>
        </StatContainer>

        {/* Section3 */}

        <Section3>
          {/* Pending appointment */}
          <S3Box>
            <S3LeftSide>
              {" "}
              <Title1>Pending appointments</Title1>
              <PendingAppointmentsContainer>
                <PendingAppointmentB>
                  <PAImage>
                    <img src={PAImage1} alt="paimg" />
                  </PAImage>
                  <NameBox>
                    <Name>Christian’s appointment is in 15 minutes</Name>
                    <ViewDetails>View details</ViewDetails>
                  </NameBox>
                  <JoinBox>
                    <ButtonBox>
                      <Button>Join in</Button> <img src={Carret} alt="paimg" />
                    </ButtonBox>
                  </JoinBox>{" "}
                </PendingAppointmentB>

                <GenericPABox
                  Image={PAImage1}
                  Names={"Anita Martins"}
                  Datee={"Wednesday, June 25, 2022"}
                  Time={"5:00PM - 5:30PM"}
                />

                <GenericPABox
                  Image={PAImage1}
                  Names={"Julie Andrews"}
                  Datee={"Wednesday, June 26, 2022"}
                  Time={"5:00PM - 5:30PM"}
                />

                <GenericPABox
                  Image={PAImage1}
                  Names={"Julie Andrews"}
                  Datee={"Wednesday, June 26, 2022"}
                  Time={"5:00PM - 5:30PM"}
                />
                <GenericPABox
                  Image={PAImage1}
                  Names={"Julie Andrews"}
                  Datee={"Wednesday, June 26, 2022"}
                  Time={"5:00PM - 5:30PM"}
                />
              </PendingAppointmentsContainer>
            </S3LeftSide>

            {/* Schedule */}

            <S3RightSide>
              {" "}
              <Title2>Schedule</Title2>
              <GenericCalender
                disabled={true}
                // daySelected={daySelected}
                // modal={modal}
                // setDaySelected={setDaySelected}
              />
              <SetAvailables>
                <SetAvailableIcon onClick={() => setShowModal(true)}>
                  <img src={SAIcon} alt="" />
                </SetAvailableIcon>
                <Available>Set availabilty</Available>
              </SetAvailables>
            </S3RightSide>
          </S3Box>
        </Section3>

        {showModal ? (
          <Modal
            setShowModal={setShowModal}
            daySelected={daySelected}
            modal={modal}
            setDaySelected={setDaySelected}
            values={values}
            checkedState={checkedState}
            handleSelect={handleSelect}
            disabledSubmit={disabledSubmit}
            handleSubmit={handleSubmit}
            errors={errors}
          />
        ) : (
          ""
        )}
      </MainBody>
    </Container>
  );
}

const mapStateProps = (state) => ({
  openSidebar: state.utils.openSidebar,
});
const mapDispatchToProps = (dispatch) => {
  return {
    addSchedule: (values) => dispatch(addSchedule(values)),
    getDoctorNotifications: () => dispatch(getDoctorNotifications()),
  };
};

ExpertDashboard = connect(mapStateProps, mapDispatchToProps)(ExpertDashboard);
export default ExpertDashboard;

const BHeading = styled.h2`
  color: #070647;
  font-size: 2.5em;
  font-family: "Poppins", sans-serif;
`;

const WelcomeContainer = styled.div`
  display: flex;
  padding: 2em;
  align-items: center;
  //margin-bottom: 5em;
  justify-content: space-between;
  position: relative;
  @media (max-width: ${500}px) {
    padding: 0;
  }
  h2 {
    position: relative;
    //font-size: 18px;
    @media (max-width: ${500}px) {
      right: ${({ sidebar }) => (sidebar ? "-1em" : "0")};
    }
  }
`;
const HeaderImage = styled.div`
  display: block;
  img {
    width: 6em;
    height: 6em;
    border-radius: 50%;
  }
  @media (max-width: ${500}px) {
    display: none;
  }
`;

const OverviewContainer = styled.div`
  position: relative;
  left: ${({ sidebar }) => (sidebar ? "-4em" : "0em")};
  display: flex;
  width: 50em;
  padding: 2em;
  margin: 1em auto;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 42px;
  @media (max-width: ${500}px) {
    width: ${({ sidebar }) => (!sidebar ? "unset" : "90%")};
    left: ${({ sidebar }) => (sidebar ? "0em" : "-1.5em")};
    justify-content: none;
  }
`;

const PatientImage = styled.div`
  > img {
    height: 4em;
    width: 4em;
    border-radius: 50%;
  }
  .MuiAvatar-colorDefault {
    color: #747474;
    width: 6em;
    height: 6em;
    @media (max-width: ${500}px) {
      width: 4em;
      height: 4em;
    }
  }
`;
const PatientDetails = styled.div``;

const PName = styled.h3`
  padding-left: 0.5em;
  font-size: 30px;
  line-height: 35.16px;
  @media (max-width: ${500}px) {
    font-size: 15px;
    line-height: 21px;
  }
`;

const ViewProfile = styled.div`
  font-size: 15px;
  color: #3c6be4;
  padding: 1em 1em;
  @media (max-width: ${500}px) {
    font-size: 12px;
    padding: 0.2em.6em;
  }
`;

const PTime = styled.div`
  padding-left: 0.5em;
  display: flex;
  font-size: 0.9em;
  color: green;
  width: 100%;
  align-items: center;
  //justify-content: space-evenly;
`;

const Time = styled.span``;

const Datee = styled.div`
  display: none;
  @media (max-width: ${500}px) {
    display: block;
  }
`;

const S1RightSide = styled.div``;
const S1LeftSide = styled.div``;

const SearchInput = styled.input`
  outline-width: 0;
  border: 0px solid #c4c4c4;
  border-radius: 34px;
  flex: 1;
  padding: 15px 10px;
  padding-left: 40px;
  width: 25em;
  font-size: 16px;
  background-color: white;
  cursor: pointer;

  ::placeholder {
    color: #d9d9d9;
    font-size: 18px;
  }

  @media (max-width: ${500}px) {
    width: 100%;
  }
`;

const NotificationSearchIcon = styled(SearchIcon)`
  position: absolute;
  margin-left: 10px;
  color: #7b7b7b;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
`;

const StatContainer = styled.div`
  padding: 0 2em;
`;

const StatHeader = styled.h2``;

const StatsBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 3em;
`;
const Box = styled.div`
  border: 1px solid #dfe0eb;
  background: white;
  border-radius: 10px;
  padding: 2em 2em;
  display: grid;
  width: 17em;
  justify-items: center;
  transition: all 0.5s ease;
  cursor: pointer;
  :hover {
    border: 1px solid #3751ff;
    :hover p,
    :hover h3 {
      color: #3751ff;
    }
  }
`;
const StatIcon = styled.div``;
const StatName = styled.p`
  color: #9fa2b4;
  font-family: "Mulish", sans-serif;
  font-weight: 700;
  padding: 1em 0;
  font-size: 19px;
  text-align: center;
  line-height: 24px;
  letter-spacing: 0.4px;

  :hover {
    color: #3751ff;
  }
`;
const StatFigure = styled.h3`
  color: #252733;
  font-size: 35px;
  font-family: "Mulish", sans-serif;
  font-weight: 700;
  :hover {
    color: #3751ff;
  }
`;

const Section3 = styled.div`
  padding: 2em;
`;
const S3Box = styled.div`
  display: grid;
  grid-template-columns: 68% 30%;
  font-size: "Poppins", sans-serif;
  gap: 1em;
`;

const S3LeftSide = styled.div``;
const S3RightSide = styled.div``;

const Title1 = styled.p`
  font-weight: 600;
  font-size: 1.4em;
`;
const Title2 = styled.p`
  font-weight: 600;
  font-size: 1.4em;
`;

const PendingAppointmentsContainer = styled.div`
  font-family: "Poppins", sans-serif;
  margin-top: 1em;
  border: 1px solid #dfe0eb;
  border-radius: 10px;
`;
const PendingAppointment = styled.div`
  display: grid;
  grid-template-columns: 25% 25% 35% 15%;
  border-top: 1px solid #dfe0eb;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  align-items: center;
  background: white;
  padding: 0.5em 2em;
`;

const PendingAppointmentB = styled.div`
  display: grid;
  grid-template-columns: 25% 60% 15%;
  //border: 1px solid #dfe0eb;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: white;
  padding: 1em 2em;
`;
const PAImage = styled.div`
  > img {
    border-radius: 100%;

    @media (max-width: ${750}px) {
      width: 4em;
      height: 4em;
    }
    @media (max-width: ${500}px) {
      width: 4em;
      height: 4em;
    }
  }
`;
const NameBox = styled.div``;
const Name = styled.h4`
  color: #252733;
  font-size: 15px;
  line-height: 20px;
  font-weight: 600;
  letter-spacing: 0.2px;
`;
const ViewDetails = styled.p`
  color: #3c6be4;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.1px;
`;
const PADate = styled.div``;
const Day = styled.p`
  color: #252733;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: 0.2px;
`;
const Times = styled.p`
  color: #c5c7cd;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.1px;
`;
const PADots = styled.p`
  text-align: center;
  font-size: 2em;
  font-weight: 500;
  line-height: 36px;
  position: relative;
  top: -0.6em;
`;

const JoinBox = styled.div``;
const ButtonBox = styled.div`
  background: #2fa5a9;
  padding: 0.5em 1em;
  color: white;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.5s ease;

  :hover {
    opacity: 0.6;
  }
`;

const Button = styled.p`
  font-size: 13px;
  font-weight: 500;
  text-align: center;
  line-height: 19.5px;
`;

const SetAvailables = styled.div`
  margin-top: 2em;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  transition: all 0.5s ease-in-out;

  :hover {
    opacity: 0.6;
  }
`;

const SetAvailableIcon = styled.span``;
const Available = styled.p`
  font-size: 11px;
  letter-spacing: 0.1px;
  margin-left: 0.5em;
  font-weight: 600;
`;
