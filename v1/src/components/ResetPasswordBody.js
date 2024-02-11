import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { Slidein, Text, InputContainer } from "./RegisterBody";

import { userAuth } from "./../Validations/UserValidation";
import useForm from "./../utils/useForm";
import { Spin } from "../pages/Register";
import { changePassword } from "../redux/actions/AuthActions";
import { verifyResetToken } from "../redux/actions/AuthActions";

function ResetPasswordBody(props) {
  const {
    values,
    errors,
    setErrors,
    setDisabledSubmit,
    handleChange,
    handleBlur,
    disabledSubmit,
    setIsSubmit,
  } = useForm("passwordreset");

  const { isLoading, resetToken, changePassword, verifyResetToken } = props;

  const resetPassword = (e) => {
    e.preventDefault();
    const formError = userAuth(values);
    values.token = resetToken;
    setErrors(formError);
    setDisabledSubmit(true);
    setIsSubmit(true);
    console.log(values);
    const noErrors = Object.keys(formError).length === 0;
    if (noErrors) {
      changePassword(values);
    }
  };

  useEffect(() => {
    verifyResetToken();
  }, []);

  return (
    <Container>
      {isLoading ? <Spin /> : ""}
      <RegisterMinContainer>
        <h1>Password Reset</h1>
        <FormContainer>
          <InputContainer>
            <InputLabel htmlFor="password"> New Password</InputLabel>
            <div style={{ display: "grid" }}>
              <Input
                border={errors.password && "1px solid red"}
                type="password"
                name="password"
                onBlur={handleBlur}
                value={values.password}
                onChange={handleChange}
                placeholder=""
              />
            </div>
            {errors.password && <Text color="red">{errors.password}</Text>}
            <br />
            <InputLabel htmlFor="password">Confirm Password</InputLabel>
            <div style={{ display: "grid" }}>
              <Input
                border={errors.password_confirmation && "1px solid red"}
                type="password"
                onChange={handleChange}
                name="password_confirmation"
                value={values.password_confirmation}
                placeholder="password"
              />
            </div>
            {errors.password_confirmation && (
              <Text color="red">{errors.password_confirmation}</Text>
            )}
            <br />
            <br />

            <button
              disabled={disabledSubmit}
              onClick={resetPassword}
              type="submit"
            >
              Continue
            </button>
            <br />
          </InputContainer>
        </FormContainer>
      </RegisterMinContainer>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.signup.isLoading,
  resetToken: state.resetPassword.resetToken,
});
const mapDispatchToProps = (dispatch) => {
  return {
    changePassword: (value) => dispatch(changePassword(value)),
    verifyResetToken: () => dispatch(verifyResetToken()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordBody);

export const Container = styled.div`
  background-color: #fafafb;
  margin: 0 0.8em;
  border-radius: 15px;
  height: 100vh;
  width: 98%;
`;

export const RegisterMinContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  color: #070647;
  text-align: center;
  padding-top: 1.5em;

  > h1 {
    letter-spacing: -2.7px;
    font-size: 1.7em;
    margin-bottom: 1em;
  }
`;
export const FormContainer = styled.div`
  width: 30em;
  margin: 0 auto;

  @media (max-width: ${700}px) {
    width: auto;
  }
`;

export const InputLabel = styled.label`
  text-align: left;
  display: flex;
  font-weight: 700;
  margin-bottom: 0.3em;
`;
export const Input = styled.input`
  padding: 0.6em 2em 0.6em 1em;
  border-radius: 14px;
  border: 1px solid #2fa5a9;
  outline: none;
  ::placeholder {
    color: #bdbdbe;
  }
`;
