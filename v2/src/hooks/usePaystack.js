import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePaystackPayment } from "react-paystack";
import { useVerifyPay } from "../queries/useAppointment";
import GlobalContext from "../context/GlobalContext/GlobalContext";

function usePaystack(patientDetails) {
  const navigate = useNavigate();
  const { verifyPays, isSuccess } = useVerifyPay();
  const { appointmentDetails } = useContext(GlobalContext);
  // paystack pays

  const handlePaystackSuccessAction = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference, "paystack refeence");
    let value = {};
    value = {
      ...value,
      amount: 100,
      charge_response_message: "Approved Successful",
      charged_amount: 100,
      currency: "NGN",
      customer: {
        user_id: patientDetails?.id,
        appointments_id: appointmentDetails?.id,
      },
      status: "completed",
      transaction_id: reference?.transaction,
      tx_ref: reference?.trxref,
      payment_gateway_type: "paystack",
    };
    verifyPays(value);
    console.log("navigate");
    navigate("/appointment-confirmed");
  };

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    navigate(".");
    // setModal(false);
    //return history.push("/select-appointment");
  };

  //   const [savePaymentValues, setSavePaymentValues] = useState();

  const config = {
    publicKey: process.env.REACT_APP_PAYSTACK_KEY,
    reference: new Date().getTime().toString(),
    amount: 100 * 100,
    email: patientDetails?.email,
  };

  console.log(config, "pautsack");

  const initializePayment = usePaystackPayment(config);

  function performPayAction() {
    initializePayment(handlePaystackSuccessAction, handlePaystackCloseAction);
  }
  return performPayAction;
}

export default usePaystack;
