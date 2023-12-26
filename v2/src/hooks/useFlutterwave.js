import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import GlobalContext from "../context/GlobalContext/GlobalContext";
import { useVerifyPay } from "../queries/useAppointment";

function useFlutterwavePay(patientDetails) {
  const navigate = useNavigate();
  const { appointmentDetails, setPaymentDetails } = useContext(GlobalContext);
  const { verifyPays } = useVerifyPay();

  const flutterConfig = {
    public_key: process.env.REACT_APP_FLUTTER_KEY,
    tx_ref: Date.now(),
    amount: 100,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: patientDetails?.email,
      phone_number: patientDetails?.phone,
      name: `${patientDetails?.firstname} ${patientDetails?.lastname}`,
    },
    customizations: {
      title: "My store",
      description: "Payment for Doctor's Appointment",
      logo: "./images/QuicHealth2.png",
    },
  };

  const handleFlutterPayment = useFlutterwave(flutterConfig);

 function performPayAction() {
    handleFlutterPayment({
      callback: async (response) => {
        console.log(response);
        setPaymentDetails(response);
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
          transaction_id: response.transaction_id,
          tx_ref: response?.tx_ref,
          payment_gateway_type: "flutterwave",
        };
        // setExternalPaymentResponse(value);

        console.log(value, "value");
        await verifyPays(value);
        // navigate(".");
        navigate("/appointment-confirmed");
        //window.location.reload();
        closePaymentModal();

        // this will close the modal programmatically
      },
      onClose: () => {
        navigate(".");
        //navigate("/appointment-confirmed");
        // history.push("/select-appointment");
      },
    });
  }

  return performPayAction;
}

export default useFlutterwavePay;
