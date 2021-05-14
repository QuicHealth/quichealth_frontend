import React from 'react'
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import History from '../components/History';

function DashboardHistory() {
    return (
        <Container>
            <NavBar />
            <History/>
        </Container>
    )
}

export default DashboardHistory

const Container = styled.div`
  
`;
