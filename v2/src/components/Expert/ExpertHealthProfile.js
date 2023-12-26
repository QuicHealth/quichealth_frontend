import React, { useContext, useEffect } from "react";
import { Sidebar } from "../ViewProfile/ViewProfile";
import { Layout } from "./DashboardSection";
import { Container, Title } from "../Appointments/Appointmentlayout";
import styled from "styled-components";
import { ButtonBox } from "../HealthProfile/HealthProfile";
import { Button } from "../Settings/Settings";
import { SidebarCollapseContext } from "../../context/SidebarCollapseContext";

function ExpertHealthProfile() {
  const { collapse, setCollapse } = useContext(SidebarCollapseContext);
  useEffect(() => {
    setCollapse(false);
  }, []);
  return (
    <Container collapse={collapse}>
      <Sidebar></Sidebar>
      <Layout>
        <Title>Health Profile</Title>
        <Form>
          <InputContainer>
            <InputLabel>Hospital Affiliation</InputLabel>
            <div>
              <TextArea name="" placeholder="" />
            </div>
          </InputContainer>

          <InputContainer>
            <InputLabel>Bio</InputLabel>
            <div>
              <TextArea className="bio" name="" placeholder="" />
            </div>
          </InputContainer>

          <InputContainer>
            <InputLabel>Fee</InputLabel>
            <div>
              <TextArea className="" name="" placeholder="" />
            </div>
          </InputContainer>

          <ButtonBox>
            <p>Clear</p>
            <Button>Save Changes</Button>
          </ButtonBox>
        </Form>
      </Layout>
    </Container>
  );
}

export default ExpertHealthProfile;

const Form = styled.form`
  margin-top: 5em;
  background: white;
  padding: 2em;
  border-radius: 10px;
`;
const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3em;
  //align-items: center;
  div {
    width: 35em;
  }
`;
const InputLabel = styled.p`
  font-weight: 500;
  line-height: 21.6px;
  font-size: 16px;
`;
const TextArea = styled.textarea`
  height: 6em;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #d5d5d5;
  font-size: 13px;
  overflow: auto;
  outline: none;
  resize: none;
  padding: 1em;

  &.bio {
    height: 18em;
  }

  @media only Screen and (max-width: 768px) {
    display: block;
  }
`;
