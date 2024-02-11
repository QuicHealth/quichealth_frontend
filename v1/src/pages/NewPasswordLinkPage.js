import React from 'react'
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import NewPasswordLink from '../components/NewPasswordLink';

function NewPasswordLinkPage() {
    return (
      <Container>
          <NavBar />
          <NewPasswordLink/>
      </Container>
    )
}

export default NewPasswordLinkPage;

const Container = styled.div`
   // padding: 1px;
`;
