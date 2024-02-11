import * as actionTypes from "./../actionTypes";
import { api } from "./axios";
import { toast } from "react-toastify";
import { getHospitalByUniqueId } from "./HospitalActions";

export const getDoctorNotifications = () => async (dispatch) => {
  try {
    let response = await api.get("api/v1/doctor/notifications", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    });

    console.log(response);

    dispatch({
      type: actionTypes.DOCTOR_NOTIFICATIONS,
      payload: response.data.data,
    });
  } catch (error) {
    if (!error.response) {
      return toast.error(error.msg);
    }
    toast.error(error.response.data.msg);
  }
};

//get all doctor paid appointment
export const getAllDoctorPaidAppointments = () => async (dispatch) => {
  try {
    let response = await api.get(
      "api/v1/doctor/appointment-by-payment-status",
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      }
    );
    console.log(response, "dappointment");
    dispatch({
      type: actionTypes.GET_PAID_DOCTOR_APPOINTMENT_DETAILS,
      payload: response.data.Appointments,
    });
    dispatch({
      type: actionTypes.GET_ALL_DOCTOR_PAID_APPOINTMENT_DETAILS,
      payload: response.data.Appointments,
    });
  } catch (error) {
    console.log(error.message);
    if (!error.response) {
      return toast.error(error.msg);
    }
    toast.error(error.response.data.msg);
  }
};

//getall zoom meeting by doctor
//doctor/get-zoom-meetings
export const getAllDoctorZoomMeeting = () => async (dispatch) => {
  try {
    let response = await api.get(`api/v1/doctor/get-zoom-meetings`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });

    const doctorLatestZoomApp =
      response.data.data[response.data.data.length - 1];

    console.log(doctorLatestZoomApp, "meetingDo");
    localStorage.setItem("patientAppId", doctorLatestZoomApp.appointment_id);
    dispatch({
      type: actionTypes.GET_DOCTOR_MEETING_DETAILS,
      payload: doctorLatestZoomApp,
    });
  } catch (error) {
    console.log(error.message);
    if (!error.response) {
      return toast.error(error.msg);
    }
    toast.error(error.response.data.msg);
  }
};

//Get Doctors by ID
export const getDoctorById = (id) => async (dispatch) => {
  try {
    let response = await api.get(`api/v1/get-doctor/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    console.log(response, "doctor");
    dispatch({
      type: actionTypes.GET_DOCTOR_BY_ID,
      payload: response.data.doctor,
    });
    dispatch({
      type: actionTypes.GET_HOSPITAL_UNIQUE_ID,
      payload: response.data.doctor,
    });
    const uniqueId = response.data.doctor.hospital.unique_id;
    dispatch(getHospitalByUniqueId(uniqueId));
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

//Experts and Doctors means the same thing
// Expert Settings

export const getExpertSettings = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.IS_LOADING,
    });
    let response = await api.get("/api/v1/doctor/settings", {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    console.log(response, "expertSettings");
    dispatch({
      type: actionTypes.GET_EXPERT_SETTINGS,
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

//updateExpertSetting
export const updateExpertSettings = (value) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.IS_LOADING,
    });
    let response = await api.post("/api/v1/doctor/settings", value, {
      headers: {
        Authorization: `Bearer ${localStorage.token} `,
      },
    });
    console.log(response, "upexpertSettings");
    response.data.status
      ? toast.success("Settings updated successfully")
      : toast.error("Setting not updated, try again");
    dispatch(getExpertSettings());
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

//Update EMR
export const updateEMR = (value) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.IS_LOADING,
    });

    console.log(value);

    const response = await api.post(
      `/api/v1/doctor/update-emr/${localStorage.patientAppId}`,
      value,
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      }
    );
    console.log(response, "updatedEMR");
    response.data.status
      ? toast.success(response.data.message)
      : toast.error("Something went wrong, try again");
    return dispatch({
      type: actionTypes.NOT_LOADING,
    });
  } catch (error) {
    if (!error.response) {
      return toast.error(error.msg);
    }
    toast.error(error.response.data.message);
    return dispatch({
      type: actionTypes.NOT_LOADING,
    });
  }
};

//create zoom meeting
export const createMeeting = (value) => async (dispatch) => {
  try {
    let response = await api.post("/api/v1/create-zoom-meeting", value, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });

    console.log(response, "createMetting");
  } catch (error) {
    console.log(error.message);
    if (!error.response) {
      return toast.error(error.msg);
    }
    toast.error(error.response.data.msg);
  }
};

//get zoom meeting details
export const getDoctorZoomMeeting = () => async (dispatch) => {
  try {
    let response = await api.get("api/v1/doctor/get-zoom-meetings", {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });

    dispatch({
      type: actionTypes.GET_DOCTOR_MEETING_DETAILS,
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

//EMR API

//Add EMR

export const addEmr = async (e) => {
  try {
    e.preventDefault();
    const diagnosis = document.getElementById("diagnosis").value;
    const treatment = document.getElementById("treatment").value;

    await api.post(
      "api/v1/payment",
      { diagnosis, treatment },
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      }
    );
  } catch (error) {}
};

// EMR
//Get EMR by Id
export const getEMR = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.IS_LOADING,
    });

    const response = await api.get(
      `/api/v1/doctor/get-emr/${localStorage.patientAppId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      }
    );
    //localStorage.removeItem("patientAppId");

    dispatch({
      type: actionTypes.GET_PATIENT_EMR,
      payload: response.data.data,
    });
    return dispatch({
      type: actionTypes.NOT_LOADING,
    });
  } catch (error) {
    if (!error.response) {
      return toast.error(error.msg);
    }
    toast.error(error.response.data.message);
    return dispatch({
      type: actionTypes.NOT_LOADING,
    });
  }
};

export const addSchedule = (value) => async (dispatch) => {
  dispatch({
    type: actionTypes.IS_LOADING,
  });
  try {
    console.log(value);
    let response = await api.post("api/v1/doctor/save-schedule", value, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    console.log(response, "add schedutle");
    toast.success(response.data.message);
  } catch (error) {
    console.log(error);
    if (!error.response) {
      return toast.error(error.msg);
    }
    toast.error(error.response.data.message);
  }
};
