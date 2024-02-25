import React from "react";
import styled from "styled-components";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { Spin } from "../utils/Spinners";
import back from "./../assets/backArrow.svg";
import logo from "./../assets/whitelogo.png";
import lg from "./../assets/logo.png";
import CustomInput from "../utils/CustomInput";
import { forgetPasswordSchema, signupSchema } from "../schemas/signinSchema";
import {
  Back,
  Button,
  Footer,
  InputContainer,
  Container,
  InputLabel,
  LBox,
  LeftSection,
  Logo,
  RightSection,
  Signin,
  Title,
  Topic,
} from "./Signup";
import { useForgetPassword } from "../queries/useLogin";

function ForgetPassword() {
  const navigate = useNavigate();
  const { isLoading, forgetPass } = useForgetPassword();

  const initialValues = {
    email: "",
  };

  const onSubmit = (values, actions) => {
    // console.log(values, "signup");

    forgetPass(values);
    actions.resetForm();
  };
  return (
    <Container>
      {isLoading && <Spin />}
      <LeftSection className="forgetPasswordBox">
        <Logo className="mobile">
          <img src={lg} alt="logo" />
        </Logo>
        <Link to="..">
          <Back src={back} alt="Back" onClick={() => navigate(-1)} />
        </Link>

        <Title>Forget Password</Title>
        <Formik
          initialValues={initialValues}
          validationSchema={forgetPasswordSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Forms className="forgetPassword">
              <InputContainer>
                <CustomInput
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="Email address"
                />
              </InputContainer>
              <Button
                disabled={isSubmitting}
                type="submit"
                className="forgetPassword"
              >
                Send Password
              </Button>
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

export default ForgetPassword;

let Forms = styled(Form)`
  /* width: 31vw; */
  margin-top: 3em;
  flex: 1;

  @media only Screen and (max-width: 768px) {
    font-size: 14px;
    margin-top: 0;
    flex: 1;
  }
`;
