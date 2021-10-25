import { userAuth } from "./../Validations/UserValidation";
import React ,{useState} from "react"

const useForm = (formType) => {
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

  if (formType === "schedule"){
    INITIAL_STATE = {
      
    }
  }

  if (formType === "selectAppointment") {
    INITIAL_STATE = {
      location: "",
      date: "",
      personal: "",
    };
  }

  if (formType === "healthProfile") {
    INITIAL_STATE = {
      bloodGroup: "",
      genotype: "",
      medication: "",
      medicalHistory: "",
      maritalStatus: "",
      healthCondition: "",
      peculiarCase: "",
      pastSurgery: "",
      allegies: "",
      occupation: "",
      postMedicalHistory: "",
    };
  }

  if (formType === "setting") {
    INITIAL_STATE = {
      email: "",
      phoneNumber: "",
      address: "",
      dob: "",
      city: "",
      gender: "",
      emergencyNumber: "",
    };
  }

  if (formType === "updateProfile") {
    INITIAL_STATE = {
      firstName: "",
      lastName: "",
      currentPassword: "",
      newPassword: "",
      passwordConfirmation: "",
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
