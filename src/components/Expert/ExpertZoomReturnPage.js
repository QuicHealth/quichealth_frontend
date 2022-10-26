import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { notShowSidebar } from "../../redux/actions";
import { Container, MainBody } from "../Appointments";
import SideBar from "../SideBar";
import { useHistory } from "react-router-dom";

function ExpertZoomReturnPage({ openSidebar, notShowSidebar }) {
  let history = useHistory();
  useEffect(() => {
    notShowSidebar();
  }, []);

  return (
    <Container sidebar={openSidebar}>
      <SideBar />
      <MainBody>
        <Backdrop>
          <EMRContainer>
            <EMRTitle>Your meeting has ended</EMRTitle>
            <EMRButtons>
              <Button onClick={() =>  history.push("/expert-overview")}>Go to Dashboard</Button>
              <Button onClick={() =>  history.push("/expert-emrPage")} className="emr">Review EMR Submission</Button>
            </EMRButtons>
          </EMRContainer>
        </Backdrop>
      </MainBody>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  openSidebar: state.utils.openSidebar,
});

const mapDispatchToProps = (dispatch) => {
  return {
    notShowSidebar: () => dispatch(notShowSidebar()),
  };
};

export default ExpertZoomReturnPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpertZoomReturnPage);

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
`;

const EMRContainer = styled.div`
  position: relative;
  width: 50%;
  border-radius: 10px;
  margin: 0 auto;
  z-index: 101;
  //right: 0em;
  top: 20em;
  padding: 1.5em;
  font-family: "Poppins", sans-serif !important;
`;

const EMRButtons = styled.div`
  width: 70%;
  margin: 3em auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const EMRTitle = styled.h3`
  color: #000000;
  font-size: 2.5em;
  position: relative;
  text-align: center;
`;

const Button = styled.h4`
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    opacity: 0.6;
  }

  &.emr {
    color: white;
    border-radius: 10px;
    padding: 1em;
    background-color: #2fa5a9;
  }
`;

const EMRBody = styled.div`
  margin-bottom: 2em;
`;
