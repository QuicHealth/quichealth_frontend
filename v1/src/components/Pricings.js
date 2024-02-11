import React, { useState } from "react";
import styled from "styled-components";
import MenuIcon from "@material-ui/icons/Menu";
import { connect } from "react-redux";
import { Containa, IconBox, Title, Margin, Button } from "./SelectAppointment";
import { Container, MainBody } from "./Appointments";
import SideBar from "./SideBar";
import { ProfileImage } from "./Overview";
import { useHistory } from "react-router-dom";

const payPlans = [
  {
    type: "Intro",
    amount: 1000,
    session: 2,
    select: "",
  },
  {
    type: "Basic",
    amount: 2000,
    session: 4,
    select: "",
  },
  {
    type: "Standard",
    amount: 4000,
    session: 8,
    select: "",
  },
  {
    type: "Premuim",
    amount: 5500,
    session: 12,
    select: "",
  },
];

const PricePlan = ({
  type,
  amount,
  session,
  select,
  getSelectedPlan,
  plans,
  setPlans,
  id,
  plan,
}) => {
  return (
    <Plan className={select ? select : ""}>
      <PlanType>{type}</PlanType>
      <Price>&#x20a6;{amount}</Price>
      <Valid>3 months validity</Valid>
      <Breaker></Breaker>
      <Session>{session} Sessions</Session>
      <Duration>30 minutes each</Duration>
      <SelectPlan>
        <Button
          className={select ? select : ""}
          onClick={() => getSelectedPlan(plans, setPlans, plan, id)}
        >
          Select Plan
        </Button>
      </SelectPlan>
    </Plan>
  );
};

const PriceComponent = ({ getSelectedPlan, payPlans }) => {
  const [plans, setPlans] = useState(payPlans);
  return (
    <Containa className="pricing">
      <Title className="pricing">Choose your preferred price plan</Title>
      <PlanBox>
        {plans.map((plan, id) => (
          <div
            key={id}
            //onClick={() => getSelectedPlan(plans, setPlans, plan, id)}
          >
            <PricePlan
              id={id}
              type={plan.type}
              amount={plan.amount}
              session={plan.session}
              select={plan.select}
              getSelectedPlan={getSelectedPlan}
              setPlans={setPlans}
              plans={plans}
              plan={plan}
            />
          </div>
        ))}
      </PlanBox>
    </Containa>
  );
};

function Pricings({ openSidebar }) {
  let routerHistory = useHistory();
  const getSelectedPlan = (array, setArray, object, index) => {
    const newArray = array.map((item, id) => {
      return { ...item, select: "" };
    });
    const selectedObject = { ...object, select: "select" };

    newArray[index] = selectedObject;
    setArray(newArray);
    console.log(selectedObject);

    routerHistory.push("/select-appointment");
  };
  return (
    <Container sidebar={openSidebar}>
      <SideBar />
      <MainBody>
        <ProfileImage>
          <img
            src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg"
            alt=""
          />
        </ProfileImage>
        <PriceComponent getSelectedPlan={getSelectedPlan} payPlans={payPlans} />
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
    grid-template-columns: 100%;
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
    @media (max-width: ${500}px) {
      padding: 1em 2em;
    }
  }
  @media (max-width: ${500}px) {
    margin-bottom: 1.3em;
    width: 19em;
    &:hover {
      width: 19.5em;
    }
  }
`;

const PlanType = styled.h4`
  margin-bottom: 1em;
  @media (max-width: ${500}px) {
    font-size: 13px;
  }
`;
const Price = styled.h1`
  @media (max-width: ${500}px) {
    font-size: 3.5em;
  }
`;
const Valid = styled.h6`
  margin-bottom: 1em;
  color: #949494ab;
  margin-top: -0.8em;
  @media (max-width: ${500}px) {
    font-size: 12px;
    //margin-top: 0;
  }
`;
const Breaker = styled(Margin)`
  background-color: #949494ab;
`;

const Session = styled.h5`
  margin-top: 1em;
  @media (max-width: ${500}px) {
    font-size: 12px;
  }
`;
const Duration = styled.h6`
  font-size: 0.6em;
  margin-bottom: 4em;
  color: #949494ab;
  @media (max-width: ${500}px) {
    font-size: 12px;
    margin-bottom: 2em;
  }
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
      //padding:  .5em;
      font-size: 12px;
      width: 100%;
    }
    &.select {
      background-color: #2fa5a9;
      color: #ffffffd6;
      border: 0;
      @media (max-width: ${500}px) {
        background-color: #070647;
      }
    }
  }
`;
