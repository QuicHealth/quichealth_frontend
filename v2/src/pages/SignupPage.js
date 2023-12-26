import React from "react";
import styled from "styled-components";
import Signup from "../components/Signup";

function SignUp() {
  return (
    <Container>
      <Signup />
    </Container>
  );
}

export default SignUp;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
