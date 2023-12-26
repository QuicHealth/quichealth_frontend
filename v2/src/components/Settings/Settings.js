import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Container, Layout, Title } from "../Notifications/NotificationLayout";
import { InputContainer, InputLabel } from "../HealthProfile/HealthProfile";
import propix from "./../../assets/propix.png";
import fb from "./../../assets/FB.svg";
import google from "./../../assets/google.svg";
import cancel from "./../../assets/cancel.png";
import { SidebarCollapseContext } from "../../context/SidebarCollapseContext";

function Settings() {
  const { collapse, setCollapse } = useContext(SidebarCollapseContext);
  useEffect(() => {
    setCollapse(false);
  }, []);
  return (
    <Container collapse={collapse}>
      <div></div>
      <Layout>
        <Title>Settings</Title>
        <Form>
          <ProfilePix>
            <SubTitle>Profile photo</SubTitle>
            <Propix>
              <div>
                <img src={propix} alt="profilePx" />
              </div>

              <div>
                <Button className="upload">Upload</Button>
                <Button className="remove">Remove</Button>
              </div>
            </Propix>
          </ProfilePix>

          <PersonalInfo>
            <LeftSection>
              <SubTitle className="gap">Personal info</SubTitle>
              <Sectionlize>
                <InputContainer className="bloodgroup">
                  <InputLabel htmlFor="fullName">Full Name</InputLabel>
                  <div>
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                    />
                  </div>
                </InputContainer>

                <InputContainer>
                  <InputLabel
                    style={{ color: "transparent" }}
                    htmlFor=""
                  ></InputLabel>
                  <div>
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                    />
                  </div>
                </InputContainer>
              </Sectionlize>

              <InputContainer>
                <InputLabel htmlFor="email">Email address</InputLabel>
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email address"
                  />
                </div>
              </InputContainer>

              <InputContainer>
                <InputLabel htmlFor="phoneNumber">Phone number</InputLabel>
                <div>
                  <Input
                    type="text"
                    name="phoneNumber"
                    placeholder="080212..."
                  />
                </div>
              </InputContainer>
            </LeftSection>
            <RightSection>
              <SubTitle className="gap">Update password</SubTitle>
              <InputContainer>
                <InputLabel htmlFor="password">
                  Enter current password
                </InputLabel>
                <div>
                  <Input
                    type="password"
                    name="currentPassword"
                    placeholder="8+ characters required"
                  />
                </div>
              </InputContainer>

              <InputContainer>
                <InputLabel htmlFor="password">New Password</InputLabel>
                <div>
                  <Input
                    type="password"
                    name="newPassword"
                    placeholder="8+ characters required"
                  />
                </div>
              </InputContainer>

              <InputContainer>
                <InputLabel htmlFor="password">Confirm Password</InputLabel>
                <div>
                  <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="8+ characters required"
                  />
                </div>
              </InputContainer>
            </RightSection>
          </PersonalInfo>

          <LinkedAcct>
            <div>
              <SubTitle>Linked accounts</SubTitle>
              <p>
                We use this to let you sign in and fill your profile information
              </p>
            </div>

            <LinkedAcctBtn>
              <Button className="fb">
                {" "}
                <Image src={google} alt="google" />
                Connect to Google account
              </Button>
              <Button className="fb">
                {" "}
                <Image src={fb} alt="google" />
                Connect to facebook account
              </Button>
            </LinkedAcctBtn>
          </LinkedAcct>

          <LinkedAcct className="delete">
            <div>
              <SubTitle>Delete account?</SubTitle>
              <p>By deleting your account, you will lose all your data</p>
            </div>

            <div>
              <h4>Delete account</h4>
            </div>
          </LinkedAcct>

          <ButtonBox>
            <p>Clear</p>
            <Button>Save Changes</Button>
          </ButtonBox>
        </Form>
      </Layout>

      <BackdropContainer>
        <ModalContent>
          <ModalHeader>
            <h1>Log out</h1>
            <img src={cancel} alt="cancel" />
          </ModalHeader>
          <ModalBody>Are you sure you want to log out?</ModalBody>
          <ModalFooter>
            <p>Cancel</p>
            <button>Log out</button>
          </ModalFooter>
        </ModalContent>
      </BackdropContainer>
    </Container>
  );
}

