import React, { useState } from "react";
import styled from "styled-components";
import {
  Container,
  Layout,
  Subtitle,
  Title,
} from "../Notifications/NotificationLayout";
import { Field, Form, Formik } from "formik";
import {
  useGetHealthProfile,
  useUpdateHealthProfile,
} from "../../queries/useAppointment";
import CustomInput, { CustomTextArea } from "../../utils/CustomInput";
import { Spin } from "../../utils/Spinners";

function HealthProfile() {
  const { data, isLoading } = useGetHealthProfile();
  const { updateHealthProfiles, isLoading: isSubmitting } =
    useUpdateHealthProfile();
  const initValue = {
    blood_group: "",
    Occupation: "",
    martial_status: "",
    height: "",
    weight: "",
    genotype: "",
    allergies: "",
    medication: "",
    health_condition: "",
    family_medical_history: "",
    past_medical_history: "",
  };
  console.log(data, "datas");
  const initialValues = !isLoading && data?.data ? data?.data : initValue;

  const onSubmit = (values, actions) => {
    console.log(values, "here");
    updateHealthProfiles(values);
    // actions.resetForm();
  };

  if (isLoading) return <Spin />;

  return (
    <Container>
      {(isLoading || isSubmitting) && <Spin />}
      <div></div>
      <Layout>
        <Title>Health Profile</Title>
        <Subtitle>
          A complete and accurate medical history is important for our
          healthcare professionals to ensure they have the information they need
          to assess your condition and provide appropriate care.
        </Subtitle>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({}) => (
            <Forms>
              <LeftSection>
                <InputContainer>
                  <LeftSection>
                    <InputLabel htmlFor="occupation">Occupation</InputLabel>
                    <CustomInput
                      specific={true}
                      type="text"
                      name="Occupation"
                      placeholder="Occupation"
                    />
                  </LeftSection>
                </InputContainer>

                <InputContainer>
                  <InputLabel htmlFor="maritalStatus">
                    Marital Status
                  </InputLabel>
                  <CustomInput
                    specific={true}
                    type="text"
                    name="martial_status"
                    placeholder="Marital Status"
                  />
                </InputContainer>

                <Sectionlize>
                  <InputContainer>
                    <CustomInput
                      label="Height"
                      name="height"
                      type="text"
                      placeholder="Height"
                    />
                  </InputContainer>

                  <InputContainer>
                    <CustomInput
                      label="Weight"
                      name="weight"
                      type="text"
                      placeholder="Weight"
                    />
                  </InputContainer>
                </Sectionlize>

                <InputContainer>
                  <LeftSection className="bloodgroup">
                    <div>
                      <InputLabel htmlFor="bloodgroup">Blood Group</InputLabel>
                      <CustomInput
                        specific={true}
                        type="text"
                        name="blood_group"
                        placeholder=""
                      />
                    </div>

                    <div>
                      <InputLabel htmlFor="genotype">Genotype</InputLabel>
                      <CustomInput
                        specific={true}
                        type="text"
                        name="genotype"
                        placeholder=""
                      />
                    </div>
                  </LeftSection>
                </InputContainer>
              </LeftSection>

              <RightSection>
                <InputContainer>
                  <RightSection>
                    <InputLabel htmlFor="allergies">
                      Reaction to an allergies?
                    </InputLabel>
                    <div>
                      <CustomInput
                        specific={true}
                        className="notmobile"
                        type="text"
                        name="allergies"
                        placeholder="Share if any"
                      />
                      <CustomTextArea
                        name="allergies"
                        className="healthProfile"
                        placeholder="Share if any"
                      />
                    </div>
                  </RightSection>
                </InputContainer>

                <InputContainer>
                  <InputLabel htmlFor="medication">
                    Are you currently taking any medications?
                  </InputLabel>
                  <div>
                    <CustomInput
                      specific={true}
                      className="notmobile"
                      type="text"
                      name="medication"
                      placeholder="Share if any"
                    />
                    <CustomTextArea
                      name="medication"
                      className="healthProfile"
                      placeholder="Share if any"
                    />
                  </div>
                </InputContainer>

                <InputContainer>
                  <InputLabel htmlFor="medicalCondition">
                    Any medical condition within the last 12 months??
                  </InputLabel>
                  <div>
                    <CustomInput
                      specific={true}
                      className="notmobile"
                      type="text"
                      name="health_condition"
                      placeholder="Share if any"
                    />
                    <CustomTextArea
                      name="health_condition"
                      className="healthProfile"
                      placeholder="Share if any"
                    />
                  </div>
                </InputContainer>

                <InputContainer>
                  <InputLabel htmlFor="pastSurgery">Past surgery?</InputLabel>
                  <div>
                    <CustomInput
                      specific={true}
                      className="notmobile"
                      type="text"
                      name="past_surgery"
                      placeholder="Share if any"
                    />
                    <CustomTextArea
                      name="past_surgery"
                      className="healthProfile"
                      placeholder="Share if any"
                    />
                  </div>
                </InputContainer>

                <InputContainer>
                  <InputLabel htmlFor="medicalRecord">
                    Family Medical Record?
                  </InputLabel>
                  <div>
                    <CustomInput
                      specific={true}
                      className="notmobile"
                      type="text"
                      name="family_medical_history"
                      placeholder="Share if any"
                    />
                    <CustomTextArea
                      name="family_medical_history"
                      className="healthProfile"
                      placeholder="Share if any"
                    />
                  </div>
                </InputContainer>
              </RightSection>

              <LeftSection></LeftSection>
              <RightSection>
                <ButtonBox>
                  <p>Clear</p>
                  <Button disabled={isSubmitting} type="submit">
                    Save Changes
                  </Button>
                </ButtonBox>
              </RightSection>
            </Forms>
          )}
        </Formik>
      </Layout>
    </Container>
  );
}

