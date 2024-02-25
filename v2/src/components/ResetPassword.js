import React, { useState } from "react";
import styled from "styled-components";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { Spin } from "../utils/Spinners";
import back from "./../assets/backArrow.svg";
import logo from "./../assets/whitelogo.png";
import lg from "./../assets/logo.png";
import CustomInput from "../utils/CustomInput";
import { resetPasswordSchema } from "../schemas/signinSchema";
import eye from "./../assets/eye.svg";
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
  Eye,
} from "./Signup";
import { useResetPassword } from "../queries/useLogin";

function ResetPassword() {
  const { isLoading, resetPass } = useResetPassword();
  const params = useLocation();
  const userEmail = decodeURIComponent(
    params.search.split("=")[params.search.split("=").length - 1]
  );
  const token = decodeURIComponent(
    params.search.split("=")[params.search.split("=").length - 2].slice(0, -6)
  );

  const initialValues = {
    email: userEmail ?? "",
    password: "",
    password_confirmation: "",
  };

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (values, actions) => {
    resetPass({ ...values, token });
    actions.resetForm();
  };
  return (
    <Container>
      {isLoading && <Spin />}
      <LeftSection className="forgetPasswordBox">
        <Logo className="mobile">
          <img src={lg} alt="logo" />
        </Logo>

        <Title>Set New Password</Title>
        <Formik
          initialValues={initialValues}
          validationSchema={resetPasswordSchema}
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
                  disabled={true}
                />
              </InputContainer>

              <InputContainer>
                <CustomInput
                  label="Enter New Password"
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
                  label="Confirm New Password"
                  Component={Eye}
                  componentImg={eye}
                  name="password_confirmation"
                  type={showPassword ? "text" : "password"}
                  placeholder="8+ characters required"
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
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

export default ResetPassword;

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
