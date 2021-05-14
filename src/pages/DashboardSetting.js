import React from 'react'
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Settings from '../components/Setting';

function DashboardSettings() {
    return (
        <Container>
            <NavBar />
            <Settings/>
        </Container>
    )
}

export default DashboardSettings

const Container = styled.div`
  
`;
