import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import MenuIcon from "@material-ui/icons/Menu";
import { IconBox, Title } from "./SelectAppointment";
import { Containers, Lock, PaySys } from "./Payment";
import CheckedIcon from "@material-ui/icons/CheckCircle";
import { Container, MainBody } from "./Appointments";
import SideBar from "./SideBar";
import { ProfileImage } from "./Overview";

const BookedComponent = () => {
  return (
    <Containers>
      <BookContainer>
        <PaySys name="Dr Alice Walton" />
        <TitleBox>
          <Title>
            <CheckedIcon />
          </Title>
          <Title>Appointment Booked</Title>
        </TitleBox>
        <br />

        <LockBox>
          <Lock />
        </LockBox>
      </BookContainer>
    </Containers>
  );
};
function Booked({ openSidebar }) {
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
        <BookedComponent />
      </MainBody>
    </Container>
  );
}

const mapStateProps = (state) => ({
  openSidebar: state.utils.openSidebar,
});

export default Booked = connect(mapStateProps)(Booked);

const BookContainer = styled.div`
  display: grid;
  justify-content: space-around;
  align-items: center;

  @media (max-width: ${500}px) {
    display: flex;
    flex-direction: column-reverse;
    position: relative;
    left: -1em;
  }
`;

const LockBox = styled.div`
  //margin-top:5em;
  @media (max-width: ${500}px) {
    display: none;
  }
`;

const TitleBox = styled.div`
  margin-top: 3em;
  > h2 {
    @media (max-width: ${500}px) {
      font-size: 30px;
      line-height: 45px;
    }
    .MuiSvgIcon-root {
      font-size: 4em;
      fill: #4bd37b;
    }
  }
`;
