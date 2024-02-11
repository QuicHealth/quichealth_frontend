import { userAuth } from "./../Validations/UserValidation";
import React, { useState } from "react";

const useForm = (formType, dbData) => {
  const genders = ["Male", "Female"];
  const maritalStatus = ["Single", "Married"];
  let INITIAL_STATE;
  INITIAL_STATE = {
    email: "",
    password: "",
  };
  if (!formType) {
    INITIAL_STATE = {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
      gender: "",
      day: "",
      month: "",
      year: "",
      dob: "",
    };
  }
  if (formType === "passwordreset") {
    INITIAL_STATE = {
      password: "",
      password_confirmation: "",
    };
  }
  if (formType === "newpasslink") {
    INITIAL_STATE = {
      email: "",
    };
  }
  if (formType === "time") {
    INITIAL_STATE = {
      slot1: "",
      slot2: "",
      slot3: "",
      slot4: "",
      slot5: "",
      slot6: "",
      slot7: "",
      slot8: "",
      slot9: "",
      slot10: "",
      slot11: "",
      slot12: "",
      slot13: "",
      slot14: "",
      slot15: "",
      slot16: "",
    };
  }

  if (formType === "chatBot") {
    INITIAL_STATE = {
      purpose: "",
      length: "",
      treatments: "",
      others: "",
    };
  }

  if (formType === "selectAppointment") {
    INITIAL_STATE = {
      location: "",
      date: "",
      personal: "",
    };
  }

  if (formType === "healthProfile") {
    INITIAL_STATE = {};
  }

  if (formType === "setting") {
    INITIAL_STATE = dbData;
  }
  if (formType === "emr") {
    INITIAL_STATE = {};
  }

  if (formType === "updateProfile") {
    INITIAL_STATE = {
      old_password: "",
      password: "",
      password_confirmation: "",
    };
  }

  const [values, setValues] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [disabledSubmit, setDisabledSubmit] = useState(false);

  const handleBlur = () => (isSubmit ? setErrors(userAuth(values)) : "");

  const handleChange = (event) => {
    if (isSubmit) {
      setErrors(userAuth(values));
    }
    setDisabledSubmit(false);
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return {
    values,
    errors,
    setErrors,
    setDisabledSubmit,
    handleChange,
    handleBlur,
    setValues,
    genders,
    maritalStatus,
    disabledSubmit,
    setIsSubmit,
  };
};

export default useForm;
