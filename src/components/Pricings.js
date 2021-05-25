import React from "react";
import styled from "styled-components";
import MenuIcon from "@material-ui/icons/Menu";
import { connect } from "react-redux";
import { Containa, IconBox, Title, Margin, Button } from "./SelectAppointment";
import { Container, MainBody } from "./Appointments";
import SideBar from "./SideBar";

const PricePlan = ({ type, amount, session, select }) => {
  return (
    <Plan className={select ? select : ""}>
      <PlanType>{type}</PlanType>
      <Price>&#x20a6;{amount}</Price>
      <Valid>3 months validity</Valid>
      <Breaker></Breaker>
      <Session>{session} Sessions</Session>
      <Duration>30 minutes each</Duration>
      <SelectPlan>
        <Button className={select ? select : ""}>Select Plan</Button>
      </SelectPlan>
    </Plan>
  );
};

const PriceComponent = () => {
  return (
    <Containa>
      <Title>Choose your plan</Title>
      <PlanBox>
        <div>
          {" "}
          <PricePlan type={"Into"} amount={1000} session={2} />
        </div>
        <div>
          <PricePlan type={"Into"} amount={1000} session={2} />
        </div>
        <div>
          <PricePlan
            type={"Into"}
            amount={1000}
            session={2}
            select={"select"}
          />
        </div>
        <div>
          {" "}
          <PricePlan type={"Into"} amount={1000} session={2} />
        </div>
      </PlanBox>
    </Containa>
  );
};

function Pricings({ openSidebar }) {
  return (
    <Container sidebar={openSidebar}>
      <SideBar />
      <MainBody>
        <PriceComponent />
      </MainBody>
    </Container>
  );
}

const mapStateProps = (state) => ({
  openSidebar: state.utils.openSidebar,
});

export default Pricings = connect(mapStateProps)(Pricings);

const PlanBox = styled.div`
  margin: 2em auto;
  padding: 0 2em;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 2em;
  align-items: center;

  @media (max-width: ${500}px) {
       grid-template-columns: 1fr 1fr
    }
`;

export const Plan = styled.div`
  width: 12em;
  // height: 12em;
  border-radius: 20px;
  text-align: center;
  border: 1px solid #9c9c9c4a;
  padding: 1em 2em;
  background-color: white;
  margin: 2em 0;
  margin: 0 auto;
  box-shadow: 3px 4px 14px 12px #0000000d;
  -webkit-box-shadow: 3px 4px 14px 12px #0000000d;
  -moz-box-shadow: 3px 4px 14px 12px #0000000d;
  transition: all 0.3s;

  &:hover {
    width: 12.5em;
    padding: 1.5em 2.5em;
    cursor: pointer;
  }
  &.select {
    padding: 3em 2em;
  }
`;

const PlanType = styled.h4`
  margin-bottom: 1em;
`;
const Price = styled.h1``;
const Valid = styled.h6`
  margin-bottom: 3em;
  color: #949494ab;
  margin-top: -0.8em;
`;
const Breaker = styled(Margin)`
  background-color: #949494ab;
`;

const Session = styled.h5`
  margin-top: 2em;
`;
const Duration = styled.h6`
  font-size: 0.6em;
  margin-bottom: 4em;
  color: #949494ab;
`;
const SelectPlan = styled.div`
  font-size: 12px;
  padding-bottom: 1em;
  > button {
    padding: 0.7em 2em;
    background-color: white;
    color: #070647;
    border: 1px solid #070647;
    @media (max-width: ${500}px) {
       padding: 0.5em .5em;
       font-size: 10px;
    }
    &.select {
      background-color: #2fa5a9;
      color: #ffffffd6;
      border: 0;
    }
  }
`;
