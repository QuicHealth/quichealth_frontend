import React, { useEffect } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { BackdropContainer, ModalContent } from "../../../v1/src/components/Modal";

function PaymentModal({ setModal, userDetails, hospitalDetails }) {
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

  const handleFlutterPayment = useFlutterwave(flutterConfig);

  return <BackdropContainer>
    <ModalContent>
        
    </ModalContent>
  </BackdropContainer>;
}

export default PaymentModal;
