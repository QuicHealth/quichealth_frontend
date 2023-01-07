import React from 'react'
import styled from 'styled-components';
import AboutUs from '../components/AboutUs';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

function AboutServices() {
    return (
        <Container>
            <NavBar />
            <AboutUs />
            <Footer />
        </Container>
    )
}

export default AboutServices;

const Container = styled.div``;
