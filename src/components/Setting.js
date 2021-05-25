import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import SideBar from "./SideBar";
import { Container, MainBody } from "./Appointments";
import {
  InputNameContainer,
  InputLabel,
  Input,
  InputTypeBox,
} from "./RegisterBody";
import { SectionFive, SaveChanges, Right } from "./HealthProfile";
import { Avatar } from "@material-ui/core";

const AccountSection = () => {
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
          <InputNameContainer>
            <SettingInput type="text" placeholder="Email" />
            <SettingInput type="text" placeholder="Patient Phone number" />
          </InputNameContainer>
          <br />
          <InputNameContainer>
            <SettingInput type="text" placeholder="Address" />
            <SettingInput type="text" placeholder="Date of Birth" />
          </InputNameContainer>
          <br />
          <SettingInputBox>
            <Input type="text" placeholder="City" />
            <Input type="text" placeholder="Gender" />
            <Input type="text" placeholder="Emergency contact number" />
          </SettingInputBox>

          <SectionFive>
            <Right>
              <SaveChanges>Save changes</SaveChanges>
            </Right>
          </SectionFive>
        </div>
      </SettingsForm>
    </>
  );
};

const UpdateLoginSection = () => {
  return (
    <>
      <SettingsForm style={{ marginTop: "1em" }}>
        <div>
          <InputLabel htmlFor="">Input Username</InputLabel>
          <InputNameContainer>
            <SettingInput type="text" placeholder="First Name" />
            <div></div>
          </InputNameContainer>
          <br />
          <InputNameContainer>
            <SettingInput type="text" placeholder="Last Name" />
            <div></div>
          </InputNameContainer>
          <br />
          <br />
        </div>
        <div>
          <InputLabel htmlFor="">Change Password</InputLabel>
          <InputNameContainer>
            <SettingInput type="text" placeholder="Current Password" />
            <div></div>
          </InputNameContainer>
          <br />
          <InputNameContainer>
            <SettingInput type="text" placeholder="New Password" />
            <div></div>
          </InputNameContainer>
          <br />
          <InputNameContainer>
            <SettingInput type="text" placeholder="Confirm new password" />
            <div></div>
          </InputNameContainer>
          <br />
          <SectionFive style={{ justifyContent: "flex-start" }}>
            <div>
              {" "}
              <SaveChanges>Save changes</SaveChanges>
            </div>
            <div></div>
          </SectionFive>
        </div>
      </SettingsForm>
    </>
  );
};

function Settings({ openSidebar }) {
  const [isPassiveTab, setIsPassiveTab] = useState(false);

  return (
    <Container sidebar={openSidebar}>
      <SideBar />
      <MainBody>
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
          {!isPassiveTab ? <AccountSection /> : <UpdateLoginSection />}
        </SettingsContainer>
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
  transition: all .5s ease ;
  @media (max-width: ${950}px) {
    width: 100%;
    position: relative;
    left: ${({sidebar}) => (!sidebar? "-2em": "0em")}
  }
`;
const SettingsTab = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  width: 100%;
  text-align: center;
`;
const Tab = styled.span`
  padding: 0.5em 0;
  font-weight: 600;
  font-size: 1.2em;
  &.passive-tab {
    background-color: #fafafb;
    color: #87878a8c;
    padding: 0.1em 1.3em;
  }
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;
const SettingsTitle = styled.p`
  margin: 2em 1em 0 1em;
  font-size: 1.1em;
  font-weight: 500;
  @media (max-width: ${750}px) {
    //font-size:12px;
  }
  @media (max-width: ${500}px) {
    font-size: 10px;
  }
`;
const SettingsForm = styled.form`
  width: 100%;
  padding: 1em;
  box-shadow: 0px 2px #2e302f4a;
`;
const SettingsImage = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: 20% 80%;
  align-items: center;
  padding: 1em 0 3em 0;
  @media (max-width: ${800}px) {
    width: 100%;
    grid-template-columns: 22% 78%;
  }
  .MuiAvatar-colorDefault {
    color: #747474;
    width: 6em;
    height: 6em;
    @media (max-width: ${500}px) {
      width: 2em;
      height: 2em;
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
    font-size: 11px;
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
  width: 47%;
  font-size: 1.1em;
  @media (max-width: ${800}px) {
    width: 100%;
  }
  @media (max-width: ${500}px) {
    width: 100%;
    padding: 0.5em;
    font-size: 8px;
  }
`;

const SettingInputBox = styled(InputTypeBox)`
  grid-template-columns: 30% 32% auto;
  column-gap: 1em;
  >input{
    font-size: 1.1em ;
    @media (max-width: ${500}px) {
    font-size: 8px;
    }
  }
`;
