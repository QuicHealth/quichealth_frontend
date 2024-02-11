import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import SideBar from "./SideBar";
import { decrement, increment, PageLimtier, ProfileImage } from "./Overview";
import { Icon } from "./SelectAppointment";
import ExpertSidebar from "./Expert/ExpertSidebar";
import { getPatientZoomMeeting } from "../redux/actions/PatientActions";
import { useHistory } from "react-router-dom";
import { createMeeting } from "../redux/actions/DoctorActions";
import { getAllPaidAppointments } from "../redux/actions/PatientActions";

export function convertTimeToTwelveHrs(time) {
  let newTime;
  // return time.slice(0, 2)
  if (time.slice(0, 2) < 9) {
    newTime = parseInt(time.slice(0, 2)) + 12;
    newTime = newTime + time.substr(2);
    return newTime;
  }
  return time;
}

function Appointments({
  expert,
  openSidebar,
  getAllPaidAppointments,
  allPaidApp,
  createMeeting,
}) {
  console.log(allPaidApp, "äppointmemnt");
  let history = useHistory();

  let current = new Date();
  let currentTime = current.toLocaleTimeString();

  const [limit, setLimit] = useState(3);
  const [count, setCount] = useState(0);
  let appointments = allPaidApp?.slice(count, count + limit);

  const [appoint, setAppointment] = useState(appointments);

  useEffect(() => {
    setAppointment(appointments);
  }, [count]);

  useEffect(() => {
    getAllPaidAppointments();
  }, []);
  return (
    <Container sidebar={openSidebar}>
      {expert ? <ExpertSidebar /> : <SideBar />}
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

        {appointments?.length < 1 ? (
          <NoDataBox>No Appointment available</NoDataBox>
        ) : (
          <AppointmentContainerWrapper sidebar={openSidebar}>
            {appointments?.map((appointment, id) => {
              return (
                <AppointmentContainer>
                  <CheckBox className="active"></CheckBox>
                  <Image>
                    <img
                      src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg"
                      alt=""
                    />
                  </Image>
                  <Details>
                    <div>
                      <Name>{appointment?.doctor?.name}</Name>
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
                      // disabled={
                      //   currentTime.slice(0, 5) !==
                      //   convertTimeToTwelveHrs(appointment.start)
                      // }
                      className="active"
                      onClick={() => {
                        //createMeeting(value);
                        setTimeout(() => {
                          history.push("/meeting");
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
        )}
        <PageLimtier
          RowCount={4}
          TotalCount={1024}
          increment={increment}
          decrement={decrement}
          setCount={setCount}
          count={count}
          limit={limit}
          array={allPaidApp}
        />
      </MainBody>
    </Container>
  );
}

const mapStateProps = (state) => ({
  openSidebar: state.utils.openSidebar,
  allPaidApp: state.patient.allPaidApp,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAllPaidAppointments: () => dispatch(getAllPaidAppointments()),
    getPatientZoomMeeting: () => dispatch(getPatientZoomMeeting()),
    createMeeting: (value) => dispatch(createMeeting(value)),
  };
};

export default Appointments = connect(
  mapStateProps,
  mapDispatchToProps
)(Appointments);

export const Container = styled.div`
  display: grid;
  grid-template-columns: ${({ sidebar }) => (sidebar ? "20% 80%" : "10% auto")};
  height: 100vh;

  &.payment {
    grid-template-columns: 100%;
  }

  @media (max-width: ${1080}px) {
    grid-template-columns: ${({ sidebar }) =>
      sidebar ? "25% auto" : "10% auto"};
  }

  @media (max-width: ${700}px) {
    grid-template-columns: ${({ sidebar }) =>
      sidebar ? "12% 88%" : "10% auto"};
  }
`;
export const MainBody = styled.div`
  background: linear-gradient(180deg, #e7e7ed, #ffffff);
  border-top-right-radius: 15px;
  padding: ${({ sidebar }) => (sidebar ? "3em 2em;" : "5em 7em 0em 0em;")};
  margin-right: 0.7em;
  font-size: 1em;

  @media (max-width: ${800}px) {
    font-size: 17px;
  }

  @media (max-width: ${700}px) {
    font-size: 15px;
    padding: 1.5em 2em 2em;
  }
  @media (max-width: ${500}px) {
    font-size: 9px;
    padding: 1.5em 1em 3em 1em;

    &.notify {
      padding: 1.5em 0 1.5em 0;
    }
  }
`;
export const AppointmentContainer = styled.div`
  display: grid;
  grid-template-columns: 5% 15% 65% 20%;
  margin-top: 1em;
  padding: 1em;
  background-color: white;
  box-shadow: 2px 3px #2e302f4a;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  align-items: center;
  font-weight: 600;
  font-family: "Poppins", sans-serif;

  @media (max-width: ${800}px) {
    font-size: 17px;
  }

  @media (max-width: ${750}px) {
    font-size: 15px;
    padding: 0.5em;
  }
  @media (max-width: ${500}px) {
    font-size: 11px;
    padding: 1em;
    width: 100%;
    grid-template-columns: 5% 23% 47% 25%;
    background-color: #e9e9ef;
    border-radius: 16px;
    box-shadow: none;
  }
`;
export const CheckBox = styled.div`
  height: 0.8em;
  width: 0.8em;
  border-radius: 100%;
  background-color: #c1c1c9;

  @media (max-width: ${750}px) {
    height: 0.7em;
    width: 0.7em;
  }
  @media (max-width: ${500}px) {
    height: 0.5em;
    width: 0.5em;
  }
  &.active {
    background-color: #3e67b0;
  }
`;
export const Image = styled.div`
  > img {
    width: 5em;
    height: 5em;
    border-radius: 100%;

    @media (max-width: ${750}px) {
      width: 4em;
      height: 4em;
    }
    @media (max-width: ${500}px) {
      width: 4em;
      height: 4em;

      &.notify {
        width: 2.5em;
        height: 2.5em;
      }
    }
    &.history {
      width: 5em;
      height: 6em;
      padding: 0.5em 0;
    }
  }
`;
export const Details = styled.div`
  display: grid;
  grid-template-columns: 25% 20% 25% 20%;
  align-items: center;

  @media (max-width: ${500}px) {
    grid-template-columns: 100%;
  }
  &.history {
    grid-template-columns: 100%;
  }
`;
export const Name = styled.h4`
  font-size: 1.3em;
  text-align: center;
  @media (max-width: ${750}px) {
    font-size: 10px;
  }
  @media (max-width: ${500}px) {
    font-size: 14px;
  }
`;
export const ViewProfile = styled.span`
  font-size: 13px;
  color: #048be8;
  font-weight: 600;
  margin-left: 3em;

  &.selectAppointment {
    font-weight: 500;
    margin-left: 0em;
  }
  @media (max-width: ${750}px) {
    // font-size: 10px;
  }
  @media (max-width: ${500}px) {
    font-size: 11px;
  }
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;
export const Dates = styled.div`
  display: block;
  text-align: center;
  line-height: 15px;
  @media (max-width: ${750}px) {
    font-size: 10px;
  }
  @media (max-width: ${500}px) {
    display: flex;
    font-size: 10px;
  }
`;
export const Time = styled.div`
  display: block;
  text-align: center;
  line-height: 15px;

  @media (max-width: ${750}px) {
    font-size: 10px;
  }
  @media (max-width: ${500}px) {
    display: none;
    font-size: 10px;
    text-align: center;
    font-weight: 300;
  }
`;
export const Minutes = styled.div`
  line-height: 15px;
  text-align: center;
  @media (max-width: ${750}px) {
    font-size: 10px;
  }
  @media (max-width: ${500}px) {
    font-size: 10px;
    display: flex;
    font-weight: 300;
  }
`;
export const Meeting = styled.button`
  text-align: center;
  padding: 0.5em;
  line-height: 16px;
  width: 10em;
  font-size: 16px;
  font-weight: bold;

  :disabled {
    opacity: 0.5;
  }

  @media (max-width: ${750}px) {
    font-size: 10px;
  }
  @media (max-width: ${500}px) {
    font-size: 9px;
  }
  &.active {
    background-color: #2fa5a9;
    color: #fff;
    border-radius: 100px;
  }
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

export const AppointmentContainerWrapper = styled.div`
  @media (max-width: ${500}px) {
    padding-top: 7em;
    position: relative;
    width: 100%;
    /* padding: 0 0em; */
    right: ${({ sidebar }) => (sidebar ? "0" : "1.5em")};
    padding: ${({ sidebar }) =>
      sidebar ? "7em 1em 0em 1em" : "7em 0em 0 0em"};
  }
`;

export const HeadSection = styled.div`
  display: grid;

  @media (max-width: ${500}px) {
    grid-template-columns: 80% 20%;
  }

  h1 {
    display: none;

    @media (max-width: ${500}px) {
      display: block;
      text-align: center;
      font-size: 20px;
      position: relative;
      left: ${({ sidebar }) => (sidebar ? "0em" : "1em")};
      top: ${({ sidebar }) => (sidebar ? "0em" : "0.3em")};
    }
  }
`;

export const Dot = styled.span`
  text-align: center;
`;

export const NoDataBox = styled.h3`
  text-align: center;
`;
