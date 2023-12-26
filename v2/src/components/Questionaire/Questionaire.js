import React, { useContext, useEffect, useState } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { usePaystackPayment } from "react-paystack";
import styled from "styled-components";
import { Field, Form, Formik } from "formik";
import { Container } from "../BookAppointment/BookAppointment";
import { Sidebar } from "../ViewProfile/ViewProfile";
import { Layout } from "../Notifications/NotificationLayout";
import { Back } from "../History/HistoryDetails";
import { Link } from "react-router-dom";
import back from "./../../assets/backArrow.svg";
import apppx from "./../../assets/apppx.png";
import { useNavigate } from "react-router-dom";
import { SidebarCollapseContext } from "../../context/SidebarCollapseContext";
import { usePatientAppointmentDetails } from "../../queries/useAppointment";
import { CustomTextArea } from "../../utils/CustomInput";
import { questionaireSchema } from "../../schemas/signinSchema";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
import AvatarImage from "../../utils/AvatarImage";
import { addAMPMToTime, formatDate } from "../../utils/MonthAndDate";

function Questionaire() {
  const navigate = useNavigate();
  const { collapse, setCollapse } = useContext(SidebarCollapseContext);
  const { appointmentDetails, patientDetails } = useContext(GlobalContext);
  const [modal, setModal] = useState(false);

  const initialValues = {
    purpose: "",
    symptoms: "",
    allergies: "",
    medications: "",
    others: "",
  };
  // const { verifyPays } = useVerifyPay();
  const { PatientAppDetails, isLoading, isSuccess } =
    usePatientAppointmentDetails(patientDetails, "paystack");

  const appointment = appointmentDetails;

  console.log(appointmentDetails, patientDetails, "app");

  const onSubmit = async (values, actions) => {
    //e.preventDefault();

    const appointmentDetailsValues = {
      ...values,
      appointment_id: appointment?.id,
    };
    await PatientAppDetails(appointmentDetailsValues);
  };

  useEffect(() => {
    setCollapse(true);
  }, []);

  return (
    <Container collapse={collapse} className="viewprofile">
      <Sidebar></Sidebar>
      <Layout className="question">
        <Link to="..">
          <Back className="viewprofile" onClick={() => navigate(-1)}>
            <img src={back} alt="back" />
            <p>Back</p>
          </Back>
        </Link>

        <QuestionContainer>
          <Title>Questionaire</Title>
          <Subtitle>
            Your answers will help the doctor assess your condition and provide
            appropriate care.
          </Subtitle>
        </QuestionContainer>

        <InputProfile>
          <ProfileDetails>
            <Profile>
              {" "}
              {appointmentDetails?.doctor?.profile_pic_link ? (
                <img
                  src={appointmentDetails?.doctor?.profile_pic_link}
                  alt="pix"
                />
              ) : (
                <AvatarImage name={appointmentDetails?.doctor?.name} />
              )}
              <NameSection>
                <p className="nomobile">{appointmentDetails?.doctor?.name}</p>
                <p className="nomobile">
                  {appointmentDetails?.doctor?.specialty}
                </p>
              </NameSection>
            </Profile>
            <DateTime>
              <p>{formatDate(appointmentDetails?.date)}</p>
              <p>{addAMPMToTime(appointmentDetails?.start)}</p>
            </DateTime>
          </ProfileDetails>
          <Formik
            initialValues={initialValues}
            validationSchema={questionaireSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Forms>
                <InputContainer>
                  <CustomTextArea
                    label=" What brings you to QuicHealth today?"
                    name="purpose"
                  />
                </InputContainer>

                <InputContainer>
                  <CustomTextArea
                    label="What are your current symptoms? When did they start, and how
                    severe are they?"
                    name="symptoms"
                  />
                </InputContainer>

                <InputContainer>
                  <CustomTextArea
                    label="Do you have any allergies or chronic conditions? If so,
                    please describe."
                    name="allergies"
                  />
                </InputContainer>

                <InputContainer>
                  <CustomTextArea
                    label="Are you taking any medications. If yes, What is it?"
                    name="medications"
                  />
                </InputContainer>

                <InputContainer>
                  <CustomTextArea
                    label=" Anything else you’d like to share?."
                    name="others"
                  />
                </InputContainer>
                <Button type="submit">Proceed to Payment</Button>
              </Forms>
            )}
          </Formik>
        </InputProfile>
      </Layout>
    </Container>
  );
}

