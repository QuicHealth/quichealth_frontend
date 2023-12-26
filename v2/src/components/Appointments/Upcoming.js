import React, { useContext } from "react";
import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import timer from "./../../assets/timer.png";
import { usePaidAppointments } from "../../queries/useAppointment";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
import { Spin } from "../../utils/Spinners";
import { addAMPMToTime, formatDate } from "../../utils/MonthAndDate";
import dayjs from "dayjs";
import AvatarImage from "../../utils/AvatarImage";

function Upcoming() {
  const navigate = useNavigate();
  const { setPatientZoomDetails, setExpertZoomDetails } =
    useContext(GlobalContext);
  const { expert, data } = useOutletContext();
  const totalPendingAppointments = data?.Appointments.filter(
    (app) => app?.status === "pending"
  );

  if (!totalPendingAppointments?.length)
    return <div>You have no pending appointments</div>;

  return (
    <CardsSection>
      {data?.Appointments?.filter((apps) => apps.status === "pending").map(
        (app, id) => {
          return (
            <Cards key={id}>
              <MobileCategory>
                <MobileCategory className="pix">
                  <DocImg>
                    {!expert ? (
                      app?.doctor?.profile_pic_link ? (
                        <img src={app?.doctor?.profile_pic_link} alt="pix" />
                      ) : (
                        <AvatarImage name={app?.doctor?.name} />
                      )
                    ) : app?.user?.profile_pic_link ? (
                      <img src={app?.user?.profile_pic_link} alt="pix" />
                    ) : (
                      <AvatarImage
                        name={`${app?.user?.firstname} ${app?.user?.lastname}`}
                      />
                    )}
                  </DocImg>
                  <h3>
                    {!expert
                      ? app?.doctor.name
                      : `${app?.user?.firstname} ${app?.user?.lastname}`}
                  </h3>
                </MobileCategory>
                <MobileCategory className="timer">
                  <img src={timer} alt="timer" />
                  <p>Starts in now</p>
                </MobileCategory>
              </MobileCategory>

              {!expert && (
                <MobileCategory>
                  <MobileTitle>Speciality</MobileTitle>
                  <p>Pediatrician</p>
                </MobileCategory>
              )}

              <MobileCategory>
                <MobileTitle>Date</MobileTitle>

                <h4>{formatDate(app.date)}</h4>
              </MobileCategory>

              <MobileCategory className="last">
                <MobileTitle>Time</MobileTitle>
                <Time>
                  <p>
                    {addAMPMToTime(app.start)} - {addAMPMToTime(app.end)}
                  </p>
                </Time>
              </MobileCategory>

              <Button
                onClick={() => {
                  expert
                    ? setExpertZoomDetails(app?.zoom_meeting)
                    : setPatientZoomDetails(app?.zoom_meeting);
                  // localStorage.setItem("zoom", JSON.stringify(app.zoom_meeting));
                  expert ? navigate("/expert-meeting") : navigate("/meeting");
                }}
                status={app.status}
              >
                {app.status ? "Join Meeting" : "Pending"}
              </Button>
            </Cards>
          );
        }
      )}
    </CardsSection>
  );
}

export default Upcoming;

export const CardsSection = styled.div`
  display: grid;
  grid-template-columns: 30% 30% 30%;
  gap: 4% 0%;
  justify-content: space-around;
  margin-bottom: 5em;
  margin-top: 2em;

  @media only Screen and (max-width: 768px) {
    grid-template-columns: 100%;
    gap: 1% 0%;
  }
`;

export const Cards = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 1.5em 1em 1.5em 1em;

  @media only Screen and (max-width: 768px) {
    //display: flex;
  }

  h3 {
    color: var(--grey);
    padding-bottom: 0.7em;
    font-weight: 500;

    @media only Screen and (max-width: 768px) {
      font-size: 16px;
    }
  }
  p {
    padding-bottom: 0.7em;
    font-weight: 300;
    color: #777777;

    @media only Screen and (max-width: 768px) {
      //display: flex;
      color: var(--grey);

      font-weight: 500;
      font-size: 16px;
    }
  }
  h4 {
    color: var(--grey);
    padding-bottom: 0.7em;
    font-weight: 500;
    @media only Screen and (max-width: 768px) {
      font-size: 16px;
    }
  }
`;

export const DocImg = styled.div`
  padding-bottom: 0.7em;
  img {
    border-radius: 50%;
    width: 4em;
    @media only Screen and (max-width: 768px) {
      padding-right: 1em;
    }
  }
`;

export const Time = styled.div`
  border-bottom: 1px solid #d5d5d5;
  padding-bottom: 1.5em;
  p {
    padding-bottom: 0.7em;
    font-weight: 500;
    color: var(--grey);
  }
  @media only Screen and (max-width: 768px) {
    border-bottom: 0;
  }
`;

export const Button = styled.button`
  margin-top: 2em;
  width: 100%;
  font-size: 20px;
  padding: 1rem 2.5rem;
  border-radius: 10px;
  color: ${(props) => (props.status ? "var(--white)" : "#d5d5d5")};
  background: ${(props) => (props.status ? "var(--lightGreen)" : "#Ebebeb")};

  transition: all 0.2s;

  cursor: pointer;

  &:hover {
    transform: scale(1);
  }
  &:focus {
    transform: scale(1);
  }
  &.completed {
    &:hover {
      transform: scale(1.1);
    }
    &:focus {
      transform: scale(0.9);
    }
  }
  @media only Screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

export const MobileTitle = styled.p`
  display: none;
  @media only Screen and (max-width: 768px) {
    display: block;
    color: #777777;
    padding-bottom: 0.7em;
    font-weight: 400;
  }
`;

export const MobileCategory = styled.div`
  &.history {
    display: flex;
  }
  @media only Screen and (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0.5em;

    :nth-child(2) {
      padding-top: 1em;
    }
    p {
      font-size: 13px;
    }
  }

  &.pix {
    align-items: center;
    justify-content: normal;
  }
  &.timer {
    display: none;
    @media only Screen and (max-width: 768px) {
      display: flex;
    }
    align-items: center;
    margin-bottom: 0.5em;
    p {
      padding: 0;
      font-size: 12px;
    }
    img {
      width: 0.7em;
      margin-right: 0.2em;
    }
  }

  &.last {
    @media only Screen and (max-width: 768px) {
      border-bottom: 1px solid #d5d5d5;
      padding-bottom: 1.5em;
    }
  }

  &.histdetails {
    p {
      display: flex;
      justify-content: flex-start;
    }
    @media only Screen and (max-width: 768px) {
      border-bottom: 1px solid #d5d5d5;
      padding-bottom: 1em;
    }
  }
`;
