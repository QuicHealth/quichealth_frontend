import React from 'react'
import styled from 'styled-components';
import SideBar from './SideBar';

function Overview() {
    const isOpen=  localStorage.getItem('open')
    console.log(isOpen)
    
    return (
        <Container>
            <SideBar />
            <MainBody>
                <BodyHeading>Welcome, Tobi</BodyHeading>
                <BodySection>
                    <BodyHeading>What do you want to do today?</BodyHeading>
                    <BodyOption>
                        <Option className="left-option">Book a physical appointment</Option>
                        <Option>Consult an expert online</Option>
                    </BodyOption>
                </BodySection>
            </MainBody>

        </Container>
    )
}

export default Overview

const Container = styled.div`
    display: grid;
    grid-template-columns: 20% 80%;
    height: 80vh;

    @media (max-width: ${800}px) {
        grid-template-columns: 25% 74%;
    }

    @media (max-width: ${700}px) {
            grid-template-columns: 12% 88%;
        }
`;
const MainBody = styled.div`
    background-color: #fafafb;
    border-top-right-radius: 15px;
    margin-right:.7em;
`;

const BodyHeading =styled.h2`
    color: #070647;
    padding: 1em;
        @media (max-width: ${800}px) {
        font-size: 17px;
        }

        @media (max-width: ${700}px) {
        font-size: 15px;
        padding: 2em;
        }
`;

const BodySection = styled.div`
    width: 80%;
    margin: 1em auto 0 auto;
    text-align: center;

    @media (max-width: ${700}px) {
            width: 100%;
        }

`;
const BodyOption = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    padding: 0 2.5em;
    font-weight: 600;
    width: 40em;
    margin: 0 auto;
    margin-top: 3em;
    max-width: 45rem;

    @media (max-width: ${800}px) {
        //display: grid;
        width: 100%;
        //padding: 0;
    }

    @media (max-width: ${700}px) {
        display: block;
        width: 100%;
    }
`;
const Option = styled.div`
    padding: 1em .2em .7em .2em;
    border: 3px solid #070647;
    margin: 2em .5em;
    border-radius: 20px;
    width: 16em;
    box-shadow: 2px 3px #2e302f4a;

    @media (max-width: ${900}px) {
        width: 80%;
        font-size: 12px;
    }
    @media (max-width: ${700}px) {
        width: 18em;
        margin: 2em auto;
        font-size: 10px;
    }
    @media (max-width: ${400}px) {
        width: 100%;
        margin: 2em auto;
        font-size: 10px;
        
    }

    &:hover{
        cursor: pointer;
        opacity: .8;
    }

    &.left-option{
        background-color: #2fa5a9;
        color: white;
        border: 0px solid #070647;
    }
`;

