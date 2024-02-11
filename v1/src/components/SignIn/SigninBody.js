import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { pageUp } from "./../../redux/actions";
import {
  TermsParagraph,
  AlreadyHaveAccount,
  InputLabel,
  RegisterMinContainer,
  FormContainer,
  InputContainer,
  Text,
} from "./../RegisterBody";
import { Slidein } from "./../RegisterBody";

import { userAuth } from "./../../Validations/UserValidation";
import useForm from "./../../utils/useForm";
import { Spin } from "../../pages/Register";
import { signIn } from "../../redux/actions/AuthActions";

function SigninBody(props) {
  let history = useHistory();
  const {
    values,
    errors,
    setErrors,
    setDisabledSubmit,
    handleChange,
    handleBlur,
    setValues,
    disabledSubmit,
    setIsSubmit,
  } = useForm("login");

  const { isLoading, signIn, expert } = props;

  const signin = async (e) => {
    e.preventDefault();
    const formError = userAuth(values);
    setErrors(formError);
    setDisabledSubmit(true);
    setIsSubmit(true);
    const noErrors = Object.keys(formError).length === 0;
    if (noErrors) {
      let response = expert
        ? await signIn(values, expert)
        : await signIn(values);
       
      if (response?.data?.route?.includes("doctor")) { 
        setTimeout(() => {
          return history.push("/expert-overview");
        }, 2000);
      } 
    }
  };

  useEffect(() => {
    pageUp();
  }, []);

  return (
    <>
      {isLoading ? (
        <Spin />
      ) : (
        <Container>
          <RegisterMinContainer>
            <h1>Sign in</h1>
            <FormContainer>
              <InputContainer>
                <InputLabel htmlFor="email"> Email</InputLabel>
                <div style={{ display: "grid" }}>
                  <Input
                    type="email"
                    border={errors.email && "1px solid red"}
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="example@xxx.com"
                  />
                </div>
                {errors.email && <Text color="red">{errors.email}</Text>}
                <br />

                <InputLabel htmlFor="password"> Password</InputLabel>
                <div style={{ display: "grid" }}>
                  <Input
                    border={errors.password && "1px solid red"}
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder=""
                  />
                </div>
                {errors.password && <Text color="red">{errors.password}</Text>}
                <br />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px",
                  }}
                >
                  <AlreadyHaveAccount style={{ padding: 0 }}>
                    <StyledLink to="/reset-password">
                      Forgot password?{" "}
                    </StyledLink>
                  </AlreadyHaveAccount>
                  <AlreadyHaveAccount style={{ padding: 0 }}>
                    Dont have an account?{" "}
                    <StyledLink to="/register">
                      <b>CreateAccount</b>
                    </StyledLink>{" "}
                  </AlreadyHaveAccount>
                </div>

                <br />
                <br />
                <button
                  disabled={disabledSubmit}
                  onClick={signin}
                  type="submit"
                >
                  {" "}
                  Continue{" "}
                </button>
                <br />
              </InputContainer>
            </FormContainer>
          </RegisterMinContainer>

          <TermsParagraph style={{ paddingTop: "1em" }}>
            {" "}
            By Clicking <StyledLink to="/signin">"Continue"</StyledLink>, you
            are agreeing to the QuicHealth Terms of
          </TermsParagraph>
          <TermsParagraph>
            {" "}
            Use, Privacy Policy, and Telehealth Consent Policy
          </TermsParagraph>
        </Container>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.signIn.isLoading,
});
const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (value, expert) => dispatch(signIn(value, expert)),
    pageUp: () => dispatch(pageUp()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SigninBody);

const Container = styled.div`
  background-color: #fafafb;
  margin: 0em 0.8em;
  border-radius: 15px;
  height: 100vh;
  width: 98%;
  padding-top: 3em;
  font-size: 1em;
  transform-origin: right;
  animation: ${Slidein} 500ms 0s ease-in-out;
`;

const Input = styled.input`
  padding: 0.6em 2em 0.6em 1em;
  border-radius: 14px;
  border: 1px solid #2fa5a9;
  outline: none;
  ::placeholder {
    color: #bdbdbe;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #070647;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
    transition: all 0.3s;
  }
`;
