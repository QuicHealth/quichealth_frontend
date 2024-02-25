import React from "react";
import styled from "styled-components";
import ForgetPassword from "../components/ForgetPassword";

function ForgetPasswordPage() {
  return (
    <Container>
      <ForgetPassword />
    </Container>
  );
}

export default ForgetPasswordPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
