import * as actionTypes from "./../actionTypes";
import { api } from "./axios";
import { toast } from "react-toastify";
import { createMeeting } from "./DoctorActions";

//Notification call
export const getNotifications = () => async (dispatch) => {
  try {
    let response = await api.get("api/v1/notifications", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    });

    dispatch({
      type: actionTypes.NOTIFICATIONS,
      payload: response.data.data,
    });
  } catch (error) {
    if (!error.response) {
      return toast.error(error.msg);
    }
    toast.error(error.response.data.msg);
  }
};

//getAllPaidAppointments
export const getAllPaidAppointments = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.IS_LOADING,
    });
    let response = await api.get("api/v1/appointment-by-payment-status", {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    console.log(response, "appointment");
    dispatch({
      type: actionTypes.GET_PAID_APPOINTMENT_DETAILS,
      payload: response.data.Appointments,
    });
    dispatch({
      type: actionTypes.GET_ALL_PAID_APPOINTMENT_DETAILS,
      payload: response.data.Appointments,
    });
    return dispatch({
      type: actionTypes.NOT_LOADING,
    });
  } catch (error) {
    console.log(error.message);
    if (!error.response) {
      return toast.error(error.msg);
    }
    toast.error(error.response.data.msg);
    return dispatch({
      type: actionTypes.NOT_LOADING,
    });
  }
};

// Setting
export const getSettings = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.IS_LOADING,
    });
    let response = await api.get("/api/v1/settings", {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });

    console.log(response, "settingS");
    dispatch({
      type: actionTypes.PATIENT_SETTINGS,
      payload: response.data,
    });
    return dispatch({
      type: actionTypes.NOT_LOADING,
    });
  } catch (error) {
    console.log(error.message);
    if (!error.response) {
      return toast.error(error.msg);
    }
    toast.error(error.response.data.msg);
    return dispatch({
      type: actionTypes.NOT_LOADING,
    });
  }
};

//updateSetting
export const updateSettings = (value) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.IS_LOADING,
    });
    let response = await api.post("/api/v1/settings", value, {
      headers: {
        Authorization: `Bearer ${localStorage.token} `,
      },
    });
    console.log(response, "updateSettings");
    dispatch(getSettings());
    return dispatch({
      type: actionTypes.NOT_LOADING,
    });
  } catch (error) {
    if (!error.response) {
      return toast.error(error.msg);
    }
    toast.error(error.response.data.msg);
    return dispatch({
      type: actionTypes.NOT_LOADING,
    });
  }
};

//Get Health Profile
export const getHealthProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.IS_LOADING,
    });
    let response = await api.get("/api/v1/get-health-profile", {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });

    console.log(response, "healthProfile");
    dispatch({
      type: actionTypes.GET_HEALTH_PROFILE,
      payload: response.data.data,
    });

    return dispatch({
      type: actionTypes.NOT_LOADING,
    });
  } catch (error) {
    if (!error.response) {
      return toast.error(error.msg);
    }
    toast.error(error.response.data.msg);
    return dispatch({
      type: actionTypes.NOT_LOADING,
    });
  }
};

//upDate Health Profile
export const updateHealthProfile = (value) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.IS_LOADING,
    });
    let response = await api.post("/api/v1/update-health-profile", value, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });

    console.log(response, "healthProfile");
    dispatch(getHealthProfile());
    dispatch({
      type: actionTypes.NOT_LOADING,
    });
    response.data.status
      ? toast.success("Health Profile update was successful")
      : toast.error(response.data.message);
  } catch (error) {
    if (!error.response) {
      return toast.error(error.msg);
    }
    toast.error(error.response.data.msg);
    return dispatch({
      type: actionTypes.NOT_LOADING,
    });
  }
};

//refresh Oauth zoom token
export const refreshOauthToken = (value) => async (dispatch) => {
    try {
      await api.post("/api/v1/refresh-token", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      dispatch(createMeeting(value));
    } catch (error) {
      console.log(error.message);
      if (!error.response) {
        return toast.error(error.msg);
      }
      toast.error(error.response.data.msg);
    }
  };
  
  //get zoom meeting details
  export const getPatientZoomMeeting = () => async (dispatch) => {
    try {
      let response = await api.get("api/v1/get-zoom-meetings", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      console.log(
        response.data.data[response.data.data.length - 1].start_url.length,
        response.data.data[response.data.data.length - 1].start_url.slice(
          42,
          428
        ),
        "response"
      );
      dispatch({
        type: actionTypes.GET_PATIENT_MEETING_DETAILS,
        payload: response.data.data[response.data.data.length - 1],
      });
    } catch (error) {
      console.log(error.message);
      if (!error.response) {
        return toast.error(error.msg);
      }
      toast.error(error.response.data.msg);
    }
  };
  
  // create patient appointment
  export const createPatientAppointment = (value) => async (dispatch) => {
    try {
      let response = await api.post("api/v1/create-appointment", value, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
  
      if (!response.data.status) {
        return toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
        dispatch({
          type: actionTypes.SET_APPOINTMENT_ID,
          payload: response.data,
        });
      }
    } catch (error) {
      if (!error.response) {
        return toast.error(error.msg);
      }
      return toast.error(error.response.data.message);
    }
  };
  
  // create appointment details
  export const addAppointmentDetails =
    (value, paymentValue) => async (dispatch) => {
      //console.log(paymentValue, value)
      dispatch({
        type: actionTypes.REMOVE_CREATED_APPOINTMENT,
      });
      try {
        let response = await api.post("/api/v1/appointment/details", value, {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        });
        response.data.status
          ? toast.success(response.data.message)
          : toast.error(response.data.message);
        console.log(response, "apaDetails");
        dispatch(addPayment(paymentValue));
      } catch (error) {
        console.log(error.message);
        if (!error.response) {
          return toast.error(error.msg);
        }
        return toast.error(error.response.data.message);
      }
    };
  
  //Create Payment details
  export const addPayment = (value) => async (dispatch) => {
    console.log(value, "pays");
    try {
      let response = await api.post("api/v1/payment", value, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
  
      console.log(response, "payment");
      //history.push(response.data.data.link);
      window.location.assign(response.data.data.link);
    } catch (error) {
      console.log(error.message);
      if (!error.response) {
        return toast.error(error.msg);
      }
      toast.error(error.response.data.msg);
    }
  };
  export const setPatientBookValues = (value) => (dispatch) => {
    return dispatch({
      type: actionTypes.SET_PATIENT_BOOK_VALUES,
      payload: value,
    });
  };
  
