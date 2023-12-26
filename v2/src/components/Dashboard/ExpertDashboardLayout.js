import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import DashboardNav from "./DashboardNav";
import Sidebar, { MobileSidebar } from "../Sidebar";
import { MobileClickContext } from "../../context/MobileClickContext";
import { useExpertDashboard } from "../../queries/useDashboard";
import { Spin } from "../../utils/Spinners";
import { SidebarCollapseContext } from "../../context/SidebarCollapseContext";
import Logout from "../Logout/Logout";

function ExpertDashboardLayout() {
  const [click, setClick] = useState(false);
  const { data, isLoading } = useExpertDashboard();
  const { isLogout } = useContext(SidebarCollapseContext);

  console.log(data, "expert");
  return (
    <MobileClickContext.Provider value={{ click, setClick }}>
      <Container>
        {isLoading && <Spin />}
        <DashboardNav expert={true} expertData={data} />
        <Sidebar expert={true} />
        <MobileSidebar expert={true} />
        <Outlet expert={true} context={{ expertData: data }} />
        {isLogout && <Logout expert={true} />}
      </Container>
    </MobileClickContext.Provider>
  );
}

export default ExpertDashboardLayout;

const Container = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  background-color: #f1f1f1;
  position: relative;
`;
