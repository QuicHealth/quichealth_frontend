import axios from "axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { api, axiosPrivate } from "./axios";

export const API_CALL = async (
  method,
  endpoint,
  axiosPrivate,
  value = {},
  upload = false
) => {
  switch (method) {
    case "get":
      let response = "";
      response = await axiosPrivate.get(`/${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
        },
      });

      console.log(response, response.data, "response");
      if (response?.data?.status === false)
        throw new Error(response.data.message);
      return response?.data;

    case "post":
      let res = "";
      res = await axiosPrivate.post(`/${endpoint}`, value, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": upload ? "multipart/form-data" : "application/json",
        },
      });

      console.log(res, "posts");
      if (res.data?.status === false) throw new Error(res.data.message);
      return res?.data;

    default:
      break;
  }
};

export const dashboard = (axiosApi) => {
  return async () => {
    const response = await axiosApi.get("/get-dashboard", {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    console.log(response, "dashboard");
    if (!response.data.status) throw new Error(response.data.message);
    return response.data;
  };
};

export const appointment = async (axiosApi) => {
  return async () => {
    const response = await axiosApi.get("/appointments", {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });

    if (!response.data.status) throw new Error(response.data.message);
    return response.data;
  };
};

export const doctors = async (axiosPrivateApi) => {
  return async () => {
    const response = await axiosPrivateApi.get("get-doctors", {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });

    if (!response.data.status) throw new Error(response.data.message);
    return response.data;
  };
};

export const appointments = (axiosPrivateApi) => {
  return async () => {
    const response = await axiosPrivateApi.get("appointments", {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });

    if (!response.data.status) throw new Error(response.data.message);
    return response.data;
  };
};

export const paidAppointments = async (axiosPrivateAPI) => {
  return async () => {
    const response = await axiosPrivateAPI.get("appointment-by-payment-status", {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });

    if (!response.data.status) throw new Error(response.data.message);
    return response.data;
  };
};

export const doctorDetails = async (axiosPrivateAPI, id) => {
  return async () => {
    const response = await axiosPrivateAPI.get(`/get-doctor/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });

    if (!response.data.status) throw new Error(response.data.message);
    return response.data;
  };
};

export const createAppointment = async (axiosPrivateAPI, value) => {
  return async () => {
    const response = await axiosPrivateAPI.post(`/create-appointment`, value, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });

    if (!response.data.status) throw new Error(response.data.message);
    return response.data;
  };
};

export const verifyPay = async (axiosPrivateAPI, value) => {
  return async () => {
    const response = await axiosPrivateAPI.post(
      `/save_payment`,
      JSON.stringify(value),
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      }
    );

    if (!response.data.status) throw new Error(response.data.message);
    return response.data;
  };
};

export const getHistory = async (axiosPrivateAPI) => {
  return API_CALL("get", "history", axiosPrivateAPI);
};

export const getPatientNotifications = async (axiosPrivateAPI) => {
  return API_CALL("get", "notifications", axiosPrivateAPI);
};

export const getPatientHealthProfile = async (axiosPrivateAPI) => {
  return API_CALL("get", "get-health-profile", axiosPrivateAPI);
};

export const updateHealthProfile = async (axiosPrivateAPI, value) => {
  return API_CALL("post", "update-health-profile", value, axiosPrivateAPI);
};

export const getPatientSettings = async (axiosPrivateAPI) => {
  return API_CALL("get", "settings", axiosPrivateAPI);
};
export const updatePatientSettings = async (axiosPrivateAPI, value) => {
  return API_CALL("post", "settings", axiosPrivateAPI, value);
};

export const patientImageUpload = async (axiosPrivateAPI, value) => {
  return API_CALL("post", "upload_image", axiosPrivateAPI, value, true);
};

export const patientImageRemove = async (axiosPrivateAPI, value) => {
  return API_CALL("post", "remove_image", axiosPrivateAPI, value, true);
};

export const patientAppointmentDetails = async (axiosPrivateAPI, value) => {
  return API_CALL("post", "appointment/details", axiosPrivateAPI, value);
};

export const patientUpdatePassword = async (axiosPrivateAPI) => {
  return API_CALL("post", "update_password", axiosPrivateAPI);
};

// export const getHealthProfile = async () => {
//   const response = await api.get("/get-health-profile", {
//     headers: {
//       Authorization: `Bearer ${localStorage.token}`,
//     },
//   });

//   if (!response.data.status) throw new Error(response.data.message);
//   return response.data;
// };

// export const updateHealthProfile = async (value) => {
//   const response = await api.post("/get-health-profile", value, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.token}`,
//     },
//   });

//   if (!response.data.status) throw new Error(response.data.message);
//   return response.data;
// };

// export const getPatientNotifications = async () => {
//   const response = await api.get("/notifications", {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.token}`,
//     },
//   });

//   if (!response.data.status) throw new Error(response.data.message);
//   return response.data;
// };
