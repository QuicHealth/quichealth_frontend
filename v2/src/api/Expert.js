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

export const getAppointmentsDetails = async (axiosPrivateAPI, appointment_id) => {
  return API_CALL("get", `doctor/get/appointment/details/${appointment_id}`, axiosPrivateAPI);
};

export const getExpertNotifications = async (axiosPrivateAPI) => {
  return API_CALL("get", `doctor/notifications`, axiosPrivateAPI);
};
export const getExpertHistory = async (axiosPrivateAPI) => {
  return API_CALL("get", `doctor/get-history`, axiosPrivateAPI);
};

export const getExpertSetting = async (axiosPrivateAPI) => {
  return API_CALL("get", `doctor/settings`, axiosPrivateAPI);
};

export const updateExpertSetting = async (axiosPrivateAPI,value) => {
  return API_CALL("post", `doctor/settings`,axiosPrivateAPI, value);
};

export const expertImageUpload = async (axiosPrivateAPI,value) => {
  return API_CALL("post", "doctor/upload_image",axiosPrivateAPI, value, true);
};

export const expertImageRemove = async (axiosPrivateAPI,value) => {
  return API_CALL("post", "doctor/remove_image",axiosPrivateAPI, value, true);
};

export const setAvailability = async (axiosPrivateAPI, value) => {
  return async () => {
    if (value.lastSlot)
      return API_CALL("post", "doctor/save-schedule", axiosPrivateAPI, value);
    API_CALL("post", "doctor/save-schedule", axiosPrivateAPI, value);
    //return API_CALL("post", "doctor/save-schedule", value);
  };
};

export const addEMR = async (axiosPrivate, value) => {
  return async () => {
    return API_CALL("post", "/doctor/add-emr", axiosPrivate, value);
  };
};

export const getEMR = async (axiosPrivate, appointment_id) => {
  return API_CALL("get", `doctor/get-emr/${appointment_id}`, axiosPrivate);
};

export const getPatientAppDetailsByDoctor = async (axiosPrivate,appointment_id) => {
  return API_CALL("get", `doctor/find-appointment/${appointment_id}`, axiosPrivate);
};
