import React, { useEffect } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { usePaystackPayment } from "react-paystack";
import { useHistory } from "react-router-dom";
import {
  BackdropContainer,
  Body,
  Buttons,
  Icon,
  ModalButton,
  ModalContent,
  Title,
} from "../Modal";
import CancelIcon from "./../../Image/cancel.svg";

export function PaymentModal({ setModal, userDetails, hospitalDetails }) {
  let history = useHistory();

  const flutterConfig = {
    public_key: process.env.REACT_APP_FLUTTER_KEY,
    tx_ref: new Date().getTime().toString(),
    amount: hospitalDetails?.hospital?.settings?.amount || 100,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: userDetails?.email,
      phone_number: userDetails?.phone,
      name: `${userDetails.firstname} ${userDetails.lastname}`,
    },
    customizations: {
      title: "My store",
      description: "Payment for Doctor's Appointment",
      logo: "./images/QuicHealth2.png",
    },
  };

  //   const fwConfig = {
  //     ...config,
  //     text: "Pay with Flutterwave!",
  //     callback: (response) => {
  //       console.log(response, "fluteer");
  //       closePaymentModal(); // this will close the modal programmatically
  //     },
  //     onClose: () => {},
  //   };

  const handleFlutterPayment = useFlutterwave(flutterConfig);

  const handlePaystackSuccessAction = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
    history.push("/payment-confirm");
  };

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    setModal(false);
    //return history.push("/select-appointment");
  };

  const config = {
    publicKey: process.env.REACT_APP_PAYSTACK_KEY,
    reference: new Date().getTime().toString(),
    amount: hospitalDetails?.hospital?.settings?.amount || 100,
    email: userDetails?.email,
  };

  console.log(config);

  const initializePayment = usePaystackPayment(config);

  return (
    <BackdropContainer>
      <ModalContent className="payment">
        <Title>Choose a payment platform?</Title>
        <Body>Are you sure you want to book this doctor?</Body>
        <Buttons className="confirmation">
          <ModalButton
            onClick={(e) => {
              e.preventDefault();
              initializePayment(
                handlePaystackSuccessAction,
                handlePaystackCloseAction
              );
            }}
            className="cancel" 
          >
            PayStack
          </ModalButton>
          <ModalButton
            onClick={(e) => {
              e.preventDefault();
              handleFlutterPayment({
                callback: (response) => {
                  console.log(response);
                  // history.push("/payment-confirm");
                  closePaymentModal(); // this will close the modal programmatically
                },
                onClose: () => {
                  history.push("/select-appointment");
                },
              });
            }}
          >
            Flutterwave
          </ModalButton>
        </Buttons>
      </ModalContent>
    </BackdropContainer>
  );
}
