import React from "react";
import styled from "styled-components";
import DashboardNav from "../components/DashboardNav";
import HealthProfile from "../components/HealthProfile";

function DashboardHealthProfile() {
  return (
    <Container>
      <DashboardNav />
      <HealthProfile />
    </Container>
  );
}

export default DashboardHealthProfile;

const Container = styled.div``;
