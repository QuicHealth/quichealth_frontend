import React from 'react'
import styled from 'styled-components';
import DashboardNav from '../components/DashboardNav';
import Pricings from '../components/Pricings';

function Pricing() {
    return (
        <Container>
            <DashboardNav />
            <Pricings />
        </Container>
    )
}

export default Pricing

const Container = styled.div`
  
`;