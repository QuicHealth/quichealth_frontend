import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  addAppointmentDetails,
  addPayment,
  createPatientAppointment,
  getDashboard,
} from "../redux/actions";
import useForm from "../utils/useForm";
import { userAuth } from "../Validations/UserValidation";
import { AppointmentContainer } from "./History";
import { ViewMore } from "./SelectAppointment";

export const Bot = ({ message }) => {
  return (
    <div>
      <BotChat>{message}</BotChat>
    </div>
  );
};

export const Patient = ({ message }) => {
  return (
    <PatientBox>
      <div></div>
      <Customer>{message}</Customer>
    </PatientBox>
  );
};

const ChatBot1 = () => {
  return (
    <>
      <ChatImg>
        <img src="./images/chatbot.png" alt="" />
      </ChatImg>
      <ChatBox>
        <Bot message={"Hi! I am Beatrice, QuicHealth assistant chatbot"} />
        <Bot message={"Kinndlt state what bring you to QuicHealth today?"} />
        <Patient message={"Severe Headache"} />
        <Bot message={"Kinndlt state what bring you to QuicHealth today?"} />
        <Patient message={"Severe Headache"} />
        <Bot message={"Kinndlt state what bring you to QuicHealth today?"} />
        <Patient message={"Severe Headache"} />
        <Bot message={"Kinndlt state what bring you to QuicHealth today?"} />
        <Patient message={"Severe Headache"} />
        <Bot message={"Kinndlt state what bring you to QuicHealth today?"} />
        <Patient message={"Severe Headache"} />
        <ViewMore>
          <Button>Book Appointment</Button>
        </ViewMore>
      </ChatBox>
    </>
  );
};

const ChatBot2 = () => {
  return <></>;
};

function ChatBot({
  addAppointmentDetails,
  appointmentId,
  userDetails,
  hospitalDetails,
  getDashboard
}) {
  const {
    values,
    errors,
    setErrors,
    setDisabledSubmit,
    handleChange,
    handleBlur,
    setValues,
    disabledSubmit,
    setIsSubmit,
  } = useForm("chatBot");

  //console.log(userDetails, hospitalDetails.hospital.settings.amount, "here");
  console.log(("https://quichealthapi.herokuapp.com/api/v1/appointment/details")=== ("https://quichealthapi.herokuapp.com/api/v1/appointment/details"))
  const bookAnAppointment = (e) => {
    e.preventDefault();
    const formError = userAuth(values);
    setErrors(formError);
    setDisabledSubmit(true);
    setIsSubmit(true);
    const noErrors = Object.keys(formError).length === 0;
    if (noErrors) {
      //registerUser(values);
      values.appointment_id = appointmentId;
      console.log(values);
      const paymentValue = {};
      paymentValue.appointment_id =appointmentId;
      paymentValue.amount = hospitalDetails?.hospital?.settings?.amount
      paymentValue.customerName = `${userDetails.firstname} ${userDetails.lastname}`
      paymentValue.customerEmail = userDetails.email
      paymentValue.paymentDescription = "Doctor Appointment"
      addAppointmentDetails(values, paymentValue);
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);
  return (
    <Container>
      <ChatBotForm>
        <InputContainer>
          <ChatBotLabel htmlFor="purpose">
            Kindly state what brings you to QuicHealth
            {errors.purpose && (
              <span className="purpose" style={{ color: "red" }}>
                *
              </span>
            )}
          </ChatBotLabel>
          <ChatBotInput
            border={errors.purpose && "1px solid red"}
            type="text"
            name="purpose"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.purpose}
            placeholder="input"
          />
          {errors.purpose && (
            <Error className="purpose" style={{ color: "red" }}>
              {errors.purpose}
            </Error>
          )}
        </InputContainer>

        <InputContainer>
          <ChatBotLabel htmlFor="length">
            How long has this been going on ?
            {errors.length && (
              <span className="purpose" style={{ color: "red" }}>
                *
              </span>
            )}
          </ChatBotLabel>
          <ChatBotInput
            border={errors.length && "1px solid red"}
            type="text"
            name="length"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="input"
          />
          {errors.length && (
            <Error className="purpose" style={{ color: "red" }}>
              {errors.length}
            </Error>
          )}
        </InputContainer>

        <InputContainer>
          <ChatBotLabel htmlFor="treatments">
            Have you started any treatment ?, If Yes, what treatment and for how
            long ?{" "}
            {errors.treatments && (
              <span className="purpose" style={{ color: "red" }}>
                *
              </span>
            )}
          </ChatBotLabel>
          <ChatBotInput
            border={errors.treatments && "1px solid red"}
            type="text"
            name="treatments"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="input"
          />
          {errors.treatments && (
            <Error className="purpose" style={{ color: "red" }}>
              {errors.treatments}
            </Error>
          )}
        </InputContainer>

        <InputContainer>
          <ChatBotLabel htmlFor="others">
            Is there anything else you’d like to share ?{" "}
            {errors.others && (
              <span className="purpose" style={{ color: "red" }}>
                *
              </span>
            )}
          </ChatBotLabel>
          <ChatBotInput
            border={errors.others && "1px solid red"}
            type="text"
            name="others"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="input"
          />
          {errors.others && (
            <Error className="purpose" style={{ color: "red" }}>
              {errors.others}
            </Error>
          )}
        </InputContainer>

        <ButtonBox>
          <Button disabled={disabledSubmit} onClick={bookAnAppointment}>
            Book Appointment
          </Button>
        </ButtonBox>
      </ChatBotForm>
    </Container>
  );
}

