import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { SaveChanges } from "./HealthProfile";
import { Bot, Patient } from "./ChatBot";

//Landing Section
export const GetStarted = ({ firsth1, secondh1, body, buttonName }) => {
  return (
      <LeftSection>
        <h1>{firsth1}{secondh1}</h1>

        <SectionText>{body}</SectionText>

        <div>
          <SaveChanges>
            <ButtonLink to="/register">{buttonName}</ButtonLink>
          </SaveChanges>
        </div>
      </LeftSection>
  );
};

function LandingSection() {
  const [show, setNotShow] = useState(false);

  //CHatBot Section
  const BotComponent = () => {
    return (
      <BotContainer>
        <ChatContainer>
          <ChatImg onClick={() => setNotShow(false)}>
            <img src="./images/chatbot.png" alt="" />
          </ChatImg>
          <ChatBox>
            <Bot
              message={
                "Hi! I am Beatrice, QuicHealth assistant chatbot what would you like to do today ?"
              }
            />
            <Patient
              message={`Hi  Beatrice, I need to urgently see a doctor`}
            />
          </ChatBox>
        </ChatContainer>
        <SubmitSection>
          <Input type="text" placeholder="Type here" />
          <button hidden type="submit">
            send message
          </button>
          <div>
            <img src="./images/Vector.png" alt="" />
          </div>
        </SubmitSection>
      </BotContainer>
    );
  };

  //real component
  return (
    <Container>
      <Waves>
        {" "}
        <img src="./images/wavesz.png" alt="" />
      </Waves>
      <SectionOne>
        <GetStarted
          firsth1={"Welcome to QuicHealth, "}
          secondh1={'"your pocket doctor"'}
          body={
            "See a doctor without leaving your home. We provide easy and fast access to the best medical experts in NIGERIA."
          }
          buttonName={"Get Started"}
        />
        <RightSection>
          <img src="./images/blob1.svg" alt="" />
        </RightSection>
      </SectionOne>
      {
        <ChatBot onClick={() => setNotShow(true)}>
          {!show ? <img src="./images/chatbot.png" alt="" /> : ""}
        </ChatBot>
      }
      {show ? <BotComponent /> : ""}
    </Container>
  );
}

export default LandingSection;

//styled component
const MoveLeft = keyframes`
    0%{
        transform:translateX(120px);
        opacity:0;
    }
    100%{
        transform:translateX(0);
        opacity:1;
    }
`;


const MoveRight = keyframes`
    0%{
        transform:translateX(-120px);
        opacity:0;
    }
    100% {
        transform:translateX(0);
        opacity:1
    }
`;

export const AnimateBtn = keyframes`
0%{
    opacity:0;
}
100%{
    opacity:1;
}
`;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  margin-bottom: 14em;
`;
const ChatBot = styled.div`
  position: absolute;
  right: 2em;
  padding-top: 3em;
  > img {
    width: 70%;
  }
`;

const SectionOne = styled.div`
  position: relative;
  display: grid;
  width: 100%;
  grid-template-columns: 50% 50%;
  color: #070647;
  overflow-x: hidden;
  position: relative;
  @media (max-width: ${750}px) {
       //grid  : 100%;
    }
    @media (max-width: ${500}px) {
        grid-template-columns: 100%;
    }
`;
const RightSection = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  margin: 0 auto;
  padding: 0em 6em 0em 0em;
  align-items: center;
  @media (max-width: ${500}px) {
       padding: 0;
      
    }
  > img {
    //width: 100%;
    @media (max-width: ${500}px) {
       height: 50vh;
       margin: 0 auto;
       width:27em;
      
    }
    animation: ${MoveLeft} 2s ease-in;
  }
`;

const SectionText = styled.p`
  margin-top: 1em;
  font-size: 1.5em;
  color: #9B9B9B;
  animation: ${MoveRight} 2s ease-in;

  @media (max-width: ${500}px) {
      font-size: 1em;
    }
`;
export let LeftSection = styled.div`
  width: 100%;
  padding: 10em 0em 6em 6em;
  margin: 0 auto;
  //padding-top: 6em;
  position: relative;
  @media (max-width: ${500}px) {
      padding: 6em 1em 0;
    }
  > h1 {
    animation: ${MoveRight} 2s ease-in;
    font-size: 3.1em;
    width: 14em;
    @media (max-width: ${500}px) {
      font-size: 2em;
      width: 10em;
    }
  }
  >div>div{
    width:17em;
    margin-top: 4em;
    font-weight: 600;
    border-radius: 19px;
    padding: 0.5em 0px;
    @media (max-width: ${500}px) {
      width: 11em;
      border-radius:10px;
      margin-top:1em;
    }
  }
`;

const ButtonLink = styled(Link)`
  color: #ffffffd4;
  text-decoration: none;
  font-size: 2em;
  @media (max-width: ${500}px) {
      font-size: 1em;
      width:11em;
    }
`;

export const Waves = styled.div`
  position: absolute;
  width: 100%;
  transition: width ease-in;
  height: 100vh;

  > img {
    width: 100%;
    @media (max-width: ${500}px) {
       height: 40vh;
    }
  }
`;

const BotContainer = styled.div`
  position: absolute;
  bottom: 10em;
  right: 5em;
  width: 25em;
  height: 33em;
  background: #ffffff;
  box-shadow: 0px 4px 19px rgb(0 0 0 / 25%);
  border-radius: 22px;
  padding: 1em 0;
`;
const ChatContainer = styled.div`
  display: grid;
  grid-template-columns: 23% auto;
  position: relative;
  padding: 1em;
`;
const ChatImg = styled.div`
  > img {
    width: 5em;
  }
`;
const ChatBox = styled.div`
  > div > div {
    background: #f3f7fc;
    box-shadow: 0px 2px 5px rgb(0 0 0 / 25%);
    border-radius: 22px;
    color: #070647;
    font-size: 12px;
    text-align: left;
    padding: 1em 2em;
  }
  > span > div:nth-child(2) {
    background: #2fa5a9;
    box-shadow: 0px 2px 5px rgb(0 0 0 / 25%);
    border-radius: 22px;
    font-size: 12px;
    text-align: right;
    padding: 1em 2em;
  }
`;
const SubmitSection = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  position: absolute;
  width: 100%;
  bottom: 0;
  background-color: white;
  z-index: 100;
  @media (max-width: ${500}px) {
      font-size: 1em;
      width:11em;
    }
    @media (max-width: ${500}px) {
      font-size: 1em;
      width:100%;
    }
  > div {
    width: 43px;
    height: 41px;
    background-color: #2fa5a9;
    border-radius: 50%;
    position: absolute;
    right: 2em;
    img {
      width: 1.4em;
      position: absolute;
      text-align: center;
      top: 0.7em;
      left: 0.5em;
    }
  }
`;

const Input = styled.input`
  flex: 1;
  outline: none;
  border: 1px solid #f3ebeb;
  padding: 20px;
  ::placeholder{
    color: #a4a4a4;
  }
`;
