import React from 'react'
import {Link } from 'react-router-dom';
import styled, {keyframes} from 'styled-components';
import { SaveChanges } from './HealthProfile';

export const GetStarted = ({firsth1, secondh1, body, buttonName}) => {
    return(
        <>
            <LeftSection>
                <h1>{firsth1}</h1>
                <h1>{secondh1}</h1>

                <SectionText>{body}</SectionText>

                <div> 
                    <SaveChanges style={{marginTop: "2em", fontWeight: "600", padding: ".5em 0"}}><ButtonLink to="/register">{buttonName}</ButtonLink></SaveChanges>
                    
                </div>
            </LeftSection>
        </>
    )
}

function LandingSection() {
    return (
        <Container>
            <Waves> <img src="./images/wave1a.png" alt="" /></Waves>
            <SectionOne>
                <GetStarted 
                    firsth1={"Welcome to QuicHealth,"} 
                    secondh1={'"your pocket doctor"'} 
                    body={"See a doctor without leaving your home. We Provide easy and fast access to the bestmedical experts in NIGERIA"} 
                    buttonName={"Get Started"}
                />
                <RightSection>
                    <img src="./images/blob1.svg" alt="" />
                </RightSection>
            </SectionOne>
            <ChatBot>
                <img src="./images/chatbot.png" alt="" />
            </ChatBot>

         </Container>
    )
}

export default LandingSection;


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
    100%{
        transform:translateX(0);
        opacity:1;
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
    height: 70vh;
    width:100%;
    margin-bottom: 14em;
`;
const ChatBot = styled.div`
    position: absolute;
    right: 1em;
    padding-top: 3em;
    >img{
        width: 60%;
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
`;
const RightSection = styled.div`
    width: 80%;
    display: flex;
    align-items: flex-end;
    margin: 0 auto;
    padding-top: 4em;
    >img{
        width: 100%;
        animation: ${MoveLeft} 2s ease-in;
    }
`;

const SectionText = styled.p`
    padding-top: 1em;
    font-weight: 700;
    font-size: 1.1em;
    color: #b8b8bd;
    animation: ${MoveRight} 2s ease-in;
`;
export let LeftSection = styled.div`
    width: 25em;
    margin: 0 auto;
    padding-top: 6em;
    position: relative;
    >h1{
        animation: ${MoveRight} 2s ease-in;
    }
`;

const ButtonLink = styled(Link)`
     color: #ffffffd4;
    text-decoration: none;
`;

export const Waves= styled.div`
    position: absolute;
    width: 100%;
    transition: width ease-in;

    >img{
        width: 100%; 
    }
`;

