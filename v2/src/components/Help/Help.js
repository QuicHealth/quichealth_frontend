import React, { useState } from "react";
import { Container, Layout, Title } from "../Notifications/NotificationLayout";
import search from "./../../assets/search.png";
import styled from "styled-components";

import {
  SectionWrapper,
  RightSection,
  Subsection,
  Subtitle,
  Icon,
  Arrow,
  Content,
} from "./../HomePage/FAQ";

function Help() {
  const [click, setClick] = useState(1);
  return (
    <Container>
      <div></div>
      <Layout>
        <Title>How can we help?</Title>

        <HelpContainer>
          <SearchBox>
            <SearchImg>
              <img src={search} alt="search" />
            </SearchImg>
            <Search type="text" placeholder="Search" />

            <Button>search</Button>
          </SearchBox>

          <FAQ>
            <RightSection className="help">
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
                    Telemedicine is the use of technology to provide medical
                    care remotely. With telemedicine, patients can connect with
                    healthcare providers using video conferencing, phone calls,
                    or messaging, allowing them to receive medical care from the
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
                    Telemedicine is the use of technology to provide medical
                    care remotely. With telemedicine, patients can connect with
                    healthcare providers using video conferencing, phone calls,
                    or messaging, allowing them to receive medical care from the
                    comfort of their own home.
                  </h3>
                </Content>
              </SectionWrapper>
              <SectionWrapper clicked={click === 3 ? true : false}>
                <Subsection>
                  <Subtitle className="grid">
                    What kind of medical conditions can be treated using
                    QuicHealth?
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
                    Telemedicine is the use of technology to provide medical
                    care remotely. With telemedicine, patients can connect with
                    healthcare providers using video conferencing, phone calls,
                    or messaging, allowing them to receive medical care from the
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
                    Telemedicine is the use of technology to provide medical
                    care remotely. With telemedicine, patients can connect with
                    healthcare providers using video conferencing, phone calls,
                    or messaging, allowing them to receive medical care from the
                    comfort of their own home.
                  </h3>
                </Content>
              </SectionWrapper>
            </RightSection>
          </FAQ>

          <Contact>
            <h2>Can’t find what you’re looking for?</h2>
            <p>Reach out with question or feedback any time!</p>

            <Button className="contact">Contact us</Button>
          </Contact>
        </HelpContainer>
      </Layout>
    </Container>
  );
}

export default Help;

const HelpContainer = styled.div`
  position: relative;
  display: grid;
  justify-content: center;
  align-items: center;

  max-width: 60em;
  margin: 4em auto;

  @media only Screen and (max-width: 768px) {
    margin: 4em 1em;
  }
`;
const SearchBox = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
`;

const Search = styled.input`
  padding: 0.7em 2em 0.7em 2.5em;
  border-radius: 8px;
  border: 1px solid #d5d5d5;
  width: 100%;
  font-size: 16px;
  background-color: white;

  &::placeholder {
    color: #777777;
    font-size: 14px;
  }

  @media only Screen and (max-width: 480px) {
    font-size: 11px;
    padding: 1em 2.5em;
  }
`;
const SearchImg = styled.div`
  position: absolute;
  top: 0.9em;
  left: 0.7em;

  img {
    width: unset;
  }

  @media only Screen and (max-width: 760px) {
    top: unset;

    img {
      width: 0.9em;
    }
  }
`;

const Button = styled.button`
  position: absolute;
  right: 0;
  margin-right: 0.5em;
  font-size: 15px;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  background-color: var(--lightGreen);
  color: white;

  display: flex;
  align-items: center;
  gap: 1em;
  transition: all 0.2s;

  &.contact {
    position: relative;
    background-color: transparent;
    color: var(--lightGreen);
    border: 1px solid var(--lightGreen);
    padding: 0.8rem 1.5rem;
  }

  @media only Screen and (max-width: 768px) {
    font-size: 13px;
  }
`;

const FAQ = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 3em 2em 1.5em 2em;
  margin: 1em 0px 2em 0em;
  display: grid;
  justify-content: center;
`;

const Contact = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 3em 2em 1.5em 2em;
  margin: 1em 0;
  display: grid;
  justify-items: center;
  h2 {
    color: var(--darkGreen);
    margin-bottom: 1em;
  }

  p {
    color: var(--grey);
    text-align: center;
    margin-bottom: 3em;
  }

  @media only Screen and (max-width: 768px) {
    padding: 3em 1em 1.5em 1em;
    h2 {
      font-size: 16px;
    }

    p {
      font-size: 12px;
    }
  }
`;
