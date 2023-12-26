import React from "react";
import styled from "styled-components";
import { InputContainer, InputLabel } from "../HealthProfile/HealthProfile";
import { Field, Form, Formik } from "formik";
import eye from "./../../assets/eye.svg";
import { Eye } from "../Signup";
import CustomInput from "../../utils/CustomInput";
import { usePatientUpdatePassword } from "../../queries/useAppointment";
import { updatePasswordSchema } from "../../schemas/signinSchema";

function LoginDetails() {
  const initValues = {
    old_password: "",
    password: "",
    password_confirmation: "",
  };

  const { patientUpdatePasswords, isLoading } = usePatientUpdatePassword();

  const onSubmit = (values, actions) => {
    console.log(values, "valuesPassword");
    patientUpdatePasswords(values);
  };
  return (
    <Formik
      initialValues={initValues}
      validationSchema={updatePasswordSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Forms>
          <FormContainer>
            <SubTitle className="gap">Update password</SubTitle>
            <InputContainer style={{ marginBottom: "1em" }}>
              <CustomInput
                label="Password"
                Component={Eye}
                componentImg={eye}
                name="old_password"
                type="password"
                placeholder="8+ characters required"
              />
            </InputContainer>

            <InputContainer style={{ marginBottom: "1em" }}>
              <CustomInput
                label="New Password"
                Component={Eye}
                componentImg={eye}
                name="password"
                type="password"
                placeholder="8+ characters required"
              />
            </InputContainer>

            <InputContainer>
              <CustomInput
                label="Confirm Password"
                Component={Eye}
                componentImg={eye}
                name="password_confirmation"
                type="password"
                placeholder="8+ characters required"
              />
            </InputContainer>
          </FormContainer>

          <ButtonBox>
            <p>Clear</p>
            <Button disabled={isSubmitting} type="submit">
              Save Changes
            </Button>
          </ButtonBox>
        </Forms>
      )}
    </Formik>
  );
}

export default LoginDetails;

const Forms = styled(Form)`
  background-color: white;
  border-radius: 10px;
  padding: 1em 2em 1.5em;
  margin: 1em 0px;

  @media only Screen and (max-width: 768px) {
    margin: 2em 0 1em 0;
    padding: 2em 1em;
  }
`;
const FormContainer = styled.div`
  width: 50%;
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

  &.notmobile {
  }

  @media only Screen and (max-width: 700px) {
    font-size: 12px;
    padding: 1em;

    &.notmobile {
      display: none;
    }
    &::placeholder {
      font-size: 12px;
    }
  }
`;

const SubTitle = styled.h3`
  color: var(--grey);
  padding-bottom: 0.3em;
  margin-bottom: 1em;

  @media only Screen and (max-width: 768px) {
    font-size: 1em;

    &.gap {
      margin-bottom: 0.5em;
    }
  }
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2em;
  padding: 2em 0em;
  border-top: 1px solid;

  p {
    transition: all 0.2s;
    color: var(--grey);

    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
    &:focus {
      transform: scale(0.9);
    }
  }
`;

export const Button = styled.button`
  font-size: 15px;
  padding: 0.8rem 2rem;
  border-radius: 10px;
  background-color: var(--lightGreen);
  color: white;
  display: flex;
  align-items: center;
  gap: 1em;
  transition: all 0.2s;

  &.upload {
    background-color: transparent;
    color: var(--lightGreen);
    border: 1px solid var(--lightGreen);
    padding: 0.8rem 1.5rem;
  }

  &.remove {
    background-color: transparent;
    color: #ff3333;
    border: 1px solid #ff3333;
    padding: 0.8rem 1.5rem;
  }

  &.fb {
    background-color: transparent;
    color: var(--grey);
    border: 1px solid #d5d5d5;
    font-size: 13px;
    padding: 1rem 3rem;
    display: flex;
    justify-content: center;
  }

  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
  &:focus {
    transform: scale(0.9);
  }
  @media only Screen and (max-width: 768px) {
    font-size: 13px;
    padding: 0.8rem 1rem;

    &.remove,
    &.upload {
      padding: 0.5rem 1rem;
    }
  }
`;
