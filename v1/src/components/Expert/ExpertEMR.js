import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { notShowSidebar } from "../../redux/actions";
import { updateEMR } from "../../redux/actions/DoctorActions";
import useForm from "../../utils/useForm";
import { userAuth } from "../../Validations/UserValidation";
import { Container, MainBody } from "../Appointments";
import { Text } from "../RegisterBody";
import SideBar from "../SideBar";

function ExpertZoomReturnPage({
  openSidebar,
  notShowSidebar,
  patientEMR,
  updateEMR,
}) {
  const {
    handleChange,
    values,
    errors,
    disabledSubmit,
    setDisabledSubmit,
    setIsSubmit,
    setErrors,
    setValues,
  } = useForm("emr");
  let history = useHistory();
  console.log(disabledSubmit, "ddfd");

  const Submit = (e) => {
    e.preventDefault();

    const formError = userAuth(values, true);
    setErrors(formError);
    setDisabledSubmit(true);
    setIsSubmit(true);

    console.log(formError, "here");
    console.log(
      formError,
      "diagnosis" in formError || "treatments" in formError,
      "here"
    );
    const noErrors = Object.keys(formError).length === 0;

    const emrValues = {};
    console.log(noErrors, errors, emrValues, "emr");

    if (noErrors) {
      emrValues.diagnosis = values.diagnosis;
      emrValues.treatments = values.treatments;
      console.log(noErrors, emrValues, "emr");
      updateEMR(emrValues);
      history.push("/expert-zoomReturn");
    }
    //setValues({});
  };

  useEffect(() => {
    notShowSidebar();
  }, []);

  useEffect(() => {
    setValues(patientEMR);
  }, [patientEMR]);

  return (
    <Container sidebar={openSidebar}>
      <SideBar />
      <MainBody>
        <Backdrop>
          <EMRContainer>
            <EMRForm>
              <EMRBody>
                <EMRType>Diagnosis</EMRType>
                <EMRInput
                  value={values?.diagnosis}
                  border={errors?.diagnosis && "1px solid red"}
                  name="diagnosis"
                  onChange={handleChange}
                />
                {errors?.diagnosis && (
                  <Text color="red">{errors?.diagnosis}</Text>
                )}
              </EMRBody>

              <EMRBody>
                <EMRType>Treatment</EMRType>
                <EMRInput
                  value={values?.treatments}
                  name="treatments"
                  border={errors?.treatment && "1px solid red"}
                  onChange={handleChange}
                />
                {errors?.treatment && (
                  <Text color="red">{errors?.treatment}</Text>
                )}
              </EMRBody>

              <EMRSubmit>
                <EMRButton disabled={disabledSubmit} onClick={Submit}>
                  {" "}
                  Done
                </EMRButton>
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
  patientEMR: state.hospital.patientEMR,
});

const mapDispatchToProps = (dispatch) => {
  return {
    notShowSidebar: () => dispatch(notShowSidebar()),
    updateEMR: (value) => dispatch(updateEMR(value)),
  };
};

export default ExpertZoomReturnPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpertZoomReturnPage);

export const Backdrop = styled.div`
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
  width: 35em;
  border-radius: 10px;
  margin: 0 auto;
  z-index: 101;
  //right: 0em;
  top: 20%;
  padding: 1.5em;
  font-family: "Inter", sans-serif !important;
`;

const EMRHead = styled.div`
  margin-top: 2em;
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
  margin-top: 2em;
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
  height: 8em;
  width: 100%;
  background-color: #f8f8f8;
  border-radius: 5px;
  border: 1px solid #b3b3b3;
  font-size: 16px;
  font-family: "Poppins", sans-serif !important;
  overflow: auto;
  outline: none;
  resize: none;
  padding: 1em;
`;

const EMRSubmit = styled.div`
  margin-top: 3em;
  display: flex;
  justify-content: flex-end;
`;

const EMRButton = styled.button`
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
