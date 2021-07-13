import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { Slidein, Text, InputContainer } from "./RegisterBody";

import { userAuth } from "./../Validations/UserValidation";
import useForm from "./../utils/useForm";
import { Spin } from "../pages/Register";
import { passwordReset } from "../redux/actions";
import {
  Container,
  RegisterMinContainer,
  FormContainer,
  InputLabel,
  Input,
} from "./ResetPasswordBody";

function NewPasswordLink(props) {
  const {
    values,
    errors,
    setErrors,
    setDisabledSubmit,
    handleChange,
    handleBlur,
    disabledSubmit,
    setIsSubmit,
  } = useForm("newpasslink");

  const { isLoading, passwordReset } = props;

  const newPassLink = (e) => {
    e.preventDefault();
    const formError = userAuth(values);
    setErrors(formError);
    setDisabledSubmit(true);
    setIsSubmit(true);
    const noErrors = Object.keys(formError).length === 0;
    if (noErrors) {
      passwordReset(values);
    }
  };
  return (
    <Container>
      {isLoading ? <Spin /> : ""}
      <RegisterMinContainer>
        <h1>Password Reset</h1>
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

            <button
              disabled={disabledSubmit}
              onClick={newPassLink}
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
  });
  const mapDispatchToProps = (dispatch) => {
    return {
      passwordReset: (value) => dispatch(passwordReset(value)),
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(NewPasswordLink);
