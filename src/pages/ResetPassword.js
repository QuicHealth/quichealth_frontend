import React from 'react'
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import ResetPasswordBody from '../components/ResetPasswordBody';

function Resetpassword() {
    return (
      <Container>
          <NavBar />
          <ResetPasswordBody />
      </Container>
    )
}

export default Resetpassword;

const Container = styled.div`
   // padding: 1px;
`;
