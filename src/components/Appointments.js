import React from 'react'
import styled from 'styled-components';
import { connect } from "react-redux";
import SideBar from './SideBar';


function Appointments({openSidebar}) {
    return (
        <Container sidebar={openSidebar}>
            <SideBar />
            <MainBody>
                <AppointmentContainer>
                    <CheckBox className="active"></CheckBox>
                    <Image>
                        <img src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg" alt=""/>
                    </Image>
                    <Details>
                        <Name>Dr. Alice Walton</Name>
                        <ViewProfile>view profile</ViewProfile>
                    </Details>
                    <Date>07/10/2021</Date>
                    <Time>10:45AM</Time>
                    <Minutes>30 Minutes</Minutes>
                    <Meeting className="active">Join Meeting</Meeting>
                </AppointmentContainer>
                <AppointmentContainer>
                    <CheckBox></CheckBox>
                    <Image>
                        <img src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg" alt=""/>
                    </Image>
                    <Details>
                        <Name>Dr. Alice Walton</Name>
                        <ViewProfile>view profile</ViewProfile>
                    </Details>
                    <Date>07/10/2021</Date>
                    <Time>10:45AM</Time>
                    <Minutes>30 Minutes</Minutes>
                    <Meeting>-</Meeting>
                </AppointmentContainer>
                <AppointmentContainer>
                    <CheckBox></CheckBox>
                    <Image>
                        <img src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg" alt=""/>
                    </Image>
                    <Details>
                        <Name>Dr. Alice Walton</Name>
                        <ViewProfile>view profile</ViewProfile>
                    </Details>
                    <Date>07/10/2021</Date>
                    <Time>10:45AM</Time>
                    <Minutes>30 Minutes</Minutes>
                    <Meeting>-</Meeting>
                </AppointmentContainer>
            </MainBody>

        </Container>
    )
}

const mapStateProps = (state) => ({
    openSidebar: state.utils.openSidebar
})

export default Appointments = connect(mapStateProps)(Appointments);

export const Container = styled.div`
    display: grid;
    grid-template-columns: ${({sidebar}) => (sidebar? "20% 80%": "10% auto")};
    height: 100vh;

    @media (max-width: ${1080}px) {
        grid-template-columns: ${({sidebar}) => (sidebar? "25% auto": "10% auto")};
    }

    @media (max-width: ${700}px) {
            grid-template-columns: ${({sidebar}) => (sidebar? "12% 88%": "10% auto")};
        }
`;
export const MainBody = styled.div`
    background: linear-gradient(180deg, #e7e7ed, #ffffff);
    border-top-right-radius: 15px;
    padding: 3em 2em;
    margin-right:.7em;
    font-size: 1em;

    @media (max-width: ${800}px) {
    font-size: 17px;
    }

    @media (max-width: ${700}px) {
    font-size: 15px;
    padding: 2em ;
    }
    @media (max-width: ${500}px) {
    font-size: 9px;
    padding: 3em 1em;
    }
`;
export const AppointmentContainer = styled.div`
    display: grid;
    grid-template-columns: 5% 10% 20% 15% 15% 15% 20%;
    margin-top: 1em;
    padding: 1em;
    background-color: white;
    box-shadow: 2px 3px #2e302f4a;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    align-items: center;
    font-weight: 600;

    @media (max-width: ${800}px) {
        font-size: 17px;
    }

    @media (max-width: ${750}px) {
        font-size: 15px;
        padding: .5em;
    }
    @media (max-width: ${500}px) {
        font-size: 7px;
        padding: 2em;
        width: 100%;
    }
`;
export const CheckBox = styled.div`
    height: 0.8em;
    width: 0.8em;
    border-radius: 100%;
    background-color: #c1c1c9; 

    @media (max-width: ${750}px) {
        height: 0.7em;
        width: 0.7em;
    }
    @media (max-width: ${500}px) {
        height: 0.5em;
        width: 0.5em;
    }
    &.active{
        background-color: #3e67b0;
    }
`;
export const Image = styled.div`
    >img{
        width: 5em;
        height: 5em;
        border-radius: 100%;
        ///object-fit: contain;

        @media (max-width: ${750}px) {
            width: 4em;
        }
        @media (max-width: ${500}px) {
            width: 3em;
        }
    }
`;
export const Details = styled.div``;
export const Name = styled.h4`
    font-size:1.3em;
    @media (max-width: ${750}px) {
        font-size: 10px;
    }
    @media (max-width: ${500}px) {
        font-size: 7px
    }
`;
export const ViewProfile = styled.span`
    font-size: 13px;
    color: #048be8;
    font-weight: 500;

    @media (max-width: ${750}px) {
        font-size: 10px;
    }
    @media (max-width: ${500}px) {
        font-size: 7px
    }
    &:hover{
        opacity: 0.7;
        cursor: pointer;
    }
`;
const Date = styled.div`
    @media (max-width: ${750}px) {
    font-size: 10px;
    }
    @media (max-width: ${500}px) {
        font-size: 7px
    }
`;
const Time = styled.div`
    @media (max-width: ${750}px) {
    font-size: 10px;
    }
    @media (max-width: ${500}px) {
        font-size: 7px;
        text-align: center;
    }
`;
const Minutes =  styled.div`
     @media (max-width: ${750}px) {
    font-size: 10px;
    }
@media (max-width: ${500}px) {
    font-size: 7px;
    }
`;
export const Meeting  = styled.div`
    text-align: center;
    width: 8em;
    padding: .5em;

    @media (max-width: ${750}px) {
       font-size  : 10px;
    }
    @media (max-width: ${500}px) {
        font-size: 7px;
    }
    &.active{
        background-color: #2fa5a9;
        color: #fff;
        border-radius: 100px;
    }
        &:hover{
        opacity: 0.7;
        cursor: pointer;
    }
`;

