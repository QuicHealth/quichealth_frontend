import React, { createContext } from "react";

const GlobalContext = createContext({
  patientZoomDetails: {},
  setPatientZoomDetails: () => {},
  expertZoomDetails: {},
  setExpertZoomDetails: () => {},
  paymentDetails: [],
  setPaymentDetails: () => {},
  appointmentDetails: [],
  setAppointmentDetails: () => {},
  doctorDetails: [],
  setDoctorDetails: () => {},
  patientDetails: [],
  setPatientDetails: () => {},
  externalPaymentResponse: [],
  setExternalPaymentResponse: () => {},
});

export default GlobalContext;
