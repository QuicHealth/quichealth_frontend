import React from 'react'
import styled from 'styled-components';
import DashboardNav from '../components/DashboardNav';
import Notification from '../components/Notification';

function DasboardNotification() {
    return (
        <Container>
            <DashboardNav />
            <Notification/>
        </Container>
    )
}

export default DasboardNotification

const Container = styled.div`
  
`;
