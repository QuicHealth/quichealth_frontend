import React from 'react'
import styled from 'styled-components';
import DashboardNav from '../components/DashboardNav'
import Overview from '../components/Overview';

function DasboardOverview() {
    return (
        <Container>
            <DashboardNav />
            <Overview/>
        </Container>
    )
}

export default DasboardOverview

const Container = styled.div`
  
`;
