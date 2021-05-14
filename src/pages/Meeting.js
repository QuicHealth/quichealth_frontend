import React from 'react'
import styled from 'styled-components';
import DashboardNav from '../components/DashboardNav';
import Meetings from '../components/Meetings';

function Meeting() {
    return (
        <Container>
            <DashboardNav />
            <Meetings />
        </Container>
    )
}

export default Meeting

const Container = styled.div`
  
`;