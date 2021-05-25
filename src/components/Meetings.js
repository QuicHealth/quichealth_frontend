import React from 'react'
import styled from 'styled-components';
import MenuIcon from '@material-ui/icons/Menu';
import {Containa, IconBox} from "./SelectAppointment";
import { ViewProfile, Name, Details, MainBody,Image } from './Appointments';
import { AppointmentContainer} from './History'

function Meetings() {
    return (
        <Containa>
                <MainBodyBox>
                    <HistoryContainer>
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
                    </HistoryContainer>
                    <HistoryTypeContainer>
                        <HistoryType>
                            <HTypeName className="select">Diagnostics</HTypeName>
                            <HTypeName>Laboratory</HTypeName>
                            <HTypeName>Pharmacy</HTypeName>
                            <HTypeName>Notes</HTypeName>
                        </HistoryType>
                    </HistoryTypeContainer>
                </MainBodyBox>
        </Containa>
    )
}

export default Meetings

const MainBodyBox = styled(MainBody)`
    background-color: #f5f5f8;
`;

const HistoryContainer = styled(AppointmentContainer)`
        border: none;
        box-shadow: none;
        background-color: #f5f5f8;
`;

const HistoryType = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    //padding: 0em 4em;
    text-align:center;
    border: 1px solid;
    border-bottom: 0;
    background-color: white;
    box-shadow: 2px 3px #2e302f4a;
`;
const HTypeName= styled.h3`
    padding: 1.5em 0;
    border-left: 1px solid;

    &.select{
        background-color: #3769d7;
        color: white;
        border-left: 0;
    }
`

const HistoryTypeContainer = styled.div`
    height: 80vh;
    background-color: white;
    box-shadow: 2px 3px #2e302f4a;
`;
const Date = styled.div``;
const Time = styled.div``;
const Minutes =  styled.div``;
