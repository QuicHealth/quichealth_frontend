import React from 'react'
import styled from 'styled-components';
import DashboardNav from '../components/DashboardNav';
import Settings from '../components/Setting';

function DashboardSettings() {
    return (
        <Container>
            <DashboardNav />
            <Settings/>
        </Container>
    )
}

export default DashboardSettings

const Container = styled.div`
  
`;
