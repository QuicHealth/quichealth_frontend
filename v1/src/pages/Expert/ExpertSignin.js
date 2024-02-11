import React from "react";
import styled from 'styled-components';
import NavBar from "../../components/NavBar";
import SigninBody from "../../components/SignIn/SigninBody";

function ExpertSignin() {
    return (
        <Container>
            <NavBar />
            <SigninBody expert={true} />
        </Container>
    )
}

export default ExpertSignin;

const Container = styled.div``;