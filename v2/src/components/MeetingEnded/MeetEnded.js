import React, { useContext, useEffect } from "react";
import { Container } from "../Appointments/Appointmentlayout";
import { Sidebar } from "../ViewProfile/ViewProfile";
import { Layout as L } from "../Notifications/NotificationLayout";

import styled from "styled-components";
import { Button } from "../HealthProfile/HealthProfile";
import { SidebarCollapseContext } from "../../context/SidebarCollapseContext";
import { useNavigate } from "react-router-dom";

function MeetEnded() {
  const { collapse, setCollapse } = useContext(SidebarCollapseContext);
  const navigate = useNavigate();

  useEffect(() => {
    setCollapse(true);
  }, []);
  return (
    <Container collapse={collapse}>
      <Sidebar></Sidebar>
      <Layout>
        <Section>
          <h2>Meeting ended</h2>
          <ButtonBox>
            <p onClick={() => navigate("/dashboard")}>
              Back to the home screen
            </p>
            <Button onClick={() => navigate("/history")}>
              View Doctor's feedback
            </Button>
          </ButtonBox>
        </Section>
      </Layout>
    </Container>
  );
}

export default MeetEnded;

const Layout = styled(L)`
  height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Section = styled.div`
  background: white;
  padding: 2em;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    color: var(--grey);
  }
  @media only Screen and (max-width: 768px) {
    margin: 1em;
    width: 100%;
    padding: 1em;

    h2 {
      font-size: 1.2em;
    }
  }
`;

const ButtonBox = styled.div`
  display: flex;
  /* align-items: center;
  justify-content: flex-end; */
  gap: 2em;
  padding: 2em 0em;
  margin-top: 3em;
  align-items: center;

  p {
    transition: all 0.2s;
    color: var(--grey);
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
    &:focus {
      transform: scale(0.9);
    }
  }

  @media only Screen and (max-width: 768px) {
    flex-direction: column-reverse;
    margin-top: 1em;
    p {
      font-size: 13px;
    }
  }
`;
