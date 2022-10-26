import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import { IconBox, Title } from "./SelectAppointment";
import { Containers, Lock, PaySys } from "./Payment";
import CheckedIcon from "@material-ui/icons/CheckCircle";
import { Container, MainBody } from "./Appointments";
import SideBar from "./SideBar";
import { ProfileImage } from "./Overview";
import {
  createMeeting,
  getAllPaidAppointments,
  notShowSidebar,
} from "../redux/actions";

const BookedComponent = ({ doctorName, time }) => {
  return (
    <Containers>
      <BookContainer>
        <PaySys name={doctorName} time={time} />
        <TitleBox>
          <Title>
            <CheckedIcon />
          </Title>
          <Title>Appointment Booked</Title>
        </TitleBox>
        <br />

        <LockBox>
          <Lock />
        </LockBox>
      </BookContainer>
    </Containers>
  );
};
function Booked({
  openSidebar,
  notShowSidebar,
  getAllPaidAppointments,
  paidAppDetails,
  createMeeting
}) {
  let history = useHistory();
  const value = {};
  const [appointment, setAppointment] = useState(null);
  const start = paidAppDetails?.start;
  const doctor = paidAppDetails?.doctor;
  let getUTCstartTime = (appointment) => {
    if (appointment) {
      const { date, start } = appointment;
      let year = date.slice(6, 10);
      let month = date.slice(3, 5);
      let day = date.slice(0, 2);
      let hrs = start.slice(0, 2);
      let mins = start.slice(3, 5);
      let dates = new Date(Date.UTC(year, month, day, hrs, mins));
      let utcStartTime = dates.toISOString();
      let convertedTime = utcStartTime.substring(0, 19) + "Z";
      return convertedTime;
    }
  };

  const startTime = getUTCstartTime(appointment);
  value.appointment_id = appointment?.id;
  value.topic = "Health Matters";
  value.duration = 30;
  value.start_time = startTime;

  if (appointment) {
    console.log(value);
    createMeeting(value);
    setTimeout(() => {
      //history.push("/appointments");
    }, 6000);
  }
  useEffect(() => {
    notShowSidebar();
    getAllPaidAppointments();
  }, []);

  useEffect(() => {
    setAppointment(paidAppDetails);
  }, [paidAppDetails]);

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
        <BookedComponent doctorName={doctor?.name} time={start} />
      </MainBody>
    </Container>
  );
}

const mapStateProps = (state) => ({
  openSidebar: state.utils.openSidebar,
  paidAppDetails: state.patient.paidAppDetails,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAllPaidAppointments: () => dispatch(getAllPaidAppointments()),
    notShowSidebar: () => dispatch(notShowSidebar()),
    createMeeting: (value) => dispatch(createMeeting(value)),
  };
};

export default Booked = connect(mapStateProps, mapDispatchToProps)(Booked);

const BookContainer = styled.div`
  display: grid;
  justify-content: space-around;
  align-items: center;

  @media (max-width: ${500}px) {
    display: flex;
    flex-direction: column-reverse;
    position: relative;
    left: -1em;
  }
`;

const LockBox = styled.div`
  //margin-top:5em;
  @media (max-width: ${500}px) {
    display: none;
  }
`;

const TitleBox = styled.div`
  margin-top: 3em;
  > h2 {
    @media (max-width: ${500}px) {
      font-size: 30px;
      line-height: 45px;
    }
    .MuiSvgIcon-root {
      font-size: 4em;
      fill: #4bd37b;
    }
  }
`;
