import React from 'react'
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Appointments from '../components/Appointments';

function DashboardAppointments() {
    return (
        <Container>
            <NavBar />
            <Appointments/>
        </Container>
    )
}

export default DashboardAppointments

const Container = styled.div`
  
`;
