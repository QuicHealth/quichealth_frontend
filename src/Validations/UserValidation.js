import * as yup from "yup";

export const userSchema = yup.object().shape({
  firstname: yup
    .string()
    .max(25, "Must be 25 characters or less")
    .required("First Name is required"),
  lastname: yup
    .string()
    .max(25, "Must be 25 characters or less")
    .required("Last Name is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  mobileNo: yup
    .string()
    .max(25, "Must be 25 characters or less")
    .required("Mobile Number is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .required("Confirm Password is required"),
  gender: yup.string().required("gender is required"),
  dob: yup.string().required("Dob is required"),
});

export const userAuth = (values) => {
  let errors = {};
  let isValid = true;

  //email check
  if (values.hasOwnProperty("email")) {
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Email is invalid";
    } else if (typeof values.email !== "string") {
      errors.email = "Email is must be characters";
    }
  }

  //Password check
  if (values.hasOwnProperty("password")) {
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 7) {
      errors.password = "Password must be at least 6 characters";
    }
  }

  //Password confirmation
  if (values.hasOwnProperty("confirmPassword")) {
    if (!values.confirmPassword) {
      errors.confirmPassword = "Password confirmation is required";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "password must match";
    }
  }

  //name check
  if (values.hasOwnProperty("firstname")) {
    if (!values.firstname) {
      errors.firstname = "Firstname is required";
    } else if (values.firstname.length > 26) {
      errors.firstname = "Must be 25 characters or less";
    } else if (typeof values.firstname !== "string") {
      errors.firstname = "Firstname must be characters";
    }
  }

  if (values.hasOwnProperty("lastname")) {
    if (!values.lastname) {
      errors.lastname = "Lastname is required";
    } else if (values.lastname.length > 26) {
      errors.lastname = "Must be 25 characters or less";
    }
  }

  if (values.hasOwnProperty("mobileNo")) {
    if (!values.mobileNo) {
      errors.mobileNo = "Mobile number is required";
    } else if (values.mobileNo.length < 3) {
      errors.mobileNo = "Must be at least 25 characters or less";
    }
  }

  if (values.hasOwnProperty("gender")) {
    if (!values.gender) {
      errors.gender = "Gender is required";
    }
  }

  if (values.hasOwnProperty("dob")) {
    if (!values.day || !values.month || !values.year) {
      errors.dob = "DOB is required";
    } else if (typeof values.dob !== "string") {
      errors.dob = "DOB must be characters";
    }
  }
  if (!values.day){
      errors.day = "day is required"
  }
  if (!values.month){
    errors.month = "month is required"
}
if (!values.year){
    errors.year = "year is required"
}

  return errors;
};
