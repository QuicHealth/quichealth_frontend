import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SideBar from "../SideBar";
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
  NoDataBox,
} from "../Appointments";
import { AppointmentContainers } from "../Notification";
import { Icon } from "../SelectAppointment";
import ExpertSidebar from "../Expert/ExpertSidebar";
import { ProfileImage } from "../Overview";
import HistoryDetails from "./HistoryDetails";
import { getHistory } from "../../redux/actions/PatientActions";
import { Spin } from "../../pages/Register";

const HistoryElement = ({
  openSidebar,
  setShowHistoryDetails,
  history,
  setCurrentHistory,
}) => {
  return (
    <AppointmentContainerWrapper sidebar={openSidebar}>
      {!history ? (
        <NoDataBox>No history available</NoDataBox>
      ) : (
        history.map((hist, index) => {
          return (
            <AppointmentContainer
              key={index}
              onClick={() => {
                setCurrentHistory(hist);
                setShowHistoryDetails(true);
              }}
            >
              <Image>
                <img
                  src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg"
                  alt=""
                  className="history"
                />
              </Image>
              <Details className="history">
                <Name>{hist?.doctor.name}</Name>
                <ViewProfile>View profile</ViewProfile>
              </Details>
              <DateContainer>
                <Dates>
                  <Icon className="noLeftPadding">
                    <i class="fas fa-calendar-alt"></i>
                  </Icon>
                  <span>{hist?.appointments.date}</span>
                </Dates>
                <Time>{hist?.appointments.start}</Time>
                <Minutes>
                  {" "}
                  <Icon className="noLeftPadding">
                    <i class="far fa-clock"></i>
                  </Icon>
                  <span>30 Minutes</span>
                </Minutes>
              </DateContainer>
            </AppointmentContainer>
          );
        })
      )}
    </AppointmentContainerWrapper>
  );
};

function History({ expert, openSidebar, getHistory, isLoading, history }) {
  const [showHistoryDetails, setShowHistoryDetails] = useState(false);
  const [currentHistory, setCurrentHistory] = useState("");
  useEffect(() => {
    getHistory();
  }, []);
  return (
    <Container sidebar={openSidebar}>
      {isLoading && <Spin />}
      {expert ? <ExpertSidebar /> : <SideBar />}
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
        {expert ? (
          <HistoryElement openSidebar={openSidebar} />
        ) : !showHistoryDetails ? (
          <HistoryElement
            openSidebar={openSidebar}
            history={history}
            getHistory={getHistory}
            setShowHistoryDetails={setShowHistoryDetails}
            setCurrentHistory={setCurrentHistory}
          />
        ) : (
          <HistoryDetails
            openSidebar={openSidebar}
            history={currentHistory}
            setShowHistoryDetails={setShowHistoryDetails}
          />
        )}
      </MainBody>
    </Container>
  );
}

const mapStateProps = (state) => ({
  openSidebar: state.utils.openSidebar,
  history: state.patient.patientHistory,
  isLoading: state.patient.isLoading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getHistory: () => dispatch(getHistory()),
  };
};

export default History = connect(mapStateProps, mapDispatchToProps)(History);

export const AppointmentContainer = styled(AppointmentContainers)`
  display: grid;
  grid-template-columns: 15% 20% 60%;
  padding: 1em 3em;
  background-color: white;
  box-shadow: none;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  border: 1px solid #6c63ff;
  align-items: center;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    opacity: 0.4;
  }

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

export const DateContainer = styled.div`
  display: grid;
  grid-template-columns: 32% 32% 32%;
  margin-top: -1em;
  @media (max-width: ${500}px) {
    display: block;
  }
`;
//const Time = styled.div``;

//const Minutes = styled.div``;
