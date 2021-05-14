import React from 'react'
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Overview from '../components/Overview';

function DasboardOverview() {
    return (
        <Container>
            <NavBar />
            <Overview/>
        </Container>
    )
}

export default DasboardOverview

const Container = styled.div`
  
`;
