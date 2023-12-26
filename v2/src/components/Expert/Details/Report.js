import React from "react";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";

function Report() {
  const { details } = useOutletContext();
  return (
    <Container>
      <ReportContent>
        <ReportTitle>What brings you to QuicHealth today ?</ReportTitle>
        <ReportBody>{details?.purpose}</ReportBody>
      </ReportContent>

      <ReportContent>
        <ReportTitle>
          What are your current symptoms? When did they start, and how severe
          are they?
        </ReportTitle>
        <ReportBody>{details?.symptoms}</ReportBody>
      </ReportContent>

      <ReportContent>
        <ReportTitle>
          Do you have any allergies or chronic conditions? If so, please
          describe.
        </ReportTitle>
        <ReportBody>{details?.allergies}</ReportBody>
      </ReportContent>

      <ReportContent>
        <ReportTitle>
          Are you taking any medications. If yes, What is it?
        </ReportTitle>
        <ReportBody>{details?.medications}</ReportBody>
      </ReportContent>

      <ReportContent>
        <ReportTitle>Anything else you’d like to share?</ReportTitle>
        <ReportBody>{details?.others}</ReportBody>
      </ReportContent>
    </Container>
  );
}

export default Report;

const Container = styled.div`
  background-color: var(--white);
  margin: 1em 0 3em 0;
`;
export const ReportContent = styled.div`
  padding: 1em;
  border-bottom: 1px solid #d5d5d5;
  &:last-child {
    border-bottom: 0px solid #d5d5d5;
  }
`;

export const ReportTitle = styled.h3`
  color: var(--grey);
  padding: 1em 0;

  @media only Screen and (max-width: 768px) {
    font-size: 1em;
  }
`;
export const ReportBody = styled.p`
  font-weight: 300;
  line-height: 21.6px;
  width: 98.5%;

  @media only Screen and (max-width: 768px) {
    font-size: 13px;
  }
`;
