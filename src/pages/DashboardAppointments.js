import React from 'react'
import styled from 'styled-components';
import DashboardNav from '../components/DashboardNav';
import Appointments from '../components/Appointments';

function DashboardAppointments() {
    return (
        <Container>
             <DashboardNav />
            <Appointments/>
        </Container>
    )
}

export default DashboardAppointments

const Container = styled.div`
  
`;
