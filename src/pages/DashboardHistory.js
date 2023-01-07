import React from 'react'
import styled from 'styled-components';
import History from '../components/History';
import DashboardNav from '../components/DashboardNav';

function DashboardHistory() {
    return (
        <Container>
            <DashboardNav />
            <History/>
        </Container>
    )
}

export default DashboardHistory

const Container = styled.div`
  
`;
