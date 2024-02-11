import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  AppointmentContainer,
  AppointmentContainerWrapper,
  CheckBox,
  Container,
  Date,
  Dates,
  Details,
  Dot,
  HeadSection,
  Image,
  MainBody,
  Meeting,
  Minutes,
  Name,
  Time,
  ViewProfile,
} from "../Appointments";
import { ProfileImage } from "../Overview";
import { Icon } from "../SelectAppointment";
import ExpertSidebar from "./ExpertSidebar";
import { getAllDoctorPaidAppointments } from "../../redux/actions/DoctorActions";

function ExpertAppointment({
  openSidebar,
  getAllDoctorPaidAppointments,
  allPaidApp,
}) {
  let history = useHistory();
  let value = {};
  useEffect(() => {
    getAllDoctorPaidAppointments();
  }, []);
  return (
    <Container sidebar={openSidebar}>
      <ExpertSidebar />
      <MainBody sidebar={openSidebar}>
        <HeadSection sidebar={openSidebar}>
          <h1>Appointments</h1>
          <ProfileImage sidebar={openSidebar} className="noTopPadding">
            <img
              src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg"
              alt=""
            />
          </ProfileImage>
        </HeadSection>
        <AppointmentContainerWrapper sidebar={openSidebar}>
          {allPaidApp?.map((appointment, id) => {
            return (
              <AppointmentContainer key={id}>
                <CheckBox className="active"></CheckBox>
                <Image>
                  <img
                    src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg"
                    alt=""
                  />
                </Image>
                <Details>
                  <div>
                    <Name>{appointment?.user?.firstname}</Name>
                    <ViewProfile>view profile</ViewProfile>
                  </div>
                  <Dates>
                    <Icon className="noLeftPadding">
                      <i class="fas fa-calendar-alt"></i>
                    </Icon>
                    <span>{appointment.date}</span>
                  </Dates>
                  <Time>
                    {appointment.start}{" "}
                    {parseInt(appointment.start) > 9 &&
                    parseInt(appointment.start) <= 12
                      ? "AM"
                      : "PM"}{" "}
                  </Time>

                  <Minutes>
                    {" "}
                    <Icon className="noLeftPadding">
                      <i class="far fa-clock"></i>
                    </Icon>
                    <span>30 Minutes</span>
                  </Minutes>
                </Details>
                {appointment?.id === allPaidApp[0]?.id ? (
                  <Meeting
                    className="active"
                    onClick={() => {
                      setTimeout(() => {
                        history.push("/expert-meeting");
                      }, 2000);
                    }}
                  >
                    Join Meeting
                  </Meeting>
                ) : (
                  <Dot>...</Dot>
                )}
              </AppointmentContainer>
            );
          })}
        </AppointmentContainerWrapper>
      </MainBody>
    </Container>
  );
}

const mapStateProps = (state) => ({
  openSidebar: state.utils.openSidebar,
  allPaidApp: state.hospital.allPaidApp,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctorPaidAppointments: () =>
      dispatch(getAllDoctorPaidAppointments()),
  };
};

export default ExpertAppointment = connect(
  mapStateProps,
  mapDispatchToProps
)(ExpertAppointment);
