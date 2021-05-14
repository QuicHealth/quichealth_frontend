import React from 'react'
import styled from 'styled-components';
import NavBar from '../components/NavBar';

import RegisterBody from '../components/RegisterBody';

function Register() {
    return (
      <Container>
          <NavBar />
            <RegisterBody />
      </Container>
    )
}

export default Register;

const Container = styled.div`
   // padding: 1px;
`;
