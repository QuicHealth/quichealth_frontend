import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import DashboardNav from "./DashboardNav";
import Sidebar, { MobileSidebar } from "../Sidebar";
import { MobileClickContext } from "../../context/MobileClickContext";
import { useDashboard } from "../../queries/useDashboard";
import { Spin } from "../../utils/Spinners";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
import Logout from "../Logout/Logout";
import { SidebarCollapseContext } from "../../context/SidebarCollapseContext";

function DashboardLayout() {
  const [click, setClick] = useState(false);
  const { data, isLoading } = useDashboard();
  const { patientDetails, setPatientDetails } = useContext(GlobalContext);
  const { isLogout } = useContext(SidebarCollapseContext);

  console.log(data, "test");
  return (
    <MobileClickContext.Provider value={{ click, setClick }}>
      <Container>
        {isLoading && <Spin />}
        <DashboardNav userData={data?.data} />
        <Sidebar />
        <MobileSidebar />
        <Outlet context={{ userData: data?.data }} />
        {isLogout && <Logout />}
      </Container>
    </MobileClickContext.Provider>
  );
}

export default DashboardLayout;

const Container = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  background-color: #f1f1f1;
  position: relative;
`;
