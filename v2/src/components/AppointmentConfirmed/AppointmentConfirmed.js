import React, { useContext, useEffect } from "react";
import { Container } from "../Appointments/Appointmentlayout";
import { Sidebar } from "../ViewProfile/ViewProfile";
import { Layout } from "../Notifications/NotificationLayout";

import checked from "./../../assets/checked.svg";
import styled from "styled-components";
import { SidebarCollapseContext } from "../../context/SidebarCollapseContext";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
import { useVerifyPay } from "../../queries/useAppointment";
import { addAMPMToTime, formatDate } from "../../utils/MonthAndDate";

function AppointmentConfirmed() {
  const { collapse, setCollapse, isHover } = useContext(SidebarCollapseContext);
  const { appointmentDetails } = useContext(GlobalContext);
  const { verifyPays, isLoading } = useVerifyPay();
  const appointment =
    localStorage?.getItem("app") !== "undefined" &&
    JSON.parse(localStorage.getItem("app"));
  const navigate = useNavigate();

  console.log(appointmentDetails, appointment, "externa");

  useEffect(() => {
    setCollapse(true);
  }, []);
  // useEffect(() => {
  //    verifyPays(externalPaymentResponse);
  // }, [externalPaymentResponse]);
  return (
    <Container collapse={collapse}>
      <Sidebar></Sidebar>
      <Layout>
        <SubContainer>
          <AppointmentConfirm isHover={isHover}>
            <img src={checked} alt="checked" />
            <h1>Congratulations!</h1>
            <p>Your appointment has been confirmed</p>
          </AppointmentConfirm>

          <AppointmentDetails isHover={isHover}>
            <h3>Appointment Details</h3>
            <Section>
              <LeftSection>
                <h4>Name</h4>
                <h4>Specialty</h4>
                <h4>Date</h4>
                <h4>Time</h4>
                <h4>Fee</h4>
              </LeftSection>
              <RightSection>
                <p>{appointment.doctor?.name}</p>
                <p>{appointment.doctor?.specialty}</p>
                <p>{formatDate(appointment.date)}</p>
                <p>{addAMPMToTime(appointment.start)}</p>
                <p>{100}</p>
              </RightSection>
            </Section>
          </AppointmentDetails>

          <Button onClick={() => navigate("/dashboard")} isHover={isHover}>
            Back to dashboard
          </Button>
        </SubContainer>
      </Layout>
    </Container>
  );
}

export default AppointmentConfirmed;

const SubContainer = styled.div`
  max-width: 30em;
  margin: auto;

  @media only Screen and (max-width: 768px) {
    width: 100%;
  }
`;
const AppointmentConfirm = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em;
  border-radius: 10px;
  margin: 2em 1em;
  position: relative;
  left: ${(props) => (props.isHover ? "3em" : "0")};
  transition: all 0.2s;
  img {
    width: unset;
    @media only Screen and (max-width: 768px) {
      width: 6em;
    }
  }

  h1 {
    padding: 0.5em 0px 0.2em;
    color: var(--grey);
    line-height: 52px;
    @media only Screen and (max-width: 768px) {
      font-size: 1.5em;
      padding: 0.2rem 0;
    }
  }

  p {
    color: var(--grey);
    line-height: 27px;
    @media only Screen and (max-width: 768px) {
      font-size: 14px;
      // padding: 0.8rem 1rem;
    }
  }

  @media only Screen and (max-width: 400px) {
    padding: 1em;

    p {
      font-size: 12px;
    }
  }
`;
const AppointmentDetails = styled.div`
  background: white;
  color: var(--grey);
  padding: 2em;
  border-radius: 10px;
  margin: 2em 1em;
  position: relative;
  left: ${(props) => (props.isHover ? "3em" : "0")};
  transition: all 0.2s;
  @media only Screen and (max-width: 768px) {
    h3 {
      font-size: 1em;
    }
  }
  @media only Screen and (max-width: 400px) {
    padding: 1em;
  }
`;
const Section = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5em;
`;
const LeftSection = styled.div`
  h4 {
    padding: 0.5em 0;

    @media only Screen and (max-width: 768px) {
      font-size: 0.7em;
    }
  }
`;
const RightSection = styled.div`
  p {
    padding: 0.5em 0;
    @media only Screen and (max-width: 768px) {
      font-size: 0.7em;
    }
  }
`;

const Button = styled.button`
  font-size: 15px;
  padding: 0.8rem 2rem;
  border-radius: 7px;
  background-color: var(--lightGreen);
  color: var(--white);
  //border: 1px solid var(--lightGreen);
  transition: all 0.2s;
  width: 15em;
  margin: 2em auto;
  display: flex;
  justify-content: center;
  cursor: pointer;
  position: relative;
  left: ${(props) => (props.isHover ? "3em" : "0")};

  &:hover {
    transform: scale(1.1);
  }
  &:focus {
    transform: scale(0.9);
  }
  @media only Screen and (max-width: 768px) {
    font-size: 13px;
    padding: 0.8rem 1rem;
  }
`;
