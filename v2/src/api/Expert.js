import { API_CALL } from "./Patient";
import { api } from "./axios";

export const expertDashboard = (axiosPrivateApi) => {
  return async () => {
    const response = await axiosPrivateApi.get("/doctor/get-dashboard", {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    //   console.log(response, "dashboard");
    if (!response.data.status) throw new Error(response.data.message);
    return response.data;
  };
};

export const getPaidAppointments = async (axiosPrivateApi) => {
  return API_CALL(
    "get",
    "doctor/appointment-by-payment-status",
    axiosPrivateApi
  );
};

export const getAppointmentsDetails = async (appointment_id) => {
  return API_CALL("get", `doctor/get/appointment/details/${appointment_id}`);
};

export const getExpertNotifications = async () => {
  return API_CALL("get", `doctor/notifications`);
};
export const getExpertHistory = async () => {
  return API_CALL("get", `doctor/get-history`);
};

export const getExpertSetting = async () => {
  return API_CALL("get", `doctor/settings`);
};

export const updateExpertSetting = async (value) => {
  return API_CALL("post", `doctor/settings`, value);
};

export const expertImageUpload = async (value) => {
  return API_CALL("post", "doctor/upload_image", value, true);
};

export const expertImageRemove = async (value) => {
  return API_CALL("post", "doctor/remove_image", value, true);
};

export const setAvailability = async (value) => {
  if (value.lastSlot) return API_CALL("post", "doctor/save-schedule", value);
  API_CALL("post", "doctor/save-schedule", value);
  //return API_CALL("post", "doctor/save-schedule", value);
};

export const addEMR = async (value) => {
  return API_CALL("post", "/doctor/add-emr", value);
};

export const getEMR = async (appointment_id) => {
  return API_CALL("get", `doctor/get-emr/${appointment_id}`);
};

export const getPatientAppDetailsByDoctor = async (appointment_id) => {
  return API_CALL("get", `doctor/find-appointment/${appointment_id}`);
};
