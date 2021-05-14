import React from 'react'
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Notification from '../components/Notification';

function DasboardNotification() {
    return (
        <Container>
            <NavBar />
            <Notification/>
        </Container>
    )
}

export default DasboardNotification

const Container = styled.div`
  
`;