export default Settings;

const Form = styled.form`
  background-color: white;
  border-radius: 10px;
  padding: 3em 2em 1.5em 2em;
  margin: 2em 0;

  @media only Screen and (max-width: 768px) {
    margin: 2em 0 1em 0;
    padding: 2em 1em;
  }
`;

const ProfilePix = styled.div`
  padding-bottom: 2em;
  border-bottom: 1px solid;
`;

const Propix = styled.div`
  margin-top: 2em;
  display: flex;
  justify-content: flex-start;
  gap: 2em;
  div {
    display: flex;
    gap: 2em;
    align-items: center;

    img {
      width: 3em;
      border-radius: 50%;
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

const PersonalInfo = styled.div`
  display: grid;
  grid-template-columns: 46% 46%;
  justify-content: space-between;
  padding: 2em 0;
  border-bottom: 1px solid;

  @media only Screen and (max-width: 768px) {
    display: block;
  }
`;

const LeftSection = styled.div`
  &.bloodgroup {
    display: grid;
    grid-template-columns: 45% 45%;
    justify-content: space-between;
    margin-bottom: 0em;
  }
  div {
    margin-bottom: 1.5em;
  }

  @media only Screen and (max-width: 768px) {
    margin-bottom: 1em;
  }
`;

const RightSection = styled.div`
  div {
    margin-bottom: 1.5em;
  }
`;

const Sectionlize = styled.div`
  display: grid;
  grid-template-columns: 45% 45%;
  justify-content: space-between;
  margin-bottom: 0em;
  //margin-bottom: 1.5em;
  div {
    margin-bottom: 0em;
  }

  @media only Screen and (max-width: 768px) {
    display: block;
  }
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

  @media only Screen and (max-width: 768px) {
    font-size: 1em;

    &.gap {
      margin-bottom: 0.5em;
    }
  }
`;
const LinkedAcct = styled.div`
  padding: 2em 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid;

  &.delete {
    align-items: flex-end;
    div {
      h4 {
        color: #ff3333;
        cursor: pointer;
        &:hover {
          opacity: 0.5;
        }
      }
    }
  }
  div {
    p {
      font-size: 14px;
      font-weight: 300;
    }
  }

  @media only Screen and (max-width: 768px) {
    display: block;
    padding: 1em 0;
    div:not(:last-child) {
      margin-bottom: 1em;
    }
    div {
      h4 {
        margin-top: 2em;
      }
    }
  }
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2em;
  padding: 2em 0em;

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

const LinkedAcctBtn = styled.div`
  display: grid;
  gap: 1.5em;
`;

const Image = styled.img`
  width: unset;
`;

export const BackdropContainer = styled.div`
  position: fixed;
  z-index: 1004;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: none; //flex to display
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 1em 1em 1em 1em;
  width: 30em;

  @media only Screen and (max-width: 768px) {
    margin: 0 1em;
    width: 25em;
  }
`;
export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  h1 {
    color: var(--grey);
  }
  img {
    width: 1.5em;
    height: 1.5em;
  }
`;
export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2em;
  padding-top: 1em;
  border-top: 1px solid #d5d5d5;
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

  button {
    font-size: 17px;
    padding: 0.8rem 1rem;
    border-radius: 10px;
    background-color: #ff3333;
    color: white;
    display: flex;
    align-items: center;
    gap: 1em;
    transition: all 0.2s;
  }
`;
export const ModalBody = styled.p`
  color: var(--grey);
  margin-top: 2em;
  margin-bottom: 5em;
`;
