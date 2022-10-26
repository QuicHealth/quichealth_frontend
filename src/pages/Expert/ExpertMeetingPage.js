import React from 'react'
import styled from 'styled-components';
import DashboardNav from '../../components/DashboardNav';
import ExpertMeeting from '../../components/Expert/ExpertMeeting';

function Meeting() {
    return (
        <Container>
            <DashboardNav />
            <ExpertMeeting />
        </Container>
    )
}

export default Meeting

const Container = styled.div`
  
`;