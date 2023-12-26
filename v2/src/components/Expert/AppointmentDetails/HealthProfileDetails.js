import React from "react";
import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import { ReportBody, ReportContent, ReportTitle } from "../Details/Report";

function HealthProfileDetails() {
  const { user } = useOutletContext();

  console.log("user", user);

  const lorem =
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.";

  return (
    <Container>
      <PatientDetailsBox>
        <ReportTitle>Patient Details</ReportTitle>

        <PatientDetails>
          <LeftSide>
            <p>Sex</p>
            <p>Age</p>
            <p>Occupation</p>
            <p>Marital Status</p>
            <p>Height</p>
            <p>Weight</p>
            <p>Blood Group</p>
            <p>Genotype</p>
          </LeftSide>

          <RightSide>
            <p>{user?.gender ?? "Femail"}</p>
            <p>{user?.health_profile.age ?? "23"}</p>
            <p>{user?.health_profile.Occupation ?? "Lawyer"}</p>
            <p>{user?.health_profile.marital_status ?? "Single"}</p>
            <p>{user?.health_profile.height ?? "5.5"}</p>
            <p>{user?.health_profile.weight ?? "65"}</p>
            <p>{user?.health_profile.blood_group ?? "AA"}</p>
            <p>{user?.health_profile.genotype ?? "O+"}</p>
          </RightSide>
        </PatientDetails>
      </PatientDetailsBox>

      <PatientDetailsBox>
        <ReportContent>
          <ReportTitle>Allergies</ReportTitle>
          <ReportBody>{user?.health_profile.allergies ?? lorem}</ReportBody>
        </ReportContent>
        <ReportContent>
          <ReportTitle>Current Medication</ReportTitle>
          <ReportBody>{user?.health_profile.medication ?? lorem}</ReportBody>
        </ReportContent>

        <ReportContent>
          <ReportTitle>
            Medical conditions within the last 12 months
          </ReportTitle>
          <ReportBody>{user?.health_profile.condition ?? lorem}</ReportBody>
        </ReportContent>

        <ReportContent>
          <ReportTitle>Past Surgery</ReportTitle>
          <ReportBody>{user?.health_profile.past_surgery ?? lorem}</ReportBody>
        </ReportContent>

        <ReportContent>
          <ReportTitle>Family medical history</ReportTitle>
          <ReportBody>
            {user?.health_profile.family_medical_history ?? lorem}
          </ReportBody>
        </ReportContent>
      </PatientDetailsBox>
    </Container>
  );
}

export default HealthProfileDetails;

const Container = styled.div`
  //background-color: var(--white);
  margin: 1em 0 3em 0;
`;

const PatientDetailsBox = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 1.5em 1em 1.5em 1em;
  margin: 4em 10vw 2em 10vw;
  padding: 1em;
  font-size: 15px;
`;

const PatientDetails = styled.div`
  display: grid;
  grid-template-columns: 60% 35%;
  column-gap: 2em;
`;

const RightSide = styled.div`
  font-size: 15px;
  font-weight: 400;
  line-height: 21.6px;
  p {
    padding-bottom: 1em;
  }
`;
const LeftSide = styled.div`
  font-size: 15px;
  font-weight: 300;
  line-height: 21.6px;
  p {
    padding-bottom: 1em;
  }
`;

const PatientAppDetailsB = styled.div``;
