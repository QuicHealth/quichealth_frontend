import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Container, Layout, Title } from "../Notifications/NotificationLayout";
import { SidebarCollapseContext } from "../../context/SidebarCollapseContext";
import { Tabs } from "../Appointments/Appointmentlayout";
import { useGetSettings } from "../../queries/useAppointment";
import { Spin } from "../../utils/Spinners";
import { NavLink, Outlet } from "react-router-dom";

function SettingLayout({ expert }) {
  const { data: patientSettings, isLoading } = useGetSettings(expert);

  const { collapse, setCollapse } = useContext(SidebarCollapseContext);
  const Path = {
    UPDATE_LOGIN: expert
      ? "/expert-settings/updateLoginDetails"
      : "updateLoginDetails",
  };

  useEffect(() => {
    setCollapse(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <Spin />
      ) : (
        <Container collapse={collapse} setCollapse={setCollapse}>
          <div></div>
          <Layout>
            <Title>Settings</Title>
            <Tabs style={{ marginTop: "3em", marginBottom: "2em" }}>
              <NavLink to="." end>
                Account
              </NavLink>
              <NavLink to={Path.UPDATE_LOGIN}>Update login details</NavLink>
            </Tabs>

            {!isLoading && (
              <Outlet
                context={{ patientSettings, loading: isLoading, expert }}
              />
            )}
          </Layout>
        </Container>
      )}
    </>
  );
}

export default SettingLayout;
