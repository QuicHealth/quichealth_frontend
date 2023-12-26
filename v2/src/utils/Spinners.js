import React from "react";
import styled from "styled-components";
import { css } from "@emotion/react";
import RingLoader from "react-spinners/RingLoader";

// const override = css`
//   display: block;
//   margin: 0 auto;
//   border-color: red;
// `;

const SpinContainer = styled.div`
  text-align: center;
  background-color: #ffffffd4;
  position: ${(props) => (props.position ? props.position : "absolute")};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  z-index: 999;
  top: 0;
`;

export const Spin = ({ position }) => {
  return (
    <SpinContainer position={position}>
      <RingLoader color={"#2FA5A9"} size={60} />
    </SpinContainer>
  );
};
