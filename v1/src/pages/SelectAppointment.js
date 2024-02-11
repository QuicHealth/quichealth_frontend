import React from 'react'
import styled from 'styled-components';
import DashboardNav from '../components/DashboardNav';
import SelectAppointments from '../components/SelectAppointment';

function SelectAppointment() {
    return (
        <Container>
            <DashboardNav />
            <SelectAppointments />
        </Container>
    )
}

export default SelectAppointment

const Container = styled.div`
  
`;
