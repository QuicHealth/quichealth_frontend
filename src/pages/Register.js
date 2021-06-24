import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { css } from "@emotion/react";
import RingLoader from "react-spinners/RingLoader";

import NavBar from "../components/NavBar";
import RegisterBody from "../components/RegisterBody";


const override = css`
display: block;
margin: 0 auto;
border-color: red;
`;
export const Spin = () => {
  return (
    <SpinContainer>
      <RingLoader css={override} color={"#2FA5A9"} size={60} />
    </SpinContainer>
  );
};

function Register({ isLoading }) {
  return (
    <Container>
        
        <NavBar />
        <RegisterBody /> 
    </Container>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.signup.isLoading,
});

export default connect(mapStateToProps, null)(Register);

const Container = styled.div`
  // padding: 1px;
`;

const SpinContainer = styled.div`
  text-align: center;
  background-color: #ffffffd4;
  position: absolute;
  //opacity: .8;
  //background: linear-gradient(to right,#3204fdba, #9907facc), url('https://picsum.photos/1280/853/?random=1') no-repeat top center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  z-index: 999;
`;