export default HealthProfile;

const Forms = styled(Form)`
  background-color: white;
  border-radius: 10px;
  padding: 3em 2em 1.5em 2em;
  margin-bottom: 2em;

  display: grid;
  grid-template-columns: 46% 46%;
  justify-content: space-between;

  @media only Screen and (max-width: 768px) {
    display: block;
    margin-bottom: 1em;
  }

  @media only Screen and (max-width: 768px) {
    padding: 1em 1em 1.5em 1em;
  }
`;
export const InputContainer = styled.div`
  margin-bottom: 3em;

  @media only Screen and (max-width: 768px) {
    margin-bottom: 1.5em;
  }
`;

const LeftSection = styled.div`
  &.bloodgroup {
    display: grid;
    grid-template-columns: 40% 40%;
    justify-content: space-between;
    margin-bottom: 0em;
  }

  @media only Screen and (max-width: 768px) {
    margin-bottom: 1em;
  }
`;

const RightSection = styled.div``;

const Sectionlize = styled.div`
  display: block;
  @media only Screen and (max-width: 768px) {
    display: grid;
    grid-template-columns: 40% 40%;
    justify-content: space-between;
    margin-bottom: 0em;
  }
`;

export const InputLabel = styled.label`
  color: var(--grey);
  font-weight: 500;

  @media only Screen and (max-width: 500px) {
    font-size: 14px;
    // padding: 1em;
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

const TextArea = styled.textarea`
  display: none;
  @media only Screen and (max-width: 768px) {
    display: block;
  }
  height: 8em;
  width: 100%;
  margin-top: 0.5em;
  border-radius: 8px;
  border: 1px solid #d5d5d5;
  font-size: 13px;
  overflow: auto;
  outline: none;
  resize: none;
  padding: 1em;
`;

export const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2em;
  padding: 2em 0em;

  p {
    transition: all 0.2s;

    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
    &:focus {
      transform: scale(0.9);
    }
  }
  @media only Screen and (max-width: 768px) {
    font-size: 13px;
    padding: 1rem 0rem;
  }
`;

export const Button = styled.button`
  font-size: 15px;
  padding: 0.8rem 2rem;
  border-radius: 10px;
  background-color: var(--lightGreen);
  color: var(--white);
  //border: 1px solid var(--lightGreen);
  transition: all 0.2s;

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
  }
`;
