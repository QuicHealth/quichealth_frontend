import React from 'react'
import styled from 'styled-components';
import ChatBot from '../components/ChatBot';
import DashboardNav from '../components/DashboardNav';

function ChatBotPage() {
    return (
        <Container>
            <DashboardNav />
            <ChatBot /> 
        </Container>
    )
}

export default ChatBotPage

const Container = styled.div`
  
`;
