import React, { useState } from "react";
import styled from "styled-components";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";

import signin from "./../assets/signin1.png";
import back from "./../assets/backArrow.svg";
import eye from "./../assets/eye.svg";
import logo from "./../assets/whitelogo.png";
import lg from "./../assets/logo.png";
import CustomInput from "../utils/CustomInput";
import { loginSchema } from "../schemas/signinSchema";
import { useLogin } from "../queries/useLogin";
import { Spin } from "../utils/Spinners";
import useGoogleSignin from "../hooks/useGoogleSignin";

function Signin({ expert }) {
  const navigate = useNavigate();
  const { login, isLoading } = useLogin(expert);
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading: googleReqLoading } = useGoogleSignin(expert, "signInDiv");

  console.log(expert, "anptther");

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values, actions) => {
    login(values);
    actions.resetForm();
  };

  return (
    <Container>
      {(isLoading || googleReqLoading) && <Spin />}
      <LeftSection>
        <Logo className="mobile">
          <img src={lg} alt="logo" />
        </Logo>
        <Link to="..">
          <Back src={back} alt="Back" onClick={() => navigate(-1)} />
        </Link>

        <Title>Hi, Welcome Back!</Title>
        <Instruction>Please enter your details</Instruction>
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Forms>
              <InputContainer>
                <CustomInput
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="Email address"
                />
              </InputContainer>

              <InputContainer>
                <CustomInput
                  label="Password"
                  Component={Eye}
                  componentImg={eye}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="8+ characters required"
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
              </InputContainer>

              <ForgetPassword>
                <NavLink to="/forget-password">Forget Password?</NavLink>
              </ForgetPassword>

              <Button disabled={isSubmitting} type="submit">
                Login
              </Button>

              {!expert && <Line>or</Line>}

              {!expert && <button id="signInDiv"></button>}
              {/* <GoogleSSO /> */}

              {!expert && (
                <Signup>
                  Don't have an account yet?{" "}
                  <NavLink to="/signup">
                    <b>Sign up</b>{" "}
                  </NavLink>
                </Signup>
              )}
            </Forms>
          )}
        </Formik>
      </LeftSection>
      <RightSection className="signin">
        <LBox>
          <Logo>
            <img src={logo} alt="logo" />
          </Logo>
          <Topic>Your health, your schedule with QuicHealth</Topic>

          <Footer>
            <p>2023 All Rights reserved</p>
            <p>Privacy Policy and Terms of Use</p>
          </Footer>
        </LBox>
      </RightSection>
    </Container>
  );
}

export default Signin;

export const Container = styled.div`
  //background: var(--background);
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 40% auto;
  overflow-y: hidden;

  @media only Screen and (max-width: 768px) {
    padding: 2em 1em;
    height: auto;
    display: block;
    overflow-y: auto;
  }
`;

export const LeftSection = styled.div`
  padding: 3rem 5rem 0em 5rem;
  overflow-y: auto;
  @media only Screen and (max-width: 768px) {
    padding: 1rem 0rem 0 0rem;
    width: 60vw;
    margin: auto;
    overflow-y: auto;
  }

  @media only Screen and (max-width: 450px) {
    overflow-y: auto;
    padding: 1rem 0rem 0 0rem;
    width: 100%;
  }
`;

export const Back = styled.img`
  display: block;
  cursor: pointer;
  width: unset;
  margin-bottom: 2em;
  transition: all 0.3s;
  &:hover {
    opacity: 0.5;
  }
  @media only Screen and (max-width: 768px) {
    display: none;
  }
`;

export const Title = styled.h3`
  color: var(--darkGreen);
  font-size: 2em;
  text-align: left;
  font-weight: 600;
  padding-bottom: 0.2rem;

  @media only Screen and (max-width: 480px) {
    font-size: 1.5em;
    padding-bottom: 0.2rem;
  }
`;

export let Forms = styled(Form)`
  /* width: 31vw; */
  margin-bottom: 2em;

  @media only Screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

export const InputContainer = styled.div`
  margin-bottom: 1em;
`;

export const InputLabel = styled.label`
  color: var(--grey);
  font-weight: 500;
`;

export const Input = styled(Field)`
  padding: 0.7em 1em;
  border-radius: 8px;
  border: 1px solid #d5d5d5;
  width: 100%;
  margin-top: 0.5em;
  font-size: 16px;

  &::placeholder {
    color: #d5d5d5;
    font-size: 14px;
  }

  @media only Screen and (max-width: 480px) {
    font-size: 12px;
    padding: 1em;
  }
`;

export const PasswordContainer = styled.div`
  position: relative;
`;

export const Eye = styled.img`
  position: absolute;
  top: 1.5em;
  right: 1em;
  width: unset;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    opacity: 0.5;
  }
`;

export const NameContainer = styled.div`
  display: grid;
  grid-template-columns: 45% 45%;
  column-gap: 2em;
  justify-content: space-between;
`;

export const Button = styled.button`
  width: 100%;
  padding: 1em;
  font-size: 1em;
  font-weight: 600;
  background: var(--lightGreen);
  color: var(--white);
  border-radius: 9px;
  transition: all 0.2s;
  margin-bottom: 1em;
  position: relative;
  cursor: pointer;

  &.google {
    background: transparent;
    border: 1px solid #e5e5e5;
    color: #595959;
    font-size: 0.9em;
    font-weight: 400;

    img {
      width: 1.3em;
      position: relative;
      top: 0.3em;
    }

    @media only Screen and (max-width: 480px) {
      font-size: 12px;
      img {
        // left: 3em;
      }
    }
  }

  &:hover {
    transform: scale(1.1);
  }
  &:focus {
    transform: scale(0.9);
  }
`;

export const Line = styled.div`
  position: relative;
  color: #595959;
  cursor: pointer;
  padding: 1em 0;
  display: flex;
  align-items: center;
  margin-left: 1em;

  ::before,
  &::after {
    content: "";
    background-color: #d5d5d5;
    width: 45%;
    height: 1px;
    display: inline-block;
    //position: absolute;
  }

  &::after {
    left: 1em;
    position: relative;
  }
  &::before {
    width: 45%;
    right: 1em;
    position: relative;
  }
`;

export const Signup = styled.p`
  text-align: center;
  font-weight: 300;
  margin-top: 2.4em;

  a {
    color: unset;
  }

  b {
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
  }

  @media only Screen and (max-width: 480px) {
    font-size: 12px;
  }
`;

export const RightSection = styled.div`
  display: block;
  @media only Screen and (max-width: 768px) {
    display: none;
  }
  height: 100vh;
  background-image: url(${signin});
  background-repeat: no-repeat;
  background-origin: content-box;
  background-size: cover;
  color: var(--white);
`;

export const LBox = styled.div`
  padding: 3em 5em 2em 2em;
`;

export const Logo = styled.div`
  img {
    width: unset;
  }

  &.mobile {
    display: none;
    @media only Screen and (max-width: 768px) {
      display: block;

      margin-bottom: 3rem;
      img {
        width: 9em;
      }
    }
  }
`;
export const Topic = styled.h1`
  margin-top: 65%;
  font-size: 2.5em;
  width: 13em;
`;
export const Footer = styled.div`
  display: flex;
  margin-top: 10vh;
  justify-content: space-between;
  width: 80%;
  font-size: 13px;
`;

const ForgetPassword = styled.p`
  text-align: right;
  margin: 2em 0;
  font-weight: normal;

  a {
    color: var(--grey);
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
  }
`;
const Instruction = styled.p`
  margin-bottom: 3em;

  font-weight: 300;
`;
