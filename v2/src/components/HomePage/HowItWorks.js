import React from "react";
import styled from "styled-components";
import createAcct from "./../../assets/createAcct.png";
import icon from "./../../assets/Iconpx.png";
import medics from "./../../assets/medics.png";
import work from "./../../assets/itworks.svg";

function HowItWorks() {
  return (
    <HowItWorkSection id="howitwork">
      <LeftSection>
        <img src={work} alt="createAcct" />
      </LeftSection>
      <RightSection>
        <Title>How it Works</Title>
        <Topic>Access quality medical care today in 3 simple steps</Topic>
        <SubSection>
          <MiniContainer>
            <Icon>
              <img src={createAcct} alt="createAcct" />
            </Icon>
            <Line></Line>
          </MiniContainer>
          <div>
            <SubTitle>Create an account</SubTitle>
            <Content>
              Create an account by providing your basic information, such as
              your name, email address, phone number, and upload any relevant
              medical records.
            </Content>
          </div>
        </SubSection>
        <SubSection>
          <MiniContainer>
            <Icon>
              <img src={icon} alt="createAcct" />
            </Icon>
            <Line></Line>
          </MiniContainer>
          <div>
            <SubTitle>Schedule an appointment</SubTitle>
            <Content>
              Log in to your account and select a healthcare provider to
              schedule an appointment. Choose a convenient date and time for the
              appointment.
            </Content>
          </div>
        </SubSection>

        <SubSection>
          <MiniContainer>
            <Icon>
              <img src={medics} alt="createAcct" />
            </Icon>
            <Line className="last"></Line>
          </MiniContainer>
          <div>
            <SubTitle>Receive diagnosis and treatment</SubTitle>
            <Content>
              During the appointment, the healthcare provider will ask you
              questions about your symptoms and medical history. Based on the
              information provided, the healthcare provider will provide a
              diagnosis and recommend a treatment plan.
            </Content>
          </div>
        </SubSection>
      </RightSection>
    </HowItWorkSection>
  );
}

export default HowItWorks;

const HowItWorkSection = styled.div`
  width: 100vw;
  //height: 55vw;
  display: grid;
  background-color: var(--white);
  grid-template-columns: 50% 50%;
  padding: 3em 5em;
  @media only Screen and (max-width: 768px) {
    display: block;
    height: auto;
    padding: 2em;
  }
`;
export const Title = styled.h3`
  color: var(--lightGreen);
  text-transform: uppercase;
  text-align: left;
  font-weight: 500;
  padding-bottom: 1rem;

  @media only Screen and (max-width: 768px) {
  }
`;
const Topic = styled.h1`
  color: var(--darkGreen);
  font-size: 3.2vw;
  width: 110%
  line-height: 52.65px;

  @media only Screen and (max-width: 768px) {
    font-size: 7vw;
}
`;
const LeftSection = styled.div`
  margin-top: 3rem;
  @media only Screen and (max-width: 768px) {
    display: none;
  }
`;
const RightSection = styled.div``;
export const SubSection = styled.div`
  display: grid;
  grid-template-columns: 10% auto;
  margin-top: 1rem;
  justify-items: center;
  column-gap: 1rem;
`;
export const SubTitle = styled.h3`
  color: var(--darkGreen);
  margin-bottom: 0.5rem;
  font-size: 1.3vw;
  padding-top: 0.4em;

  @media only Screen and (max-width: 768px) {
    font-size: 4vw;
  }
`;
export const Content = styled.h3`
  color: var(--grey);
  font-weight: 300;
  line-height: 21.6px;
  font-size: 1.3vw;


  @media only Screen and (max-width: 768px) {
    font-size: 4vw;
  }

`;

const MiniContainer = styled.div`
  display: grid;
  justify-items: center;
`;
const Icon = styled.div``;
const Line = styled.div`
  width: 0.5px;
  height: 5rem;
  background-color: var(--lightGreen);

  @media only Screen and (max-width: 768px) {
    display: none;
  }

  &.last {
    background-color: transparent;
  }
`;
