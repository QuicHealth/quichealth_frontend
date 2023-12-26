import React, { useContext, useEffect } from "react";

import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";
import { SidebarCollapseContext } from "../../context/SidebarCollapseContext";
import { useGetNotifications } from "../../queries/useAppointment";
import { Spin } from "../../utils/Spinners";

function NotificationLayout({ expert }) {
  // const path ={
  //   UNREAD : expert ? "" : ""
  // }
  const { collapse, setCollapse } = useContext(SidebarCollapseContext);
  const { data, isLoading } = useGetNotifications(expert);

  console.log(data?.data?.notifications, "notificsyiondata");
  //const notifications = data?.data?.notifications;

  useEffect(() => {
    setCollapse(false);
  }, []);

  if (isLoading) return <Spin />;
  return (
    <Container collapse={collapse}>
      <div></div>
      <Layout>
        <Title>Notifications</Title>
        <Subtitle>
          You have {data?.data?.new_notifications} new notifications today!
        </Subtitle>
        <Tabs>
          <NavLink to="." end>
            All messages
          </NavLink>
          <NavLink to="unread">Unread messages</NavLink>
        </Tabs>

        {!isLoading && (
          <Outlet context={{ notifications: data?.data?.notifications }} />
        )}
      </Layout>
    </Container>
  );
}

export default NotificationLayout;

export const Container = styled.div`
  background-color: #f1f1f1;
  position: relative;
  display: grid;
  grid-template-columns: 15em auto;
  width: 100%;
  @media only Screen and (max-width: 768px) {
    grid-template-columns: 100%;
  }
`;

export const Layout = styled.div`
  padding: 0 1em;
  min-height: 85vh;

  &.question {
  }

  @media only Screen and (max-width: 768px) {
    padding: 0;
    &.expert {
      padding: 0 1em;
    }
  }
`;
export const Title = styled.h1`
  color: var(--darkGreen);
  margin-bottom: 0.1em;
  padding-left: 0.5em;

  @media only Screen and (max-width: 768px) {
    font-size: 22px;
  }
`;
export const Subtitle = styled.p`
  color: var(--grey);
  padding-left: 1em;
  margin-bottom: 3em;

  @media only Screen and (max-width: 768px) {
    font-size: 12px;
  }
`;
const Tabs = styled.div`
  border-bottom: 1px solid #d5d5d5;
  margin-bottom: 1em;
  display: flex;
  align-items: center;
  @media only Screen and (max-width: 768px) {
    font-size: 12px;
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
