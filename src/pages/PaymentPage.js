import React from 'react'
import styled from 'styled-components';
import Payment from '../components/Payment';
import DashboardNav from '../components/DashboardNav';

function PaymentPage() {
    return (
        <Container>
            <DashboardNav />
            <Payment /> 
        </Container>
    )
}

export default PaymentPage

const Container = styled.div`
  
`;
