import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { dates, months, years } from "./../utils";

function RegisterBody() {
  const genders = ["Male", "Female"];
  const INITIAL_STATE = {
    firstname: "",
    lastname: "",
    email: "",
    mobileNo: "",
    password: "",
    confirmPassword: "",
    gender: "",
  };

  const [values, setValues] = useState(INITIAL_STATE);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [errors, setErrors] = useState({});

  const register = (e) => {
    e.preventDefault();
    const date = `${day}-${month}-${year}`;
    values.date = date;
    console.log(values);
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <Container>
      <RegisterMinContainer>
        <h1>Create Profile</h1>
        <FormContainer>
          <InputContainer>
            <InputLabel htmlFor="Name"> Name </InputLabel>
            <InputNameContainer>
              <Input
                type="text"
                name="firstname"
                value={values.firstname}
                onChange={handleChange}
                placeholder="First Name"
              />
              <Input
                type="text"
                name="lastname"
                value={values.lastname}
                onChange={handleChange}
                placeholder="Last Name"
              />
            </InputNameContainer>
            <br />

            <InputLabel htmlFor="Dob"> Date of Birth </InputLabel>
            <InputTypeBox>
              <Select
                onChange={(e) => {
                  const selectedDay = e.target.value;
                  setDay(selectedDay);
                }}
              >
                <option value="" hidden>
                  date
                </option>
                {dates("days").map((date, key) => {
                  return (
                    <option key={key} value={date}>
                      {date}
                    </option>
                  );
                })}
              </Select>
              <Select
                onChange={(e) => {
                  const selectedMonth = e.target.value;
                  setMonth(selectedMonth);
                }}
              >
                <option value="" hidden>
                  month
                </option>
                {Object.entries(months).map(([key, value], id) => {
                  return (
                    <option key={id} value={value}>
                      {value}
                    </option>
                  );
                })}
              </Select>
              <Select
                onChange={(e) => {
                  const selectedYear = e.target.value;
                  setYear(selectedYear);
                }}
              >
                <option value="" hidden>
                  year
                </option>
                {dates().map((date) => {
                  return <option value={date}>{date}</option>;
                })}
              </Select>
            </InputTypeBox>
            <br />

            <InputLabel htmlFor="gender"> Gender </InputLabel>
            <div style={{ textAlign: "left" }}>
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
                    <label
                      htmlFor={gend}
                      style={{ position: "relative", bottom: ".1em" }}
                    >
                      {" "}
                      {gend}
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </>
                );
              })}
            </div>
            <br />

            <InputLabel htmlFor="mobile"> Mobile</InputLabel>
            <div style={{ display: "grid" }}>
              <Input
                type="text"
                name="mobileNo"
                value={values.mobileNo}
                onChange={handleChange}
                placeholder="+234-3xxx-xxx-xxxx"
              />
            </div>
            <br />

            <InputLabel htmlFor="email"> Email</InputLabel>
            <div style={{ display: "grid" }}>
              <Input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="example@xxx.com"
              />
            </div>
            <br />

            <InputLabel htmlFor="password"> Password</InputLabel>
            <div style={{ display: "grid" }}>
              <Input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                placeholder="password"
              />
            </div>
            <br />

            <InputLabel htmlFor="password"> Confirm Password</InputLabel>
            <div style={{ display: "grid" }}>
              <Input
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                placeholder="password"
              />
            </div>
            <br />
            <br />

            <submit type="submit" onClick={register}>
              Continue
            </submit>
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
        By Clicking <StyledLink to="/signin">"Continue"</StyledLink>, you are
        agreeing to the QuicHealth Terms of
      </TermsParagraph>
      <TermsParagraph>
        {" "}
        Use, Privacy Policy, and Telehealth Consent Policy
      </TermsParagraph>
    </Container>
  );
}

export default RegisterBody;

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
`;

export const InputNameContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${700}px) {
    display: grid;
    grid-template-columns: 45% 47%;
    column-gap: 2em;
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
  > submit {
    padding: 0.5em 2.5em;
    border-radius: 20px;
    background-color: #2fa5a9;
    color: white;
    text-align: center;

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
`;
export const Input = styled.input`
  padding: 0.6em 2em 0.6em 1em;
  border-radius: 14px;
  border: 1px solid #2fa5a9;
  outline: none;
  @media (max-width: ${500}px) {
    padding: 0.5em;
    font-size: 10px;
  }
  ::placeholder {
    color: #bdbdbe;
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

const Select = styled.select`
  padding: 0.6em 2em 0.6em 1em;
  border-radius: 14px;
  border: 1px solid #2fa5a9;
  outline: none;
  color: #bdbdbe;
  @media (max-width: ${500}px) {
    padding: 0.5em;
    font-size: 10px;
  }
  option {
  }
`;