const mapStateProps = (state) => ({
  patientAppointmentValues: state.patient.patientAppointmentValues,
  appointmentId: state.patient.appointmentId,
  hospitalDetails: state.hospital.hospital,
  userDetails: state.patient.userDetails,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addAppointmentDetails: (value, paymentValue) => dispatch(addAppointmentDetails(value, paymentValue)),
    addPayment: (value) => dispatch(addPayment(value)),
    getDashboard: () => dispatch(getDashboard()),
  };
};

export default ChatBot = connect(mapStateProps, mapDispatchToProps)(ChatBot);

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 1em;
  padding: 2em;
  background-color: #f5f5f8;
  margin: 0 auto;
  margin-right: 0.5em;
  margin-left: 0.5em;
  //color:#070647;
  border-radius: 15px;
  @media (max-width: ${500}px) {
    padding: 2em 1em;
  }
`;

const ChatImg = styled.div`
  > img {
    width: 5em;
    @media (max-width: ${500}px) {
      width: 3em;
    }
  }
`;
const ChatBox = styled.div`
  > div > button {
    padding: 0.6em 2.5em;
    @media (max-width: ${500}px) {
      padding: 0.5em 1.3em;
    }
  }
`;
const BotChat = styled(AppointmentContainer)`
  display: grid;
  grid-template-columns: 1fr;
  width: fit-content;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  padding: 0.5em 4em;

  @media (max-width: ${500}px) {
    font-size: 13px;
    line-height: 19.5px;
    padding: 0.5em;
    //height: 4em;
  }
`;

const PatientBox = styled.span`
  display: grid;
  grid-template-columns: 10% 90%;
  justify-items: flex-end;
`;
const Customer = styled(BotChat)`
  float: right;
  border-top-left-radius: 10px;
  border-top-right-radius: 0px;
  background-color: #2fa4a9;
  color: white;
`;

const ChatBotForm = styled.form`
  margin: 3em auto;
  width: 85%;
  font-family: "Poppins", sans-serif;
`;

const ChatBotInput = styled.input`
  padding: 1.5em;
  font-size: 16px;
  border-radius: 5px;
  border: ${(props) => props.border || "1px solid bdbdbd"};
`;

const ChatBotLabel = styled.label`
  color: #333333;
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 0.2em;
`;

const InputContainer = styled.div`
  display: grid;
  margin-bottom: 1em;
`;

const ButtonBox = styled.div`
  width: 100%;
  margin: 5em auto;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  padding: 0.5em 1.5em;
  border-radius: 100px;
  background-color: #2fa5a9;
  color: #ffffffd6;
  text-align: center;
  outline: none;
  border: 0;
  font-weight: 600;
  font-size: 24px;
  border: 0;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    opacity: 0.6;
  }
`;

export const Error = styled.p`
  text-align: left;
  position: relative;
  left: 0.5em;
  top: 0.5em;
  font-size: 0.9em;
`;
