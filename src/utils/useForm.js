import React, {useState} from 'react';
import { userAuth } from "./../Validations/UserValidation";

const useForm = () => {
    const genders = ["Male", "Female"];
    const INITIAL_STATE = {
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
  
    return {values, errors, setErrors, setDisabledSubmit, handleChange, handleBlur, setValues, genders, disabledSubmit, setIsSubmit};
}

export default useForm;
  