export default Questionaire;

const QuestionContainer = styled.div`
  margin: 2em 7em;
  @media only Screen and (max-width: 768px) {
    margin: 2em 1em;
    /* padding-bottom: 1em; */
  }
`;
const Title = styled.h1`
  color: var(--darkGreen);
  margin-bottom: 1em;
  @media only Screen and (max-width: 768px) {
    font-size: 1.5em;
    /* padding-bottom: 1em; */
  }
`;
const Subtitle = styled.p`
  color: var(--grey);
  line-height: 21.6px;

  @media only Screen and (max-width: 768px) {
    font-size: 15px;
    /* padding-bottom: 1em; */
  }
`;

const ProfileDetails = styled.div`
  display: grid;
  grid-template-columns: 50% 45%;
  color: #595959;
  align-items: center;
  //padding: 1.5em 1em 1.5em 1em;
  border-bottom: 1px solid #d5d5d5;
  margin-bottom: 2em;
  padding: 2em 0;
  font-size: 15px;

  p {
    text-align: center;

    &.nomobile {
      @media only Screen and (max-width: 768px) {
        //display: none;
      }
    }
  }

  @media only Screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* padding-bottom: 1em; */
  }
`;

const InputProfile = styled.div`
  background-color: white;
  margin: 0 7em;
  border-radius: 10px;
  padding: 1em;

  @media only Screen and (max-width: 768px) {
    margin: 0 1em;
    /* padding-bottom: 1em; */
  }
`;

const Profile = styled.div`
  display: grid;
  grid-template-columns: 12% auto;
  -webkit-box-align: center;
  align-items: center;
  /* justify-content: flex-start; */
  padding-left: 1em;

  img {
    width: 3em;
  }
  div {
    padding-left: 1em;
  }

  @media only Screen and (max-width: 768px) {
    padding-left: 0em;
    grid-template-columns: 20% auto;
    margin-bottom: 0.5em;
    /* padding-bottom: 1em; */
  }
`;
const NameSection = styled.div`
  display: flex;
  justify-content: space-around;

  @media only Screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;

    p:last-child {
      margin-top: 0.4em;
      font-size: 13px;
      font-weight: 300;
    }
  }
`;
const DateTime = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-around;

  @media only Screen and (max-width: 768px) {
    font-size: 14px;
    font-weight: 300;

    p:first-child {
      margin-right: 0.5em;
      background-color: transparent;
      position: relative;
      border-right: 1px solid;
      padding-right: 0.7em;
      /* &::after {
        content: "";
        padding-left: 0.12em;
        margin-left: 1.3em;
        height: 1em;
       // width: 1px;
        background-color: var(--grey);
        display: inline-block;
        position: relative;
      } */
    }
  }
`;

const Forms = styled(Form)`
  // padding: 1em;
`;

const InputContainer = styled.div`
  margin-bottom: 2em;

  @media only Screen and (max-width: 768px) {
    margin-bottom: 1.5em;
  }
`;

const InputLabel = styled.label`
  color: var(--grey);
  font-weight: 500;

  @media only Screen and (max-width: 760px) {
    font-size: 13px;
  }
`;

const TextArea = styled.textarea`
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

  @media only Screen and (max-width: 768px) {
    display: block;
  }
`;

const Button = styled.button`
  font-size: 15px;
  padding: 0.8rem 2rem;
  border-radius: 7px;
  background-color: var(--lightGreen);
  color: var(--white);
  //border: 1px solid var(--lightGreen);
  transition: all 0.2s;
  width: 15em;
  margin: 5em auto;
  display: flex;
  justify-content: center;
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
