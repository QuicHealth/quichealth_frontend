import React from 'react'
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Help from '../components/Help';

function DashboardHelp() {
    return (
        <Container>
            <NavBar />
            <Help/>
        </Container>
    )
}

export default DashboardHelp

const Container = styled.div`
  
`;
