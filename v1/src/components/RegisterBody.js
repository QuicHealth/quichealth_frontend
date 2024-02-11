import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";

import { dates, months, years } from "../utils/utils";
import { userAuth } from "./../Validations/UserValidation";
import useForm from "./../utils/useForm";
import { pageUp } from "./../redux/actions";
import { Spin } from "../pages/Register";
import { registerUser } from "../redux/actions/AuthActions";

function RegisterBody(props) {
  const {
    values,
    errors,
    setErrors,
    setDisabledSubmit,
    handleChange,
    handleBlur,
    setValues,
    genders,
    disabledSubmit,
    setIsSubmit,
  } = useForm();
  const { registerUser, errorMessage, successMessage, isLoading } = props;
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const register = (e) => {
    e.preventDefault();
    const date = `${day}${month}${year}`;
    values.dob = date;
    const formError = userAuth(values);
    setErrors(formError);
    setDisabledSubmit(true);
    setIsSubmit(true);
    const noErrors = Object.keys(formError).length === 0;
    if (noErrors) {
      registerUser(values);
    }
  };

  useEffect(() => {
    pageUp();
  });
  return (
    <Container className="register">
      {isLoading ? <Spin /> : ""}
      <RegisterMinContainer>
        <h1>Create Profile</h1>
        <FormContainer>
          <InputContainer>
            <InputLabel htmlFor="Name"> Name </InputLabel>
            <InputNameContainer>
              <div>
                <Input
                  width
                  border={errors.firstname && "1px solid red"}
                  type="text"
                  name="firstname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstname}
                  placeholder="First Name"
                />
                {errors.firstname && (
                  <Text className="name" color="red">
                    {errors.firstname}
                  </Text>
                )}
              </div>

              <div>
                <Input
                  width
                  border={errors.lastname && "1px solid red"}
                  type="text"
                  name="lastname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastname}
                  //onChange={handleChange}
                  placeholder="Last Name"
                />
                {errors.lastname && (
                  <Text className="name" color="red">
                    {errors.lastname}
                  </Text>
                )}
              </div>
            </InputNameContainer>
            <br />

            <InputLabel htmlFor="Dob"> Date of Birth </InputLabel>
            <div></div>
            <InputTypeBox>
              <Select
                border={errors.day && "1px solid red"}
                name="day"
                style={day ? { color: "#000000" } : { color: "#bdbdbe" }}
                onChange={(e) => {
                  const selectedDay = e.target.value;
                  setDay(selectedDay);
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  });
                  setDisabledSubmit(false);
                }}
              >
                <option value="" hidden>
                  date
                </option>
                {dates("days").map((date, key) => {
                  return (
                    <option key={key} value={`${date}-`}>
                      {date}
                    </option>
                  );
                })}
              </Select>
              <Select
                border={errors.month && "1px solid red"}
                name="month"
                style={month ? { color: "#000000" } : { color: "#bdbdbe" }}
                onChange={(e) => {
                  const selectedMonth = e.target.value;
                  setMonth(selectedMonth);
                  setDisabledSubmit(false);
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  });
                }}
              >
                <option value="" hidden>
                  month
                </option>
                {Object.entries(months).map(([key, value], id) => {
                  return (
                    <option key={id} value={`${value}-`}>
                      {value}
                    </option>
                  );
                })}
              </Select>
              <Select
                border={errors.year && "1px solid red"}
                style={year ? { color: "#000000" } : { color: "#bdbdbe" }}
                name="year"
                onChange={(e) => {
                  const selectedYear = e.target.value;
                  setYear(selectedYear);
                  setDisabledSubmit(false);
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  });
                }}
              >
                <option value="" hidden>
                  year
                </option>
                {dates().map((date, key) => {
                  return (
                    <option value={date} key={key}>
                      {date}
                    </option>
                  );
                })}
              </Select>
            </InputTypeBox>
            {errors.dob && (
              <Text color="red" style={{ textAlign: "center" }}>
                {errors.dob}
              </Text>
            )}
            <br />

            <InputLabel htmlFor="gender"> Gender </InputLabel>
            <GenderContainer>
              {genders.map((gend, key) => {
                return (
                  <>
                    <Input
                      key={key}
                      type="checkbox"
                      value={gend}
                      name="gender"
                      checked={values.gender === gend}
                      onChange={handleChange}
                    />{" "}
                    &nbsp;
                    <label htmlFor={gend}> {gend}</label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </>
                );
              })}
              {errors.gender && (
                <Text color="red" className="gender">
                  {errors.gender}
                </Text>
              )}
            </GenderContainer>
            <br />

            <InputLabel htmlFor="mobile"> Mobile</InputLabel>
            <div style={{ display: "grid" }}>
              <Input
                type="text"
                border={errors.phone && "1px solid red"}
                name="phone"
                value={values.phone}
                onChange={handleChange}
                placeholder="+234-3xxx-xxx-xxxx"
              />
            </div>
            {errors.phone && <Text color="red">{errors.phone}</Text>}
            <br />

            <InputLabel htmlFor="email"> Email</InputLabel>
            <div style={{ display: "grid" }}>
              <Input
                border={errors.email && "1px solid red"}
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
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
                placeholder="password"
              />
            </div>
            {errors.password && <Text color="red">{errors.password}</Text>}
            <br />

            <InputLabel htmlFor="password"> Confirm Password</InputLabel>
            <div style={{ display: "grid" }}>
              <Input
                border={errors.password_confirmation && "1px solid red"}
                type="password"
                name="password_confirmation"
                value={values.password_confirmation}
                onChange={handleChange}
                placeholder="password"
              />
            </div>
            {errors.password_confirmation && (
              <Text color="red">{errors.password_confirmation}</Text>
            )}
            <br />
            <br />

            <button disabled={disabledSubmit} onClick={register} type="submit">
              Continue
            </button>
            <br />
            <AlreadyHaveAccount>
              Already have an account?{" "}
              <StyledLink to="/signin">Signin</StyledLink>{" "}
            </AlreadyHaveAccount>
          </InputContainer>
        </FormContainer>
      </RegisterMinContainer>

      <TermsParagraph>
        {" "}
        By Clicking <StyledLink to="">"Continue"</StyledLink>, you are agreeing
        to the QuicHealth Terms of
      </TermsParagraph>
      <TermsParagraph>
        {" "}
        Use, Privacy Policy, and Telehealth Consent Policy
      </TermsParagraph>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.signup.isLoading,
  errorMessage: state.signup.errorMessage,
  successMessage: state.signup.successMessage,
});
const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (value) => dispatch(registerUser(value)),
    pageUp: () => dispatch(pageUp()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterBody);

