import React from 'react'
import styled from 'styled-components';
import DashboardNav from '../components/DashboardNav';
import Booked from '../components/Booked';

function BookedPage() {
    return (
        <Container>
            <DashboardNav />
            <Booked /> 
        </Container>
    )
}

export default BookedPage

const Container = styled.div`
  
`;
