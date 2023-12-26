import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button as Btn } from "../Header";
import doct from "./../../assets/heros.png";

function Hero() {
  return (
    <HeroSection>
      <LeftSection>
        <HeroContent>
          Get Instant Health Care Anytime, Anywhere with QuicHealth.
        </HeroContent>
        <SubContent>
          Our platform offers a convenient and easy-to-use solution for those
          seeking healthcare services remotely.
        </SubContent>

        <NavLink to="/signup">
          <Button className="getStarted">Get Started</Button>
        </NavLink>
      </LeftSection>

      <RightSection>
        <Circ>
          <span />
        </Circ>
        <Doct>
          <img src={doct} alt="cots" />
        </Doct>
      </RightSection>
    </HeroSection>
  );
}

export default Hero;

const HeroSection = styled.div`
  background: var(--background)
  width: 100vw;
  height: 55vw;
  display: grid;
  grid-template-columns: 50% 50%;
  position: relative;
  padding: 3rem 5rem;
  margin-bottom: 3rem;
  z-index: 5;
  

  @media only Screen and (max-width: 768px) {
    height: 70vw;
    display: block;
    padding: 1rem 1rem;
    height: 80vh;
  }
  @media only Screen and (max-width: 420px) {
    height: 70vh;
    padding: 1rem 1rem;
    padding-bottom: 2rem;
  }
`;

const LeftSection = styled.div`
  width: calc(40% + 9vw);
  margin-top: 7vw;

  width: 100%;
  /* margin: 1rem auto; */

  @media only Screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const RightSection = styled.div`
  //width: calc(40% + 9vw);
  position: relative;

  @media only Screen and (max-width: 768px) {
    margin-top: 2rem;
  }
`;

const HeroContent = styled.h1`
  font-size: 3.89vw;
  //width: 28rem;
  line-height: 5vw;
  color: var(--darkGreen);

  @media only Screen and (max-width: 750px) {
    text-align: center;
    font-size: 1.7em;
    line-height: unset;
  }
`;
const SubContent = styled.h6`
  font-size: 1.5vw;
  font-weight: 300;
  line-height: 27px;
  color: var(--grey);
  padding: 2rem 0;

  @media only Screen and (max-width: 768px) {
    text-align: center;
    line-height: 1.5em;
    padding: 1rem 0;
    width: 27em;
    font-size: 0.8em;
  }

  @media only Screen and (max-width: 480px) {
    width: 21em;
  }
`;
const Button = styled(Btn)`
  //margin-top: 2rem;
  font-size: 25px;

  @media only Screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

const Doct = styled.div`
  position: absolute;
  z-index: 6;
  right: 0;
  img {
    width: calc(60% + 20vw);
    position: relative;
    right: -3rem;
  }
  @media only Screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
    img {
      right: unset;
    }
  }
`;

const Circ = styled.div`
  position: absolute;

  z-index: 5;
  width: 7rem;
  height: 7rem;
  background: #eaf6f6;
  border-radius: 50%;
  right: 0em;
  top: 2em;
  @media only Screen and (max-width: 768px) {
    width: 4rem;
    height: 4rem;

    right: 18vw;
    top: 5vw;
  }

  @media only Screen and (max-width: 480px) {
    right: 20vw;
    top: 6vw;
  }

  @media only Screen and (max-width: 350px) {
    right: 12vw;
    top: 3vw;
  }
`;
