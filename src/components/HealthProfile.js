import React from "react";
import styled from "styled-components";
import SideBar from "./SideBar";
import { connect } from "react-redux";
import { Avatar } from "@material-ui/core";
import { Container, MainBody } from "./Appointments";
import { AnimateBtn } from "./LandingSection";

function HealthProfile({ openSidebar }) {
  return (
    <Container sidebar={openSidebar}>
      <SideBar />
      <MainBodys>
        <BodyHeading>
          <Avatar />
          <h3>Oluwatobi</h3>
        </BodyHeading>
        <ProfileSection>
          <SectionOne>
            <Left>
              <Genotype>Blood Group</Genotype>
              <GenotypeBox></GenotypeBox>
            </Left>
            <Right></Right>
          </SectionOne>
          <SectionTwo>
            <Left>
              <Genotype>Genotype</Genotype>
              <GenotypeBox></GenotypeBox>
            </Left>
            <Right></Right>
          </SectionTwo>

          <SectionThree>
            <FullLeft>
              <MaritalStatus>Marital Status?</MaritalStatus>
              <SelectBoxContainer>
                <SelectBox>
                  <input type="checkbox" />
                  <label htmlFor="single" style={{ padding: "0 .5em" }}>
                    single
                  </label>
                </SelectBox>
                <SelectBox>
                  <input type="checkbox" />
                  <label htmlFor="married" style={{ padding: "0 .5em" }}>
                    married
                  </label>
                </SelectBox>
                <SelectBox>
                  <input type="checkbox" />
                  <label htmlFor="divorced" style={{ padding: "0 .5em" }}>
                    divorced
                  </label>
                </SelectBox>
              </SelectBoxContainer>
            </FullLeft>
            <Right></Right>
          </SectionThree>

          <SectionFour>
            <InputTextLeft>
              <InputText>Are you currently taking any medication?</InputText>
              <Input type="text" placeholder="Type here..." />
            </InputTextLeft>
            <Right>
              <InputTextLeft>
                <InputText>Family Medical History</InputText>
                <Input type="text" placeholder="Type here..." />
              </InputTextLeft>
            </Right>
          </SectionFour>

          <SectionFour>
            <InputTextLeft>
              <InputText>Do you have any health condition ?</InputText>
              <Input type="text" placeholder="Type here..." />
            </InputTextLeft>
            <Right>
              <InputTextLeft>
                <InputText>Peculiar cases</InputText>
                <Input type="text" placeholder="Type here..." />
              </InputTextLeft>
            </Right>
          </SectionFour>
          <SectionFour>
            <InputTextLeft>
              <InputText>Any surgery?</InputText>
              <Input type="text" placeholder="Type here..." />
            </InputTextLeft>
            <Right>
              <InputTextLeft>
                <InputText>Do you have any allegies?</InputText>
                <Input type="text" placeholder="Type here..." />
              </InputTextLeft>
            </Right>
          </SectionFour>
          <SectionFour>
            <InputTextLeft>
              <InputText>Reactions to Allegies</InputText>
              <Input type="text" placeholder="Type here..." />
            </InputTextLeft>
            <Right>
              <InputTextLeft>
                <InputText>Post medical history</InputText>
                <Input type="text" placeholder="Type here..." />
              </InputTextLeft>
            </Right>
          </SectionFour>

          <SectionFour>
            <InputTextLeft>
              <InputText>Occupation</InputText>
              <Input type="text" placeholder="Type here..." />
            </InputTextLeft>
            <Right></Right>
          </SectionFour>

          <SectionFive>
            <Right>
              <SaveChanges>Save changes</SaveChanges>
            </Right>
          </SectionFive>
        </ProfileSection>
      </MainBodys>
    </Container>
  );
}

const mapStateProps = (state) => ({
  openSidebar: state.utils.openSidebar,
});

export default HealthProfile = connect(mapStateProps)(HealthProfile);

const MainBodys = styled(MainBody)`
  background-color: #fafafb;
  border-top-right-radius: 15px;
  margin-right: 0.7em;
  padding-top: 4em;
  padding: 4em 2em 0em 4em;
  //font-size: 1.1em;

  @media (max-width: ${850}px) {
    padding: 2em;
    // font-size: 13px;
  }
`;

const BodyHeading = styled.h2`
  color: #070647;
  padding: 1em 0em;
  display: flex;
  align-items: center;

  > h3 {
    font-size: 1.2em;
    margin-left: 0.6em;
    font-weight: 800;
  }
  .MuiAvatar-colorDefault {
    color: #747474;
    width: 3em;
    height: 3em;
  }
`;
const ProfileSection = styled.form`
  margin-top: 1em;
  border-top: 4px solid #070647;
  margin-right: 4em;
  width: 45em;
  font-size: 1.1.em;
  padding-top: 1.5em;
  @media (max-width: ${1000}px) {
    width: 100%;
    font-size: 13px;
  }
  @media (max-width: ${650}px) {
    width: 100%;
    font-size: 10px;
  }
`;
const SectionOne = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`;
const SectionTwo = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  margin-top: 1.5em;
`;
const SectionThree = styled(SectionTwo)`
  grid-template-columns: 65% 35%;
  @media (max-width: ${850}px) {
    grid-template-columns: 100%;
  }
`;

const Left = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${500}px) {
    width: 10em;
  }
`;
export const Right = styled.div`
  padding-left: 4em;
  @media (max-width: ${1000}px) {
    padding-left: 1em;
  }
  @media (max-width: ${850}px) {
    margin-top: 0.5em;
    padding-left: 0;
  }
`;
const FullLeft = styled.div`
  width: 25em;
  display: grid;
  grid-template-columns: 30% 70%;
  align-items: center;
  @media (max-width: ${1000}px) {
    display: block;
  }
`;

const Genotype = styled.p`
  font-weight: 600;
`;
const GenotypeBox = styled.span`
  width: 3em;
  height: 2em;
  border: 1px solid #78e2e6;
`;
const MaritalStatus = styled(Genotype)`
  width: 15em;
`;
const SelectBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-left: 1em;
  align-items: center;
  @media (max-width: ${1000}px) {
    padding-left: 0;
    //display: block;
    //justify-content: flex-start;
  }
`;
const SelectBoxContainer = styled(Left)`
  width: 100%;
  @media (max-width: ${1000}px) {
    width: 100%;
    font-size: 12px;
    padding-left: 0;
    align-items: center;
    //display: block;
    justify-content: flex-start;
  }
`;

const SectionFour = styled(SectionOne)`
  margin-top: 2em;
  grid-template-columns: 60% 40%;

  @media (max-width: ${850}px) {
    grid-template-columns: 100%;
  }
`;

const InputTextLeft = styled.div``;

const InputText = styled.p`
  font-weight: 600;
  font-size:1.1.em;
`;
const Input = styled.input`
  height: 2em;
  width: 17em;
  font-size:1.1em;
  outline: none;
  border: 1px solid #070647;
  padding-left: 0.5em;

  ::placeholder {
    color: #bdbdbe;
  }
`;

export const SectionFive = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 2em 0 3em 0;

  @media (max-width: ${850}px) {
    display: block;
  }
`;

export const SaveChanges = styled.div`
  background-color: #2fa5a9;
  color: #fff;
  border-radius: 10px;
  text-align: center;
  width: 11em;
  padding: 0.5em;
  box-shadow: 2px 3px #2e302f4a;
  animation: ${AnimateBtn} 2s 2s ease backwards;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
  @media (max-width: ${900}px) {
    font-size: 0.9em;
  }
`;
