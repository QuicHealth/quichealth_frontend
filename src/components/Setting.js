import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import SideBar from "./SideBar";
import {
  AppointmentContainerWrapper,
  Container,
  HeadSection,
  MainBody,
} from "./Appointments";
import {
  InputNameContainer,
  InputLabel,
  Input,
  InputTypeBox,
  Text,
  Select,
} from "./RegisterBody";
import { SectionFive, SaveChanges, Right } from "./HealthProfile";
import { Avatar } from "@material-ui/core";
import { ProfileImage } from "./Overview";
import ExpertSidebar from "./Expert/ExpertSidebar";
import useForm from "./../utils/useForm";
import { genders } from "../utils/utils";

const AccountSection = ({ useForm }) => {
  const { handleChange, handleBlur, values, errors, setValues } =
    useForm("setting");
  const [gender, setGender] = useState("");

  const submitAccount = (e) => {
    e.preventDefault();
    console.log(values, "errors");
  };

  return (
    <>
      <SettingsTitle>
        Update your profile and the information we use to customize your user
        experience{" "}
      </SettingsTitle>
      <SettingsForm>
        <SettingsImage>
          <Avatar />
          <ImageButton>
            <Btn> Upload</Btn>
            <Btn className="remove">Remove</Btn>
          </ImageButton>
        </SettingsImage>
        <div>
          <InputNameContainer className="settings">
            <div style={{ width: "100%" }}>
              <SettingInput
                type="text"
                border={errors.email && "1px solid red"}
                value={values.email}
                name="email"
                onChange={handleChange}
                placeholder="Email"
              />
              {errors.email && <Text color="red">{errors.email}</Text>}
            </div>

            <div style={{ width: "100%" }}>
              <SettingInput
                type="text"
                name="phoneNumber"
                border={errors.phoneNumber && "1px solid red"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phoneNumber}
                placeholder="Patient Phone number"
              />
              {errors.phoneNumber && (
                <Text color="red">{errors.phoneNumber}</Text>
              )}
            </div>
          </InputNameContainer>

          <InputNameContainer className="settings">
            <div style={{ width: "100%" }}>
              <SettingInput
                name="address"
                border={errors.address && "1px solid red"}
                onChange={handleChange}
                value={values.address}
                type="text"
                placeholder="Address"
              />
              {errors.address && <Text color="red">{errors.address}</Text>}
            </div>
            <div style={{ width: "100%" }}>
              <SettingInput
                name="dob"
                border={errors.dob && "1px solid red"}
                onChange={handleChange}
                value={values.dob}
                type="date"
                placeholder="Date of Birth"
              />
              {errors.dob && <Text color="red">{errors.dob}</Text>}
            </div>
          </InputNameContainer>

          <SettingInputBox>
            <div>
              <Input
                type="text"
                name="city"
                border={errors.city && "1px solid red"}
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="City"
              />
              {errors.city && <Text color="red">{errors.city}</Text>}
            </div>
            <div>
              <select
                border={errors.gender && "1px solid red"}
                style={gender ? { color: "#000000" } : { color: "#bdbdbe" }}
                name="gender"
                onChange={(e) => {
                  const selectedGender = e.target.value;
                  setGender(selectedGender);
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  });
                }}
              >
                <option value="" hidden>
                  Gender
                </option>
                {Object.entries(genders).map(([key, value], id) => {
                  return (
                    <option key={key} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <Input
                border={errors.emergencyNumber && "1px solid red"}
                onChange={handleChange}
                onBlur={handleBlur}
                name="emergencyNumber"
                value={values.emergencyNumber}
                type="text"
                placeholder="Emergency contact number"
              />
              {errors.emergencyNumber && (
                <Text color="red">{errors.emergencyNumber}</Text>
              )}
            </div>
          </SettingInputBox>

          <SectionFive className="settings">
            <Right className="settings">
              <SaveChanges onClick={submitAccount}>Save changes</SaveChanges>
            </Right>
          </SectionFive>
        </div>
      </SettingsForm>
    </>
  );
};

const UpdateLogin = ({ useForm }) => {
  const { handleChange, handleBlur, values, errors, setValues } =
    useForm("updateProfile");
    
    const updateProfile = (e) => {
      e.preventDefault();
      console.log(values, "values")
    }
  return (
    <>
      <SettingsForm className="update">
        <div>
          <InputLabel htmlFor="">Input Username</InputLabel>
          <InputNameContainer className="update">
            <InputContainer>
              <SettingInput
                type="text"
                name="firstName"
                border={errors.firstName && "1px solid red"}
                value={values.firstName}
                onChange={handleChange}
                placeholder="First Name"
              />
              {errors.firstName && <Text color="red">{errors.firstName}</Text>}
            </InputContainer>

            <InputContainer></InputContainer>
          </InputNameContainer>
          <br />
          <InputNameContainer className="update">
            <InputContainer>
              <SettingInput
                type="text"
                name="lastName"
                border={errors.lastName && "1px solid red"}
                value={values.lastName}
                onChange={handleChange}
                placeholder="Last Name"
              />
              {errors.lastName && <Text color="red">{errors.lastName}</Text>}
            </InputContainer>

            <InputContainer></InputContainer>
          </InputNameContainer>
          <br />
          <br />
        </div>
        <div>
          <InputLabel htmlFor="">Change Password</InputLabel>
          <InputNameContainer className="update">
            <InputContainer>
              <SettingInput
                name="currentPassword"
                border={errors.currentPassword && "1px solid red"}
                value={values.currentPassword}
                onChange={handleChange}
                type="text"
                placeholder="Current Password"
              />
            </InputContainer>
            <InputContainer></InputContainer>
          </InputNameContainer>
          <br />
          <InputNameContainer className="update">
            <InputContainer>
              <SettingInput
                name="newPassword"
                border={errors.newPassword && "1px solid red"}
                value={values.newPassword}
                onChange={handleChange}
                type="text"
                placeholder="New Password"
              />
            </InputContainer>
            <InputContainer></InputContainer>
          </InputNameContainer>
          <br />
          <InputNameContainer className="update">
            <InputContainer>
              <SettingInput
                name="passwordConfirmation"
                border={errors.passwordConfirmation && "1px solid red"}
                value={values.passwordConfirmation}
                onChange={handleChange}
                type="text"
                placeholder="Confirm new password"
              />
            </InputContainer>

            <InputContainer></InputContainer>
          </InputNameContainer>
          <br />
          <SectionFive className="update">
            <div>
              {" "}
              <SaveChanges onClick={updateProfile} className="update">Save changes</SaveChanges>
            </div>
            <div></div>
          </SectionFive>
        </div>
      </SettingsForm>
    </>
  );
};

function Settings({ expert, openSidebar }) {
  const [isPassiveTab, setIsPassiveTab] = useState(false);

  return (
    <Container sidebar={openSidebar}>
      {expert ? <ExpertSidebar /> : <SideBar />}
      <MainBody sidebar={openSidebar}>
        <HeadSection sidebar={openSidebar}>
          <h1>Setting</h1>
          <ProfileImage sidebar={openSidebar} className="noTopPadding">
            <img
              src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg"
              alt=""
            />
          </ProfileImage>
        </HeadSection>
        <AppointmentContainerWrapper sidebar={openSidebar}>
          <SettingsContainer sidebar={openSidebar}>
            <SettingsTab>
              {!isPassiveTab ? (
                <>
                  <Tab>Account</Tab>
                  <Tab
                    className="passive-tab"
                    onClick={() => setIsPassiveTab(true)}
                  >
                    Update Login details
                  </Tab>
                </>
              ) : (
                <>
                  <Tab
                    className="passive-tab"
                    onClick={() => setIsPassiveTab(false)}
                  >
                    Account
                  </Tab>
                  <Tab>Update Login details</Tab>
                </>
              )}
            </SettingsTab>
            {!isPassiveTab ? (
              <AccountSection useForm={useForm} />
            ) : (
              <UpdateLogin useForm={useForm} />
            )}
          </SettingsContainer>
        </AppointmentContainerWrapper>
      </MainBody>
    </Container>
  );
}

const mapStateProps = (state) => ({
  openSidebar: state.utils.openSidebar,
});

export default Settings = connect(mapStateProps)(Settings);

const SettingsContainer = styled.div`
  width: 55em;
  margin: 3em auto;
  background-color: white;
  transition: all 0.5s ease;
  @media (max-width: ${950}px) {
    width: 100%;
    position: relative;
    left: ${({ sidebar }) => (!sidebar ? "0em" : "0em")};
    background: transparent;
  }
`;
const SettingsTab = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  width: 100%;
  //text-align: center;
  @media (max-width: ${500}px) {
    grid-template-columns: 30% 70%;
    column-gap: 1em;
  }
`;
const Tab = styled.span`
  padding: 0.5em 1em;
  font-weight: 600;
  font-size: 1.2em;
  &.passive-tab {
    background-color: #fafafb;
    color: #87878a8c;
    //padding: 0.1em 1.3em;
    @media (max-width: ${500}px) {
      padding: 0.5em 0;
      //text-align: center;
      background-color: unset;
      font-size: 17px;
      border: 0;
    }
  }
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
  @media (max-width: ${500}px) {
    font-size: 18px;
    padding: 0.5em 0;
    border-bottom: 2px solid #070647;
    height: 2.2em;
  }
`;
const SettingsTitle = styled.p`
  margin: 2em 1em 0 1em;
  font-size: 1.1em;
  font-weight: 500;
  display: block;
  @media (max-width: ${750}px) {
    //font-size:12px;
  }
  @media (max-width: ${500}px) {
    font-size: 10px;
    display: none;
  }
`;
const SettingsForm = styled.form`
  width: 100%;
  padding: 1em;
  box-shadow: 0px 2px #2e302f4a;

  @media (max-width: ${500}px) {
    padding: 0;
    box-shadow: none;
  }

  &.update {
    margin-top: 1em;
    @media (max-width: ${500}px) {
      margin-top: 5em;
    }
  }
`;
const SettingsImage = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: 20% 80%;
  align-items: center;
  padding: 1em 0 3em 0;
  @media (max-width: ${800}px) {
    width: 100%;
    grid-template-columns: 30% 70%;
    margin-top: 3em;
  }
  .MuiAvatar-colorDefault {
    color: #747474;
    width: 6em;
    height: 6em;
    @media (max-width: ${500}px) {
      width: 4em;
      height: 4em;
    }
  }
`;

const ImageButton = styled.span`
  align-items: center;
`;
const Btn = styled.span`
  width: 1.5em;
  font-weight: 900;
  padding: 0.5em 1.5em;
  font-size: 1.2em;
  margin: 0 0.5em;
  color: white;
  background-color: #040343;
  border-radius: 5px;
  box-shadow: 1px 2px #2e302f4a;

  @media (max-width: ${500}px) {
    font-size: 14px;
  }

  &.remove {
    background-color: white;
    color: #040343;
    border: 1px solid #040343;
    padding: 0.4em 1.3em;
  }
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

const SettingInput = styled(Input)`
  width: 90%;
  font-size: 1.1em;
  line-height: 21px;
  border: 2px solid #2fa5a9;
  background-color: transparent;
  border-radius: 10px;
  margin-bottom: 0;
  @media (max-width: ${800}px) {
    width: 100%;
  }
  @media (max-width: ${500}px) {
    width: 100%;
    padding: 0.5em;
    font-size: 14px;
    margin-bottom: 2em;
    border: 1px solid #000;
  }
`;

const SettingInputBox = styled(InputTypeBox)`
  grid-template-columns: 30% 32% auto;
  column-gap: 1em;
  > div > input {
    font-size: 1.1em;
    border: 2px solid #2fa5a9;
    background-color: transparent;
    border-radius: 10px;
    @media (max-width: ${500}px) {
      font-size: 14px;
      margin-bottom: 2em;
      border: 1px solid #000;
      width: 100%;
    }
  }
  > div > select {
    font-size: 1.1em;
    border: 2px solid #2fa5a9;
    background-color: transparent;
    border-radius: 10px;
    color: #bdbdbe;
    height: 2.5em;
    padding: 0.5em;
    width: 97%;
    @media (max-width: ${500}px) {
      font-size: 14px;
      margin-bottom: 2em;
      border: 1px solid #000;
      width: 100%;
    }
  }
  @media (max-width: ${500}px) {
    grid-template-columns: 100%;
  }
`;

const InputContainer = styled.div`
  width: 100%;
`