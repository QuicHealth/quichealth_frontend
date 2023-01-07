import React from "react";
import styled from "styled-components";
import SideBar from "./SideBar";
import { connect } from "react-redux";
import {
  Container,
  ViewProfile,
  Name,
  Details,
  MainBody,
  Image,
  Time,
  Minutes,
  Dates,
  HeadSection,
  AppointmentContainerWrapper,
} from "./Appointments";
import { AppointmentContainers } from "./Notification";
import { Icon } from "./SelectAppointment";
import { ProfileImage } from "./Overview";
import ExpertSidebar from "./Expert/ExpertSidebar";

function History({expert, openSidebar }) {
  return (
    <Container sidebar={openSidebar}>
      {expert? <ExpertSidebar/>: <SideBar />}
      <MainBody sidebar={openSidebar}>
        <HeadSection sidebar={openSidebar}>
          <h1>History</h1>
          <ProfileImage sidebar={openSidebar} className="noTopPadding">
            <img
              src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg"
              alt=""
            />
          </ProfileImage>
        </HeadSection>
        <AppointmentContainerWrapper sidebar={openSidebar}>
          <AppointmentContainer>
            <Image>
              <img
                src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg"
                alt=""
                className="history"
              />
            </Image>
            <Details className="history">
              <Name>Dr. Alice Walton</Name>
              <ViewProfile>view profile</ViewProfile>
            </Details>
            <DateContainer>
              <Dates>
                <Icon className="noLeftPadding">
                  <i class="fas fa-calendar-alt"></i>
                </Icon>
                <span>07/10/2021</span>
              </Dates>
              <Time>10:45AM</Time>
              <Minutes>
                {" "}
                <Icon className="noLeftPadding">
                  <i class="far fa-clock"></i>
                </Icon>
                <span>30 Minutes</span>
              </Minutes>
            </DateContainer>
          </AppointmentContainer>
          <AppointmentContainer>
            <Image>
              <img
                src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg"
                alt=""
                className="history"
              />
            </Image>
            <Details className="history">
              <Name>Dr. Alice Walton</Name>
              <ViewProfile>view profile</ViewProfile>
            </Details>
            <DateContainer>
              <Dates>
                <Icon className="noLeftPadding">
                  <i class="fas fa-calendar-alt"></i>
                </Icon>
                <span>07/10/2021</span>
              </Dates>
              <Time>10:45AM</Time>
              <Minutes>
                {" "}
                <Icon className="noLeftPadding">
                  <i class="far fa-clock"></i>
                </Icon>
                <span>30 Minutes</span>
              </Minutes>
            </DateContainer>
          </AppointmentContainer>
          <AppointmentContainer>
            <Image>
              <img
                src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg"
                alt=""
                className="history"
              />
            </Image>
            <Details className="history">
              <Name>Dr. Alice Walton</Name>
              <ViewProfile>view profile</ViewProfile>
            </Details>
            <DateContainer>
              <Dates>
                <Icon className="noLeftPadding">
                  <i class="fas fa-calendar-alt"></i>
                </Icon>
                <span>07/10/2021</span>
              </Dates>
              <Time>10:45AM</Time>
              <Minutes>
                {" "}
                <Icon className="noLeftPadding">
                  <i class="far fa-clock"></i>
                </Icon>
                <span>30 Minutes</span>
              </Minutes>
            </DateContainer>
          </AppointmentContainer>
        </AppointmentContainerWrapper>
      </MainBody>
    </Container>
  );
}

const mapStateProps = (state) => ({
  openSidebar: state.utils.openSidebar,
});

export default History = connect(mapStateProps)(History);

export const AppointmentContainer = styled(AppointmentContainers)`
  display: grid;
  grid-template-columns: 15% 30% 60%;
  margin-top: 1em;
  padding: 1em 3em;
  background-color: white;
  box-shadow: none;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  border: 1px solid #6c63ff;
  align-items: center;
  font-weight: 600;

  @media (max-width: ${500}px) {
    grid-template-columns: 20% 45% 30%;
    font-size: 11px;
    padding: 1em 0;
    width: 100%;
    background-color: #e9e9ef;
    border-radius: 16px;
    border: 0;
    position: relative;
    //right: 1em;
    box-shadow: none;
  }
`;

const DateContainer = styled.div`
  display: grid;
  grid-template-columns: 32% 32% 32%;
  @media (max-width: ${500}px) {
      display: block;
  }
`;
//const Time = styled.div``;
//const Minutes = styled.div``;
