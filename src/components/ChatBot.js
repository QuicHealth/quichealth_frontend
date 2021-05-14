import React from 'react'
import styled from 'styled-components';
import { AppointmentContainer} from './History'
import {Button, ViewMore} from './SelectAppointment'   

const Bot = ({message}) => {
    return(
        <div>
            <BotChat>{message}</BotChat>
        </div>
    )
}

const Patient = ({message}) => {
    return(
        <PatientBox>
            <div></div>
            <Customer>{message}</Customer>
        </PatientBox>
    )
}

function ChatBot() {
    return (
        <Container>
            <ChatImg></ChatImg>
            <ChatBox>
                <Bot message={"Hi! I am Beatrice, QuicHealth assistant chatbot"}/>
                <Bot message={"Kinndlt state what bring you to QuicHealth today?"}/>
                <Patient message={"Severe Headache"} />
                <Bot message={"Kinndlt state what bring you to QuicHealth today?"}/>
                <Patient message={"Severe Headache"} />
                <Bot message={"Kinndlt state what bring you to QuicHealth today?"}/>
                <Patient message={"Severe Headache"} />
                <Bot message={"Kinndlt state what bring you to QuicHealth today?"}/>
                <Patient message={"Severe Headache"} />
                <Bot message={"Kinndlt state what bring you to QuicHealth today?"}/>
                <Patient message={"Severe Headache"} />
                <ViewMore><Button>Book Appointment</Button></ViewMore>
            </ChatBox>
            
        </Container>
    )
}

export default ChatBot

const Container = styled.div`
    display: grid;
    grid-template-columns: 5% 93%;
    column-gap: 1em;
    padding: 2em;
    background-color: #f5f5f8;
    margin: 0 auto;
    margin-right: .5em;
    margin-left:.5em;
    //color:#070647;
    border-radius: 15px; 
`;

const ChatImg = styled.div``;
const ChatBox = styled.div`

`;
const BotChat= styled(AppointmentContainer)`
    display: grid;
    grid-template-columns: 1fr;
    width: fit-content;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    padding: .5em 4em;

`;

const PatientBox = styled.div`
    display: grid;
    grid-template-columns: 10% 90%;
    justify-items: flex-end;
`;
const Customer = styled(BotChat)`
    float: right;
    border-top-left-radius: 10px;
    border-top-right-radius: 0px;
    background-color: #2fa4a9;
    color: white;
`;

