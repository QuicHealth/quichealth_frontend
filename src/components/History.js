import React from 'react'
import styled from 'styled-components';
import SideBar from './SideBar';
import { connect } from "react-redux";
import {Container, ViewProfile, Name, Details, MainBody,Image } from './Appointments';
import { AppointmentContainers} from './Notification'

function History({ openSidebar}) {
    return (
        <Container sidebar={openSidebar}>
            <SideBar />
            <MainBody>
                <AppointmentContainer>
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
                </AppointmentContainer>
                <AppointmentContainer>
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
                </AppointmentContainer>
                <AppointmentContainer>
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
                </AppointmentContainer>
            </MainBody>

        </Container>
    )
}

const mapStateProps = (state) => ({
    openSidebar: state.utils.openSidebar,
  });

export default History = connect(mapStateProps)(History);

export const AppointmentContainer = styled(AppointmentContainers)`
    display: grid;
    grid-template-columns: 10% 30% 20% 20% 20%;
    margin-top: 1em;
    padding: 1em 4em;
    background-color: white;
    box-shadow: 2px 3px #2e302f4a;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    align-items: center;
    font-weight: 600;
`;


const Date = styled.div``;
const Time = styled.div``;
const Minutes =  styled.div``;

