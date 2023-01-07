import React from 'react'
import styled from 'styled-components';
import DashboardNav from '../../components/DashboardNav';
import ExpertZoomReturnPage from '../../components/Expert/ExpertZoomReturnPage';

function ExpertZoomReturn() {
  return (
    <Container>
        <DashboardNav expert={true} />
        <ExpertZoomReturnPage />

    </Container>
  )
}

export default ExpertZoomReturn

const Container = styled.div`
  
`;