import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { SubTitle, Title } from "./WhyUs";
import nurse from "./../../assets/nurse.png";

function FAQ() {
  const [click, setClick] = useState(1);
  return (
    <Container>
      <Title className="faq">Frequently Asked Questions</Title>
      <SubTitle>
        Our FAQ section provides clear and concise answers to common questions
        and concerns to help you make informed decisions about your healthcare
      </SubTitle>

      <Section>
        <LeftSection>
          <img src={nurse} alt="createAcct" />
        </LeftSection>
        <RightSection>
          <SectionWrapper clicked={click === 1 ? true : false}>
            <Subsection>
              <Subtitle>What is telemedicine?</Subtitle>
              <Icon>
                <Arrow
                  id="1"
                  onClick={() => (click === 1 ? setClick(0) : setClick(1))}
                  clicked={click === 1 ? true : false}
                ></Arrow>
              </Icon>
            </Subsection>
            <Content
              id="1"
              clicked={click === 1 ? true : false}
              className="faq"
            >
              <h3>
                Telemedicine is the use of technology to provide medical care
                remotely. With telemedicine, patients can connect with
                healthcare providers using video conferencing, phone calls, or
                messaging, allowing them to receive medical care from the
                comfort of their own home.
              </h3>
            </Content>
          </SectionWrapper>

          <SectionWrapper clicked={click === 2 ? true : false}>
            <Subsection>
              <Subtitle>
                How do I schedule an appointment on QuicHealth?
              </Subtitle>
              <Icon>
                <Arrow
                  onClick={() => (click === 2 ? setClick(0) : setClick(2))}
                  clicked={click === 2 ? true : false}
                ></Arrow>
              </Icon>
            </Subsection>
            <Content clicked={click === 2 ? true : false} className="faq">
              <h3>
                Telemedicine is the use of technology to provide medical care
                remotely. With telemedicine, patients can connect with
                healthcare providers using video conferencing, phone calls, or
                messaging, allowing them to receive medical care from the
                comfort of their own home.
              </h3>
            </Content>
          </SectionWrapper>
          <SectionWrapper clicked={click === 3 ? true : false}>
            <Subsection>
              <Subtitle>
                What kind of medical conditions can be treated using QuicHealth?
              </Subtitle>
              <Icon>
                <Arrow
                  onClick={() => (click === 3 ? setClick(0) : setClick(3))}
                  clicked={click === 3 ? true : false}
                ></Arrow>
              </Icon>
            </Subsection>
            <Content clicked={click === 3 ? true : false} className="faq">
              <h3>
                Telemedicine is the use of technology to provide medical care
                remotely. With telemedicine, patients can connect with
                healthcare providers using video conferencing, phone calls, or
                messaging, allowing them to receive medical care from the
                comfort of their own home.
              </h3>
            </Content>
          </SectionWrapper>
          <SectionWrapper clicked={click === 4 ? true : false}>
            <Subsection>
              <Subtitle>Is QuicHealth secure and private?</Subtitle>
              <Icon>
                <Arrow
                  onClick={() => (click === 4 ? setClick(0) : setClick(4))}
                  clicked={click === 4 ? true : false}
                ></Arrow>
              </Icon>
            </Subsection>
            <Content clicked={click === 4 ? true : false} className="faq">
              <h3>
                Telemedicine is the use of technology to provide medical care
                remotely. With telemedicine, patients can connect with
                healthcare providers using video conferencing, phone calls, or
                messaging, allowing them to receive medical care from the
                comfort of their own home.
              </h3>
            </Content>
          </SectionWrapper>
        </RightSection>
      </Section>
    </Container>
  );
}

export default FAQ;

//const Container = styled.div``;

const move = keyframes`
0% { transform: translateY(-1px)  }
    50% { transform: translateY(1.5px) }
    100% { transform: translateY(-1px) }
`;

const Container = styled.div`
  background: var(--white);
  width: 100vw;
  //height: 55vw;

  padding: 3rem 5rem;

  @media only Screen and (max-width: 768px) {
    padding: 3em;
    height: auto;
  }
`;

const Section = styled.div`
  display: grid;
  background-color: var(--white);
  grid-template-columns: 45% 50%;
  column-gap: 4em;
  @media only Screen and (max-width: 768px) {
    display: block;
    height: auto;
    width: 100%: ;
    //padding: 2em;
  }
`;
const LeftSection = styled.div`
  padding: 2em;
  img {
    width: 35vw;
  }
  @media only Screen and (max-width: 768px) {
    display: none;
  }
`;

export const RightSection = styled.div`
  margin-top: 6em;

  &.help {
    margin-top: 0em;
  }
  @media only Screen and (max-width: 768px) {
    margin-top: 0;
  }
`;

export const Icon = styled.span``;

export const Subtitle = styled.h3`
  color: var(--darkGreen);
  margin-bottom: 0.5rem;
  font-size: 1.3vw;
  padding-top: 0.4em;
  &.grid {
    display: grid;
    -webkit-box-pack: justify;
    justify-content: space-between;
    grid-template-columns: 80% auto;
  }

  @media only Screen and (max-width: 768px) {
    font-size: 4vw;
    width: 80%;

    &.grid {
      display: flex;
    }
  }
`;

export const Subsection = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Content = styled.div`
  display: ${(props) => (props.clicked ? "flex" : "none")};
  position: relative;
  width: 38vw;
  flex-direction: column;
  align-items: center;
  top: 100%;
  left: 0;
  right: 0;
  opacity: ${(props) => (props.clicked ? "1" : 0)};
  visibility: ${(props) => (props.clicked ? "1" : 0)};
  transition: all 1s ease;

  h3 {
    color: var(--grey);
    font-weight: 300;
    line-height: 21.6px;
    font-size: 1.3vw;
  }

  @media only Screen and (max-width: 768px) {
    width: unset;

    h3 {
      font-size: 4vw;
    }
  }
`;

export const Arrow = styled.button`
  position: relative;
  background-color: transparent;
  cursor: pointer;
  animation: ${move} 2.5s ease infinite;
  transition: all 0.3s;

  @media only Screen and (max-width: 768px) {
    /* display: inline-block; */
  }

  &::before,
  &::after {
    content: "";
    background-color: #777777;
    width: 0.5rem;
    height: 2px;
    display: inline-block;
    position: relative;

    cursor: pointer;
    transition: all 0.3s;
  }
  &::before {
    top: ${(props) => (props.clicked ? "0" : "0")};
    transform: ${(props) =>
      !props.clicked ? "rotate(-228deg)" : "rotate(228deg)"};
    left: 0;
  }
  &::after {
    left: -3.5px;
    top: ${(props) => (props.clicked ? "0" : "0")};
    transform: ${(props) =>
      !props.clicked ? "rotate(-130deg)" : "rotate(130deg)"};
  }
`;

export const SectionWrapper = styled.div`
  border-bottom: 1px solid #e5e5e5;
  padding: 0.7em 0;
  position: relative;
  transition: all 1s ease;
`;
