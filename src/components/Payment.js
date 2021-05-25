import React from "react";
import styled from "styled-components";
import MenuIcon from "@material-ui/icons/Menu";
import { connect } from "react-redux";
import LockIcon from "@material-ui/icons/LockOutlined";
import { Plan } from "./Pricings";
import SideBar from "./SideBar";
import {
  Containa,
  IconBox,
  DocAppointment,
  ViewMore,
  Margin,
  Button,
} from "./SelectAppointment";
import {
  InputNameContainer,
  Input,
  InputLabel,
  InputTypeBox,
} from "./RegisterBody";
import { Container, MainBody } from "./Appointments";

export const PaymentDetail = ({ bold, left, right }) => {
  return (
    <PDetailBox className={bold ? bold : ""}>
      <Left>{left}</Left>
      <Left>{right}</Left>
    </PDetailBox>
  );
};

export const PaySys = ({ name, amount, total }) => {
  return (
    <Pay>
      <DocAppointment name={name} NoIcon={true} />
      <br />
      <Margin />
      <PaymentDetail left={"Service fee"} right={amount} />
      <Margin />
      <PaymentDetail bold="bold" left="Total" right={total} />
    </Pay>
  );
};

export const Lock = () => {
  return (
    <Warning>
      <p>
        If you can’t make your appointment, you will need to cancel or
        reschedule at least 2 hours in advance of your appointment start time to
        avoid a fee.
      </p>
      <p>
        <LockIcon />
        QuicHealth is secure & your details are protected
      </p>
    </Warning>
  );
};

const PaymentComponent = () => {
  return (
    <Containers>
      <div>
        <PaySys name="Dr Alice Walton" amount="N2000" total="N2000" />

        <Paymnt>Enter payment details</Paymnt>
        <PImg>
          <img src="./images/cards.svg" alt="" />
        </PImg>

        <Form>
          <InputNameContainer>
            <Input type="text" placeholder="Card Number" />
          </InputNameContainer>
          <br />
          <InputLabel htmlFor="Dob"> Expiry Date </InputLabel>
          <InputTypeBox
            style={{ gridTemplateColumns: "1fr 1fr 1fr", columnGap: "1em" }}
          >
            <Input type="text" placeholder="MM" />
            <Input type="text" placeholder="YY" />
            <Input type="text" placeholder="CVV" />
          </InputTypeBox>

          <ViewMore>
            <Button>Book Appointment</Button>
          </ViewMore>
        </Form>

        <Lock />
      </div>
    </Containers>
  );
};

function Payment({ openSidebar }) {
  return (
    <Container sidebar={openSidebar}>
      <SideBar />
      <MainBody>
        <PaymentComponent />
      </MainBody>
    </Container>
  );
}

const mapStateProps = (state) => ({
  openSidebar: state.utils.openSidebar,
});

export default Payment = connect(mapStateProps)(Payment);

export const Containers = styled(Containa)`
  display: grid;
  grid-template-columns: 1fr;
  width: 50em;
  margin: 0 auto;
  font-size: 1.3em;

  @media (max-width: ${500}px) {
    grid-template-columns: 1fr;
    font-size: 13px;
    width: 100%;
  }
`;

const Pay = styled(Plan)`
  width: 30em;
  height: 20em;
  padding: 2em 4em;
  margin: 0 auto;
  text-align: left;
  background-color: #fefeff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  >div>div> img {
    width: 5em;
    height: 5.5em;
    margin-right: 1em;
  }
  @media (max-width: ${500}px) {
    //padding: 0em;
    width: 100%;
  }
  &:hover {
    width: 30em;
    cursor: default;
    padding: 2em 4em;
  }
  > div {
    justify-content: flex-start;
  }
`;

const PDetailBox = styled.span`
  display: flex;
  justify-content: space-between;
  padding: 0.5em 1em;
  color: #000;

  &.bold {
    font-weight: bold;
  }
`;

const Left = styled.p`
  font-size: 1.3em;
`;

const Paymnt = styled.p`
  //font-size: .2em;
  font-weight: bold;
  text-align: center;
  color: #000000;
  margin-top: 2em;
`;

const PImg = styled.div`
  display: grid;
  justify-content: space-around;
  margin-top: 0.8em;
`;

const Form = styled.form`
  width: 20em;
  margin: 0 auto;
  margin-top: 4em;
  padding: 0;

  div > input {
    border: 0;
    border-bottom: 1px solid #2fa5a9;
    border-radius: 0;
    /* text-align: left; */
    width: 100%;
    background-color: inherit;
  }
  > label {
    font-size: .7em;
    color: #a4a4a4;
    margin-bottom: -0.2em;
    font-weight: 200;
    @media (max-width: ${700}px) {
      //font-size: .7em;
    }
  }
`;

const Warning = styled.div`
  //position: absolute;
  bottom: 0;
  @media (max-width: ${500}px) {
    left: 1em;
  }
  > p {
    font-size: 11px;
    color: #000;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: ${500}px) {
      font-size: 6px;
    }

    > .MuiSvgIcon-root {
      font-size: 1.3em;
    }
  }
`;
