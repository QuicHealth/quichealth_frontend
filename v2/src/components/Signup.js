import React, { useState } from "react";
import styled from "styled-components";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { Spin } from "../utils/Spinners";
import google from "./../assets/google.svg";
import back from "./../assets/backArrow.svg";
import signup from "./../assets/signup.png";
import eye from "./../assets/eye.svg";
import logo from "./../assets/whitelogo.png";
import lg from "./../assets/logo.png";
import CustomInput from "../utils/CustomInput";
import { signupSchema } from "../schemas/signinSchema";
import { useSignup } from "../queries/useLogin";
import useGoogleSignin from "../hooks/useGoogleSignin";

function Signup({ expert }) {
  const { register, isLoading } = useSignup();
  const { isLoading: googleReqLoading } = useGoogleSignin(expert, "signupDiv");
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };

  const onSubmit = (values, actions) => {
    // console.log(values, "signup");
    register(values);
    actions.resetForm();
  };

  return (
    <Container>
      {(isLoading || googleReqLoading) && <Spin />}
      <LeftSection>
        <Logo className="mobile">
          <img src={lg} alt="logo" />
        </Logo>
        <Link to="/">
          <Back src={back} alt="Back" />
        </Link>

        <Title>Create Account</Title>
        <Formik
          initialValues={initialValues}
          validationSchema={signupSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Forms>
              <InputContainer>
                <InputLabel htmlFor="fullname">Full Name</InputLabel>
                <NameContainer>
                  <CustomInput
                    specific={true}
                    name="firstname"
                    type="text"
                    placeholder="First Name"
                  />
                  <CustomInput
                    specific={true}
                    name="lastname"
                    type="text"
                    placeholder="Last Name"
                  />
                </NameContainer>
              </InputContainer>

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

              <InputContainer>
                <CustomInput
                  label="Confirm Password"
                  Component={Eye}
                  componentImg={eye}
                  name="password_confirmation"
                  type={showPassword ? "text" : "password"}
                  placeholder="8+ characters required"
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
              </InputContainer>
              <Terms>
                {" "}
                By continuing you agree to our Terms & Conditions and Privacy
                Policy
              </Terms>

              <Button disabled={isSubmitting} type="submit">
                Create account
              </Button>

              <Line>or</Line>

              {!expert && <Google id="signupDiv"></Google>}
              {/* <GoogleSSO /> */}

              {/* <Button className="google">
                <img src={google} alt="google" />
                <span> Sign up with Google</span>
              </Button> */}

              <Signin></Signin>
            </Forms>
          )}
        </Formik>

        <Signin>
          Already have an account?{" "}
          <NavLink to="/signin">
            <b>Sign in</b>
          </NavLink>
        </Signin>
      </LeftSection>
      <RightSection>
        <LBox>
          <Logo>
            <img src={logo} alt="logo" />
          </Logo>
          <Topic>Access quality care from the comfort of your own home</Topic>

          <Footer>
            <p>2023 All Rights reserved</p>
            <p>Privacy Policy and Terms of Use</p>
          </Footer>
        </LBox>
      </RightSection>
    </Container>
  );
}

export default Signup;

export const Container = styled.div`
  //background: var(--background);
  width: 100vw;
  //height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-columns: 40% auto;

  @media only Screen and (max-width: 768px) {
    padding: 2em 1em;
    height: auto;
    display: block;
  }
`;

export const LeftSection = styled.div`
  padding: 3rem 5rem 0em 5rem;
  @media only Screen and (max-width: 768px) {
    padding: 1rem 0rem 0 0rem;
    width: 60vw;
    margin: auto;
  }

  @media only Screen and (max-width: 450px) {
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
  padding-bottom: 3rem;

  @media only Screen and (max-width: 480px) {
    font-size: 1.5em;
    padding-bottom: 2rem;
  }
`;

let Forms = styled(Form)`
  /* width: 31vw; */

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

export const Input = styled.input`
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

const Terms = styled.h5`
  margin: 1em 0 3em 0;
  font-weight: 300;
  font-size: 0.9em;

  @media only Screen and (max-width: 350px) {
    font-size: 12px;
  }
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

export const Signin = styled.p`
  text-align: center;
  font-weight: 300;
  margin: 2.4em 0;

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
  //height: 100vh;
  background-image: url(${signup});
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

export const Google = styled.div`
  /* width: 100rem; */
  position: relative;
`;

export const Topic = styled.h1`
  margin-top: 10em;
  font-size: 2.5em;
`;
export const Footer = styled.div`
  display: flex;
  margin-top: 12em;
  justify-content: space-between;
  width: 95%;
  font-size: 13px;
`;
