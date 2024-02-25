import React from "react";
import styled from "styled-components";
import ResetPassword from "../components/ResetPassword";

function ResetPasswordPage() {
  return (
    <Container>
      <ResetPassword />
    </Container>
  );
}

export default ResetPasswordPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
