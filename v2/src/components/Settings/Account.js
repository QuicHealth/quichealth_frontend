import React, { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import Add from "@material-ui/icons/AddOutlined";
import { Field, Form, Formik } from "formik";
import { InputContainer, InputLabel } from "../HealthProfile/HealthProfile";
import propix from "./../../assets/propix.png";
import fb from "./../../assets/FB.svg";
import google from "./../../assets/google.svg";
import CustomInput from "../../utils/CustomInput";
import { useImageRemove, useImageUpload } from "../../queries/useAppointment";
import { Spin } from "../../utils/Spinners";

function Account() {
  const { patientSettings, loading, expert } = useOutletContext();
  const { ImageUploads, isLoading } = useImageUpload(expert);
  const { ImageRemoves, isLoading: removeImgLoading } = useImageRemove(expert);
  const imageUploadRef = useRef();
  const [imageValue, setImageValue] = useState({});
  const [imageUpload, setImageUpload] = useState({});
  const initValues = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  };

  const initialValues =
    !loading && patientSettings ? patientSettings : initValues;

  const handleUpload = (e) => {
    setImageUpload(e.target.files[0]);
    setImageValue(URL.createObjectURL(e.target.files[0]));
  };

  const uploadImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", imageUpload);

    if (imageUpload?.name) {
      ImageUploads(formData);
    }
  };

  const removeImage = (e) => {
    e.preventDefault();
    const value = {
      image: "",
    };

    console.log(value, "hjsd");
    ImageRemoves(value);
  };

  const onSubmit = (values, actions) => {
    console.log(values, "valuesSetig");
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Forms>
          <ProfilePix>
            <SubTitle>Profile photo</SubTitle>
            <Propix>
              <Avatar>
                {(isLoading || removeImgLoading) && <Spin />}
                <input
                  type="file"
                  onChange={handleUpload}
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={imageUploadRef}
                />
                <AddButton onClick={() => imageUploadRef.current?.click()}>
                  <Add />
                </AddButton>
                {!!initialValues?.image || imageValue?.length > 1 ? (
                  <Image
                    className="profile"
                    src={initialValues?.image || imageValue}
                  />
                ) : (
                  ""
                )}
              </Avatar>

              <div>
                <Button onClick={uploadImage} className="upload">
                  Upload
                </Button>
                <Button onClick={removeImage} className="remove">
                  Remove
                </Button>
              </div>
            </Propix>
          </ProfilePix>

          <PersonalInfo>
            <LeftSection>
              <SubTitle className="gap">Personal info</SubTitle>
              <Sectionlize>
                <InputContainer className="bloodgroup">
                  <InputLabel htmlFor="fullName">Full Name</InputLabel>
                  <CustomInput
                    specific={true}
                    text="text"
                    name="firstname"
                    placeholder="First Name"
                  />
                </InputContainer>

                <InputContainer>
                  <InputLabel
                    style={{ color: "transparent" }}
                    htmlFor="lastname"
                  >
                    Last Name
                  </InputLabel>
                  <CustomInput
                    specific={true}
                    text="text"
                    name="lastname"
                    placeholder="Last Name"
                  />
                </InputContainer>
              </Sectionlize>

              <InputContainer>
                <CustomInput
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="Email address"
                />
              </InputContainer>

              <InputContainer>
                <CustomInput
                  label="Phone Number"
                  name="phone"
                  type="text"
                  placeholder="080212..."
                />
              </InputContainer>
            </LeftSection>
            <RightSection></RightSection>
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
        </Forms>
      )}
    </Formik>
  );
}

export default Account;

const Forms = styled(Form)`
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

const AddButton = styled.span`
  position: absolute;
  // left: 19.5em;
  transition: all 0.5s ease-in;
  cursor: pointer;

  > .MuiSvgIcon-root {
    fill: #ffffffd1;
    font-size: 3em;
  }
  :hover {
    opacity: 0.6;
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
  &.profile {
    width: 6em;
    border-radius: 50%;
  }
`;
