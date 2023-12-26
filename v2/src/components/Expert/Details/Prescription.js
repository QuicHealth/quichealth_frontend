import React from "react";
import styled from "styled-components";
import { Title as T } from "../../Notifications/NotificationLayout";
import { useOutletContext, useParams } from "react-router-dom";
import { useGetEMR } from "../../../queries/useDashboard";
import { Spin } from "../../../utils/Spinners";

function Prescription() {
  const id = useParams().id;
  const { data, isLoading } = useGetEMR(id);


  // if (!prescriptions) return <div>Prescriptions not available</div>;
  return (
    <Container>
      {/* {isLoading && <Spin  />} */}
      <Diagnosis>
        <Title>Diagnosis</Title>
        <p>{data?.data?.diagnosis}</p>
      </Diagnosis>

      <Treatment>
        <Title>Treatment</Title>
        <p>{data?.data?.treatments}</p>
      </Treatment>
    </Container>
  );
}

export default Prescription;

const Container = styled.div`
  //background-color: var(--white);
  margin: 1em 0 3em 0;
`;

const Diagnosis = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 1.5em 1em 1.5em 1em;
  margin: 2em 0;
  padding: 1em;
  font-size: 15px;
  p {
    font-weight: 300;
    line-height: 21.6px;
  }
`;
const Treatment = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 1.5em 1em 1.5em 1em;
  margin: 2em 0;
  padding: 1em;
  font-size: 15px;

  p {
    font-weight: 300;
    line-height: 21.6px;
  }
`;

const Title = styled(T)`
  font-size: 1.4em;
  padding-left: 0;
  margin-bottom: 1em;
  color: var(--grey);
`;
