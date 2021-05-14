import React from 'react'
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import SigninBody from '../components/SigninBody';

function Signin() {
    return (
      <Container>
          <NavBar />
            <SigninBody/>
      </Container>
    )
}

export default Signin;

const Container = styled.div`
   // padding: 1px;
`;
