import { API_CALL } from "./Patient";
import { api } from "./axios";

export const signIn = async (values) => {
  const response = !values?.googleAuth
    ? await api.post("/login", values)
    : await api.post("/authenicateWithGoogle", values);
  if (!response.data.status) throw new Error(response.data.message);
  return response.data;
};

export const ESignIn = async (values) => {
  const response = await api.post("doctor/doctor-login", values);
  if (!response.data.status) throw new Error(response.data.message);
  return response.data;
};

export const Signup = async (values) => {
  const response = await api.post("/register", values);
  if (!response.data.status) throw new Error(response.data.message);
  return response.data;
};

export const GoogleSignin = async (values) => {
  return API_CALL("post", "authenicateWithGoogle", values);
};
