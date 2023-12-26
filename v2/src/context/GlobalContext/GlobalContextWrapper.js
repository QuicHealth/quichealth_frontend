import React, { useState } from "react";
import GlobalContext from "./GlobalContext";

function GlobalContextWrapper(props) {
  const [patientZoomDetails, setPatientZoomDetails] = useState([]);
  const [expertZoomDetails, setExpertZoomDetails] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [appointmentDetails, setAppointmentDetails] = useState([]);
  const [doctorDetails, setDoctorDetails] = useState([]);
  const [patientDetails, setPatientDetails] = useState([]);
  const [externalPaymentResponse, setExternalPaymentResponse] = useState([]);

  return (
    <GlobalContext.Provider
      value={{
        patientZoomDetails,
        setPatientZoomDetails,
        expertZoomDetails,
        setExpertZoomDetails,
        paymentDetails,
        setPaymentDetails,
        appointmentDetails,
        setAppointmentDetails,
        doctorDetails,
        setDoctorDetails,
        patientDetails,
        setPatientDetails,
        externalPaymentResponse,
        setExternalPaymentResponse
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextWrapper;
