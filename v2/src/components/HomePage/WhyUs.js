import React from "react";
import styled from "styled-components";

function WhyUs() {
  return (
    <Container id="contact">
      <Title>Why use QuicHealth ?</Title>
      <SubTitle>
        Here are just some of the ways QuicHealth can make your life easier,
        offering many benefits and providing top quality healthcare that works
        for you.
      </SubTitle>

      <MobileTitle>
        Here are just some of the ways QuicHealth can make your life easier.
      </MobileTitle>

      <CardWrapper>
        <CardContainer>
          <CardTitle>Convenience</CardTitle>
          <CardContent>
            With QuicHealth, you can receive medical care from the comfort of
            your own home, without having to travel to a doctor's office or wait
            in a crowded waiting room.{" "}
          </CardContent>
        </CardContainer>
        <CardContainer>
          <CardTitle>Accessible</CardTitle>
          <CardContent>
            QuicHealth provides access to medical care for individuals who may
            not have been able to access it otherwise, including those living in
            rural areas or those with limited mobility.{" "}
          </CardContent>
        </CardContainer>
        <CardContainer>
          <CardTitle>Cost-effective</CardTitle>
          <CardContent>
            QuicHealth can often be more cost-effective than traditional
            in-person medical care. Without the need to travel to a doctor's
            office, you can save on transportation costs.{" "}
          </CardContent>
        </CardContainer>
        <CardContainer>
          <CardTitle>Time-saving</CardTitle>
          <CardContent>
            QuicHealth allows you to avoid the hassle of scheduling an
            appointment, traveling to a medical facility, and waiting in line to
            see a healthcare provider.{" "}
          </CardContent>
        </CardContainer>
      </CardWrapper>
    </Container>
  );
}

export default WhyUs;

const Container = styled.div`
  background: var(--background);
  width: 100vw;
  //height: 40vw;

  padding: 3rem 5rem;

  @media only Screen and (max-width: 768px) {
    padding: 2em;
    height: auto;
  }
`;

export const Title = styled.h1`
  text-align: center;
  color: var(--darkGreen);
  padding-bottom: 1.5rem;
  font-size: 3vw;
  line-height: 52.56px;

  &.faq {
    padding-bottom: 0.2em;
    line-height: normal;
    color: var(--white);
    display: block;
  }
  @media only Screen and (max-width: 768px) {
    font-size: 7vw;
    &.faq {
      text-align: unset;
      padding-bottom: 0;
      line-height: normal;
      display: none;
    }
  }
`;
export const SubTitle = styled.h5`
  color: var(--grey);
  text-align: center;
  font-size: 1.4vw;
  font-weight: 300;
  width: 80%;
  margin: auto;
  &.faq {
    margin-top: 1em;
    color: var(--white);
  }

  @media only Screen and (max-width: 768px) {
    display: none;
    &.faq {
      margin-top: 1.5em;
      display: unset;
      font-size: 3vw;
    }
  }
`;

const MobileTitle = styled.h5`
  display: none;
  @media only Screen and (max-width: 768px) {
    display: block;
  }
  color: var(--grey);
  text-align: center;
  font-size: 4vw;
  font-weight: 300;
  width: 100%;
  margin: auto;
`;

const CardWrapper = styled.div`
  display: flex;
  @media only Screen and (max-width: 768px) {
    display: block;
  }
`;

const CardContainer = styled.div`
  background-color: var(--white);
  padding: 2em 1em;
  margin: 1em;
  border-radius: 5px;
  -webkit-box-shadow: 10px 7px 10px 3px rgba(45, 45, 45, 0.07);
  box-shadow: 10px 7px 10px 3px rgba(45, 45, 45, 0.07);

  @media only Screen and (max-width: 768px) {
    padding: 2em;
    width: calc(80% + 10vw);
  }
  //width: 25vw;
`;
const CardTitle = styled.h4`
  text-align: center;
  color: var(--darkGreen);
  font-size: 2vw;

  @media only Screen and (max-width: 768px) {
    font-size: 6vw;
  }
`;
const CardContent = styled.p`
  text-align: center;
  margin-top: 1em;
  color: var(--grey);
  font-weight: 300;
  line-height: 21.6px;
  font-size: 1.3vw;

  @media only Screen and (max-width: 768px) {
    font-size: 4vw;
  }
`;