//slidein
export const Slidein = keyframes`
  0%{
    transform: scaleX(0);
    //opacity: 0;
    
  }
  100%{
    transform: scaleX(1);
    //opacity: 1;
  }
`;

export const Container = styled.div`
  background-color: #fafafb;
  margin: 0 0.8em;
  border-radius: 15px;
  height: 100vh;
  width: 98%;
  padding-bottom: 2em;
  font-size: 1.1em;
  transform-origin: right;
  animation: ${Slidein} 500ms 0s ease-in-out;
  &.register {
    height: unset;
  }

  @media (max-width: ${700}px) {
    font-size: 13px;
    margin: 0;
  }
`;

export const InputTypeBox = styled.div`
  display: grid;
  grid-template-columns: 20% 35% 32%;
  column-gap: 2em;
  @media (max-width: ${700}px) {
    column-gap: 1.5em;
  }
  &.selectAppointment {
    display: unset;
  }
  option {
    background-color: white;
  }
`;

export const InputNameContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${700}px) {
    display: grid;
    grid-template-columns: 45% 47%;
    column-gap: 2em;

    &.settings {
      grid-template-columns: 100%;
    }
  }
  &.settings {
    margin-bottom: 2rem;
    column-gap: 3em;

    @media (max-width: ${700}px) {
      grid-template-columns: 100%;
      margin-bottom: 0;
    }
  }
  &.update {
    margin-bottom: 0rem;

    @media (max-width: ${700}px) {
      grid-template-columns: 100%;
      margin-bottom: 0;
    }
  }
`;

export const RegisterMinContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  color: #070647;
  text-align: center;
  padding-top: 1em;
  padding-bottom: 1em;

  > h1 {
    //letter-spacing: -2.7px;
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
export const InputContainer = styled.form`
  > button {
    padding: 0.5em 2.5em;
    border-radius: 20px;
    background-color: #2fa5a9;
    color: white;
    text-align: center;
    outline: none;
    border: 0;

    &:hover {
      cursor: pointer;
      opacity: 0.6;
      transition: all 0.5s;
    }
  }
`;

export const InputLabel = styled.label`
  text-align: left;
  display: flex;
  font-weight: 700;
  margin-bottom: 0.3em;
  @media (max-width: ${700}px) {
    font-size: 18px;
  }
`;
export const Input = styled.input`
  padding: 0.6em 2em 0.6em 1em;
  border-radius: 14px;
  border: ${(props) => props.border || "1px solid #2fa5a9"};
  outline: none;

  &.select {
    padding: 0.3em 0.5em 0.3em 0.5em;
    font-size: 0.9em;
    ::placeholder {
      color: #bdbdbe;
    }
  }
  @media (max-width: ${500}px) {
    padding: 0.5em;
    font-size: 10px;
    height: 2.5em;
    width: ${(props) => (props.width ? "100%" : " inherit")};
  }
  ::placeholder {
    color: #bdbdbe;
  }
`;

const GenderContainer = styled.div`
  text-align: left;

  label {
    position: relative;
    bottom: 0em;
    @media (max-width: ${500}px) {
      bottom: 0.6em;
    }
  }
`;

export const Text = styled.p`
  color: ${(props) => props.color || "#4d4d4d"};
  text-align: left;
  position: relative;
  left: 0.5em;
  top: 0.5em;
  font-size: 0.9em;

  &.name {
    left: 0.5em;
  }
  &.gender {
    top: -0.1em;
    left: 0.5em;
  }
  @media (max-width: ${500}px) {
    font-size: 9px;
  }
`;

export const AlreadyHaveAccount = styled.p`
  font-size: 13px;
  padding-top: 2em;
  @media (max-width: ${700}px) {
    font-size: 12px;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #070647;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
    transition: all 0.3s;
  }
`;

export const TermsParagraph = styled.p`
  text-align: center;
  margin: 0 auto 0 auto;
  font-size: 13px;
  @media (max-width: ${700}px) {
    font-size: 12px;
  }
`;

export const Select = styled.select`
  padding: 0.6em 2em 0.6em 1em;
  border-radius: 14px;
  border: ${(props) => props.border || "1px solid #2fa5a9"};
  outline: none;
  color: #bdbdbe;
  @media (max-width: ${500}px) {
    padding: 0.5em;
    font-size: 10px;
  }
  &.selectAppointment {
    width: 100%;
    padding: 0.3em 2em 0.3em 1em;
    font-size: 0.8em;
    border: 2px solid #2fa5a9;
    margin-bottom: 1em;
    background-color: inherit;
    @media (max-width: ${500}px) {
      padding: 0.7em 0.5em;
      font-size: 1em;
      border: 1px solid #2fa5a9;
      background-color: inherit;
    }
  }
`;
