import React from "react";
import { SubTitle, Title } from "./WhyUs";
import { Button } from "../Header";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function GetStarted() {
  return (
    <Green>
      <Title className="faq">Don't wait to get the care you need.</Title>
      <Title className="faq">
        Experience hassle-free healthcare from home{" "}
      </Title>
      <MobileTitle className="faq">
        Don't wait to get the care you need. Experience hassle-free healthcare
        from home{" "}
      </MobileTitle>
      <SubTitle className="faq">
        Sign up today and experience the convenience and ease of our
        telemedicine platform.
      </SubTitle>

      <NavLink to="/signup">
        <Button className="faq">Get Started Now</Button>
      </NavLink>
    </Green>
  );
}

export default GetStarted;

const Green = styled.div`
  padding: 5em;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--lightGreen);
  @media only Screen and (max-width: 768px) {
    padding: 2em;
    text-align: center;
  }
`;

const MobileTitle = styled(Title)`
  display: none !important;
  @media only Screen and (max-width: 768px) {
    display: block !important;
    font-size: 7vw;
  }
`;
