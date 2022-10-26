import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { notShowSidebar } from "../../redux/actions";
import { Container, MainBody } from "../Appointments";
import SideBar from "../SideBar";

function ExpertZoomReturnPage({ openSidebar, notShowSidebar }) {
  useEffect(() => {
    notShowSidebar();
  }, []);

  return (
    <Container sidebar={openSidebar}>
      <SideBar />
      <MainBody>
        <Backdrop>
          <EMRContainer>
            <EMRForm>
              <EMRBody>
                <EMRType>Diagnosis</EMRType>
                <EMRInput></EMRInput>
              </EMRBody>

              <EMRBody>
                <EMRType>Treatment</EMRType>
                <EMRInput></EMRInput>
              </EMRBody>

              <EMRSubmit>
                <EMRButton> Done</EMRButton>
              </EMRSubmit>
            </EMRForm>
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
  background-color: rgba(0, 0, 0, 0.36);
  overflow: hidden;
  top: 0;
  left: 0;
`;

const EMRContainer = styled.div`
  background-color: #fff;
  position: relative;
  width: 50%;
  border-radius: 10px;
  margin: 0 auto;
  z-index: 101;
  //right: 0em;
  top: 10%;
  padding: 1.5em;
  font-family: "Inter", sans-serif !important;
`;

const EMRHead = styled.div`
  margin-top: 3em;
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }

  &img {
    height: 20px;
  }
`;
const EMRTitle = styled.h3`
  color: #000000;
  font-size: 1.2em;
  font-weight: bold;
  text-align: center;
  margin-left: 5em;
`;

const EMRForm = styled.form`
  margin-top: 3em;
`;

const EMRBody = styled.div`
  margin-bottom: 2em;
`;

const EMRType = styled.h3`
  font-size: 20px;
  margin-bottom: 1em;
  font-weight: bold;
`;

const EMRInput = styled.textarea`
  height: 13em;
  width: 100%;
  background-color: #f8f8f8;
  border-radius: 10px;
  border: 1px solid #B3B3B3;
  font-size: 16px;
  font-family: "Poppins", sans-serif !important;
  overflow: auto;
  outline: none;
  resize: none;
`;

const EMRSubmit = styled.div`
  margin-top: 3em;
  display: flex;
  justify-content: flex-end;
`;

const EMRButton = styled.span`
  color: white;
  background-color: #2fa5a9;
  border-radius: 7px;
  padding: 0.7em 2em;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;
