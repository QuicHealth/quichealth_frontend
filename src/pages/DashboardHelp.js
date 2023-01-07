import React from "react";
import styled from "styled-components";
import DashboardNav from "../components/DashboardNav";
import Help from "../components/Help";

function DashboardHelp() {
  return (
    <Container>
      <DashboardNav />
      <Help />
    </Container>
  );
}

export default DashboardHelp;

const Container = styled.div``;
