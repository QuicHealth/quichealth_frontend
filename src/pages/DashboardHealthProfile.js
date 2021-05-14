import React from 'react'
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import HealthProfile from '../components/HealthProfile';

function DashboardHealthProfile() {
    return (
        <Container>
            <NavBar />
            <HealthProfile/>
        </Container>
    )
}

export default DashboardHealthProfile

const Container = styled.div`
  
`;
