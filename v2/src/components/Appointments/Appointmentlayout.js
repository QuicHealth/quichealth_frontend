import React, { useContext, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";
import { SidebarCollapseContext } from "../../context/SidebarCollapseContext";
import {
  useAppointment,
  usePaidAppointments,
} from "../../queries/useAppointment";
import { Spin } from "../../utils/Spinners";

function Appointmentlayout({ expert }) {
  const { collapse, setCollapse, isHover } = useContext(SidebarCollapseContext);
  const Path = {
    COMPLETED: expert
      ? "/expert-appointment/completed"
      : "/appointment/completed",
    CANCELLED: expert
      ? "/expert-appointment/cancelled"
      : "/appointment/cancelled",
  };

  const { data, isLoading } = usePaidAppointments(expert);

 // console.log(data, "appojtmems");
  const totalPendingAppointments = data?.Appointments.filter(
    (app) => app?.status === "pending"
  );

  useEffect(() => {
    setCollapse(false);
  }, []);
  if (isLoading) return <Spin />;

  return (
    <Container collapse={collapse}>
      <div></div>
      <Layout>
        <Title>Appointments</Title>
        <Subtitle>
          You have{" "}
          {!totalPendingAppointments ? "no" : totalPendingAppointments?.length}{" "}
          pending appointment{totalPendingAppointments?.length > 1 ? "s" : ""}.
        </Subtitle>
        <Tabs>
          <NavLink to="." end>
            Upcoming
          </NavLink>
          <NavLink to={Path.COMPLETED}>Completed</NavLink>
          <NavLink to={Path.CANCELLED}>Cancelled</NavLink>
        </Tabs>

        <Outlet context={{ expert, data }} />
      </Layout>
    </Container>
  );
}

export default Appointmentlayout;

export const Container = styled.div`
  background-color: #f1f1f1;
  position: relative;
  display: grid;
  grid-template-columns: ${(props) =>
    props.collapse ? "5em auto" : "15em auto"};
  width: 100%;

  &.viewprofile {
    height: 89vh;
  }

  @media only Screen and (max-width: 768px) {
    grid-template-columns: 100%;
  }
`;

const Layout = styled.div`
  padding: 0 1em;
  min-height: 85vh;
`;
export const Title = styled.h1`
  color: var(--darkGreen);
  margin-bottom: 0.1em;
  padding-left: 0.5em;
`;
export const Subtitle = styled.p`
  color: var(--grey);
  padding-left: 1em;
  margin-bottom: 3em;
`;
export const Tabs = styled.div`
  border-bottom: 1px solid #d5d5d5;
  margin-bottom: 1em;
  display: flex;
  align-items: center;
  @media only Screen and (max-width: 768px) {
    font-size: 13px;
  }
  a {
    font-weight: 500;
    color: var(--grey);
    padding: 0 2em;
    transition: all 0.3s ease;
    padding-bottom: 1em;
    &.active {
      border-bottom: 2px solid var(--lightGreen);
      color: var(--lightGreen);
    }
  }
`;
