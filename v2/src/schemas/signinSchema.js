import * as yup from "yup";

//const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup.string().min(5).required("Password is required"),
});

export const signupSchema = yup.object().shape({
  firstname: yup.string().required("First Name is required"),
  lastname: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup.string().min(5).required("Password is required"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const forgetPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

export const resetPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup.string().min(5).required("Password is required"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const questionaireSchema = yup.object().shape({
  purpose: yup.string().required("Required"),
  symptoms: yup.string().required("Required"),
  allergies: yup.string().required("Required"),
  medications: yup.string().required("Required"),
  others: yup.string().required("Required"),
});

export const updatePasswordSchema = yup.object().shape({
  old_password: yup.string().required("Password is required"),
  password: yup.string().min(5).required("Password is required"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const healthProfileSchema = yup.object().shape({
  occupation: yup.string().required("Required"),
  marital_status: yup.string().required("Required"),
  height: yup.string().required("Required"),
  weight: yup.string().required("Required"),
  genotype: yup.string().required("Required"),
  allergies: yup.string().required("Required"),
  medication: yup.string().required("Required"),
  medical_condition: yup.string().required("Required"),
  past_surgery: yup.string().required("Required"),
  past_medical_history: yup.string().required("Required"),
});

// password: yup
// .string()
// .min(5)
// .matches(passwordRules, { message: "Please create a stronger password" })
// .required("Password is required"),

// confirmPassword: yup
// .string()
// .oneOf([yup.ref("password"), null], "Passwords must match")
// .required("Confirm password is required"),
