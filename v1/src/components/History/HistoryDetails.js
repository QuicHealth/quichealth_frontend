import React, { useState } from "react";
import styled from "styled-components";
import {
  AppointmentContainerWrapper,
  Container,
  Dates,
  Details,
  Image,
  MainBody,
  Minutes,
  Name,
  Time,
  ViewProfile,
} from "../Appointments";
import { Icon } from "../SelectAppointment";
import { AppointmentContainer, DateContainer } from "./History";

function HistoryDetails({ openSidebar, history, setShowHistoryDetails }) {
  const [active, setActive] = useState(1);
  const [tabDisplay, setTabDisplay] = useState(history.diagnosis)
  console.log(history,"hghgh")
  return (
    <AppointmentContainerWrapper sidebar={openSidebar}>
        <Back onClick={() => setShowHistoryDetails(false)}>Go back</Back>
      <HistoryContainer>
        <HImage>
          <img
            src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg"
            alt=""
            className="history"
          />
        </HImage>
        <Details className="history">
          <Name>{history?.doctor.name}</Name>
          <ViewProfile className="hdetails">View profile</ViewProfile>
        </Details>
        <DateContainer>
          <Dates>
            <Icon className="noLeftPadding">
              <i class="fas fa-calendar-alt"></i>
            </Icon>
            <span>{history?.appointments.date}</span>
          </Dates>
          <Time>{history?.appointments.start}</Time>
          <Minutes>
            {" "}
            <Icon className="noLeftPadding">
              <i class="far fa-clock"></i>
            </Icon>
            <span>30 Minutes</span>
          </Minutes>
        </DateContainer>
      </HistoryContainer>
      <HDetailsBox>
        <TabContainer>
          <Tab
            className={active === 1 ? "active" : ""}
            onClick={() => {
                setTabDisplay(history?.diagnosis)
                setActive(1)}
            }
          >
            Diagnostics
          </Tab>
          <Tab
            className={active === 2 ? "active" : ""}
            onClick={() => {
                setTabDisplay(history.treatments)
                setActive(2)}
                }
          >
            Treatment
          </Tab>
          <Tab
            className={active === 3 ? "active" : ""}
            onClick={() => {
                setTabDisplay(history?.notes)
                setActive(3)}
                }
          >
            Notes
          </Tab>
        </TabContainer>
        <TabDisplay>
          <Content>{!tabDisplay? "No record": tabDisplay}</Content>
        </TabDisplay>
      </HDetailsBox>
    </AppointmentContainerWrapper>
  );
}

export default HistoryDetails;

export const HistoryContainer = styled.div`
  display: grid;
  grid-template-columns: 15% 20% 60%;
  background-color: unset;
  align-items: center;
  font-weight: 600;
  width: 85%;
  margin: auto;
  margin-top: 5em;
`;

const HImage = styled(Image)`
  > img {
    width: 5em !important;
    height: 6em !important;
  }
`;

const HDetailsBox = styled.div`
  width: 90%;
  margin: 0em auto 0em auto;
`;
const TabContainer = styled.div`
  display: grid;
  grid-template-columns: 33% 33.5% 33.5%;
`;
const Tab = styled.div`
  padding: 2em 2em;
  background-color: #fff;
  text-align: center;
  border: 1px solid #6c63ff;
  border-right: 0;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    opacity: 0.7;
  }
  &.active {
    background-color: #3c6be4;
    color: #fff;
  }
  &:last-child {
    border-right: 1px solid #6c63ff;
  }
`;

const TabDisplay = styled.div`
  height: 30em;
  background-color: #fff;
  -webkit-box-shadow: 0px 6px 20px 2px rgba(0, 0, 0, 0.47);
  box-shadow: 0px 12px 10px 2px rgba(0, 0, 0, 0.27);
  border: 2px solid #ffffff;
  border-radius: 5px;
`;

const Content = styled.h3`
  padding: 3em;
`;

const Back = styled.span`
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`