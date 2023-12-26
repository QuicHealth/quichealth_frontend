import React from "react";
import styled from "styled-components";
import Signin from "../components/Signin";

function SigninPage({ expert }) {
  return (
    <Container>
      <Signin expert={expert} />
    </Container>
  );
}

export default SigninPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
