import React from 'react'
import styled from 'styled-components';
import DashboardNav from '../../components/DashboardNav';
import ExpertDashboard from '../../components/Expert/ExpertDashboard';

function ExpertDashboardOverview() {
    return (
        <Container>
            <DashboardNav />
            <ExpertDashboard /> 
        </Container>
    )
}

export default ExpertDashboardOverview

const Container = styled.div`
  
`;
