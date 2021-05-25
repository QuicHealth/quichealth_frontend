import React from "react";
import styled from "styled-components";
import { Waves } from "./LandingSection";

function Footer() {
  return (
    <Contain>
      <Waves
        style={{ position: "relative", marginBottom: "-3em", height: "20vh" }}
      >
        <img src="./images/paves.png" alt="" />
      </Waves>
      <Container>
        <LeftBox>
          <p>QuicHealth@gmail.com</p>
        </LeftBox>
        <RightBox>
          <Section>
            <h3>Useful link</h3>
            <p>Home</p>
            <p>About Us</p>
            <p>Our Services</p>
            <p>How It Works</p>
            <p>Contact </p>
          </Section>
          <Section style={{ marginRight: "10em", width: "100%" }}>
            <h3 className="center">Need help?</h3>
            <p className="center">FAQs</p>
            <p className="center">Privacy Policy</p>
            <p className="center">Policy</p>
            <p className="center">Support</p>
            <p className="center">Terms & Conditions</p>
          </Section>
          <Section>
            <h3 className="center">Follow Us</h3>
            <p className="center">
              <i class="fab fa-facebook-square"></i>
            </p>
            <p className="center">
              <i class="fab fa-instagram"></i>
            </p>
            <p className="center">
              <i class="fab fa-twitter"></i>
            </p>
            <p className="center">
              <i class="fab fa-linkedin"></i>
            </p>
          </Section>
        </RightBox>
      </Container>
      <CopyRight>&#169; 2021 QuicHealths.All rights reserved</CopyRight>
    </Contain>
  );
}

export default Footer;

const Contain = styled.div`
  margin-top: 11em;
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
  width: 100%;
  letter-spacing: -0.5px;
  padding: 0 5em 3em 5em;
  margin: 0em auto 0 auto;
  background-color: #413c98;
  position: relative;
  column-gap: 5em;
`;
const LeftBox = styled.div`
  display: grid;
  color: #e7e7f2;
  align-content: center;
  justify-content: center;
  text-align: center;
  > img {
    height: 8em;
    width: 9em;
  }
  > p {
    font-size: 1.2em;
    font-weight: 600;
  }
`;
const RightBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 1em;
  width: 100%;
  color: #e7e7f2;
  font-size: 1.2em;
`;

const Section = styled.div`
  > h3 {
    &.center {
      // width:100%;
      text-align: center;
    }
    &.end {
      // width:100%;
      text-align: end;
    }
  }

  > p {
    padding: 0.5em 0;
    font-weight: 400;
    color: #e7e7f2eb;
    transition: all 0.5s;
    font-size: 1em;
    //line-height: 19.74px;

    &.center {
      width: 100%;
      text-align: center;
    }
    &.end {
      // width:100%;
      text-align: end;
    }
    > i {
      font-size: 1.5em;
      padding-top: 0.3em;
    }
    &:hover {
      cursor: pointer;
      opacity: 0.6;
    }
  }
`;

const CopyRight = styled.span`
  position: relative;
  width: 100%;
  text-align: center;
  display: grid;
  color: #e7e7f2eb;
  font-size: 1.2em;
  font-weight: 700;
  background-color: #413c98;
  padding-bottom: 1.2em;
`;
