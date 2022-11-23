import * as actionTypes from "./../actionTypes";
import axios from "axios";
import { toast } from "react-toastify";
import history from "./../../history";
import { setToken, setAuthorizationToken } from "./../setToken";

let token, resetToken;

const api = axios.create({
  //baseURL: `https://dashboard.quichealth.com.ng`,
  baseURL: `https://quichealthapi.herokuapp.com`,
  headers: {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json; charset=UTF-8",
  },
});

export const showSidebar = () => (dispatch) => {
  dispatch({
    type: actionTypes.SHOW_SIDEBAR,
  });
};

export const notShowSidebar = () => (dispatch) => {
  dispatch({
    type: actionTypes.NOT_SHOW_SIDEBAR,
  });
};

//set user
export const setCurrentUser = (user) => {
  return {
    type: actionTypes.SET_CURRENT_USER,
    user,
  };
};

// Register or Signup a User
export const registerUser = (value) => async (dispatch) => {
  dispatch({
    type: actionTypes.IS_LOADING,
  });
  try {
    let response = await api.post("api/v1/register", value);
    dispatch({
      type: actionTypes.SIGNUP_SUCCESS,
      payload: response.data,
    });
    toast.success("Sign up was successful");
    setTimeout(() => {
      history.push("/signin");
      window.location.reload();
    }, 2000);
  } catch (error) {
    if (!error.response) {
      toast.error(error.message);
      dispatch({
        types: actionTypes.SIGNUP_FAIL,
        payload: error.message,
      });
      return dispatch({
        type: actionTypes.NOT_LOADING,
      });
    }
    dispatch({
      type: actionTypes.SIGNUP_FAIL,
      payload: Object.values(error.response.data.data)[0][0],
    });
    toast.error(Object.values(error.response.data.data)[0][0]);
    return dispatch({
      type: actionTypes.NOT_LOADING,
    });
  }
};

//Login or Signin a user
export const signIn = (value, expert) => async (dispatch) => {
  dispatch({
    type: actionTypes.IS_LOADING,
  });
  try {
    let response;
    if (expert) {
      response = await api.post("api/v1/doctor/doctor-login", value);
      console.log(response, "response");
      if (response.data.status === true) {
        token = response.data.token;
        setAuthorizationToken(token);
        localStorage.setItem("token", token);
        toast.success(response.data.message);
        let res = await dispatch(getDashboard(expert));
        // console.log(res, "res");
        dispatch({
          type: actionTypes.EXPERT_SIGNIN_SUCCESS,
          payload: response.data,
        });
        localStorage.setItem("doctorid", response.data.user.id);
        localStorage.setItem("doctorName", response.data.user.name);

        response.data.route = "doctor";

        return response;
      } else {
        toast.error(response.data.message);
        dispatch({
          type: actionTypes.SIGNIN_FAIL,
          payload: response.data.message,
        });
        dispatch({
          type: actionTypes.NOT_LOADING,
        });
      }
    } else {
      response = await api.post("api/v1/login", value);
      console.log(response, "response");
      if (response.data.status === true) {
        token = response.data.data.token.original.access_token;
        setAuthorizationToken(token);
        localStorage.setItem("token", token);
        toast.success(response.data.message);
        getDashboard();
        setTimeout(() => {
          history.push("/dashboard-overview");
          window.location.reload();
        }, 2000);

        return response;
      } else {
        toast.error(response.data.message);
        dispatch({
          type: actionTypes.SIGNIN_FAIL,
          payload: response.data.message,
        });
        return dispatch({
          type: actionTypes.NOT_LOADING,
        });
      }
    }
  } catch (error) {
    if (!error.response) {
      console.log(error);
      toast.error(error.message);
      dispatch({
        type: actionTypes.SIGNIN_FAIL,
        payload: error.message,
      });
      return dispatch({
        type: actionTypes.NOT_LOADING,
      });
    }
    console.log(error.message, "error");
    dispatch({
      type: actionTypes.SIGNIN_FAIL,
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
    return dispatch({
      type: actionTypes.NOT_LOADING,
    });
  }
};

//password resetPassword
export const passwordReset = (value) => async (dispatch) => {
  dispatch({
    type: actionTypes.IS_LOADING,
  });

  try {
    let response = await api.post("api/v1/forget-password", value);
    console.log(response);
    const link = response.data.link;
    resetToken = link.slice(16);
    localStorage.setItem("resetToken", resetToken);

    toast.success(response.data.message);
    setTimeout(() => {
      history.push("/new-password");
      window.location.reload();
    }, 2000);
    dispatch({
      type: actionTypes.PASSWORD_RESET_SUCCESS,
      payload: response,
    });
    return dispatch({
      type: actionTypes.NOT_LOADING,
    });
  } catch (error) {
    console.log(error.message);
    if (!error.response) {
      toast.error(error.message);
      dispatch({
        type: actionTypes.PASSWORD_RESET_FAIL,
        payload: error.message,
      });
      return dispatch({
        type: actionTypes.NOT_LOADING,
      });
    }
    dispatch({
      type: actionTypes.PASSWORD_RESET_FAIL,
      payload: error.response.data.message,
    });
    dispatch({
      type: actionTypes.NOT_LOADING,
    });
    toast.error(error.response.data.message);
  }
};

//Verify Reset Token
export const verifyResetToken = (token) => async (dispatch) => {
  try {
    resetToken = localStorage.getItem("resetToken");
    if (!resetToken || resetToken.length === 0) {
      toast.error("Empty Reset Token");
      setTimeout(() => {
        history.push("/forget-password");
        window.location.reload();
      }, 2000);
    }
    let response = await api.get(
      `/api/v1/verify-reset-token?code=${resetToken}`
    );
  } catch (error) {
    console.log(error);
    if (!error.response) {
      toast.error(error.msg);
      dispatch({
        type: actionTypes.PASSWORD_RESET_FAIL,
        payload: error.msg,
      });
      return setTimeout(() => {
        history.push("/forget-password");
        window.location.reload();
      }, 2000);
    }
    dispatch({
      type: actionTypes.PASSWORD_RESET_FAIL,
      payload: error.response.data.msg,
    });
    toast.error(error.response.data.msg);
    return setTimeout(() => {
      history.push("/forget-password");
      window.location.reload();
    }, 2000);
  }
};

//Chnage Password
export const changePassword = (value) => async (dispatch) => {
  dispatch({
    type: actionTypes.IS_LOADING,
  });

  try {
    let response = await api.post("api/v1/reset-password", value);
    toast.success(response.data.msg);
    setTimeout(() => {
      history.push("/signin");
      window.location.reload();
    }, 2000);
    dispatch({
      type: actionTypes.PASSWORD_RESET_SUCCESS,
      payload: response,
    });
    localStorage.removeItem("resetToken");
  } catch (error) {
    if (!error.response) {
      toast.error(error.msg);
      setTimeout(() => {
        history.push("/reset-password");
        window.location.reload();
      }, 2000);
      return dispatch({
        type: actionTypes.PASSWORD_RESET_FAIL,
        payload: error.msg,
      });
    }
    dispatch({
      type: actionTypes.PASSWORD_RESET_FAIL,
      payload: error.response.data.msg,
    });
    toast.error(error.response.data.msg);
    setTimeout(() => {
      history.push("/reset-password");
      window.location.reload();
    }, 2000);
  }
};

//Get Dashboard
export const getDashboard = (expert) => async (dispatch) => {
  try {
    let response;
    if (expert) {
      response = await api.get("api/v1/doctor/get-dashboard", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });

      console.log(response, "dashboard-doc");
      // localStorage.setItem("doctorid", response.data.doctor.id);
      // localStorage.setItem("doctorName", response.data.doctor.name);
      return response;
    } else {
      response = await api.get("api/v1/get-dashboard", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      //getHospitals();
      console.log(response, "dashboard");
      dispatch({
        type: actionTypes.SET_USER_DETAILS,
        payload: response.data.data.user,
      });

      localStorage.setItem("firstname", response.data.data.user.firstname);
      localStorage.setItem("lastname", response.data.data.user.lastname);
    }
  } catch (error) {
    console.log(error);
    if (!error.response) {
      return toast.error(error.msg);
    }
    toast.error(error.response.data.msg);
  }
};

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

//Get Hospitals
export const getHospitals = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.IS_LOADING,
    });
    let response = await api.get("api/v1/get-hospitals", {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    console.log(response, "hospital");
    dispatch({
      type: actionTypes.GET_ALL_HOSPITALS,
      payload: response.data.hospital,
    });
    dispatch({
      type: actionTypes.NOT_LOADING,
    });
    return response;
  } catch (error) {
    console.log(error.message);
    if (!error.response) {
      return toast.error(error.msg);
    }
    dispatch({
      type: actionTypes.NOT_LOADING,
    });
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
    console.log(response.data.data[response.data.data.length - 1], "meetingDo");
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

//upload Image
export const uploadImage = (value) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.IS_LOADING,
    });
    console.log(value);
    let response = await api.post("/api/v1/upload_image", value, {
      headers: {
        Authorization: `Bearer ${localStorage.token} `,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response, "updateImage");
    toast.success(response.data.message);
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

//remove Image
export const removeImage = (value) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.IS_LOADING,
    });
    let response = await api.post("/api/v1/remove_image", value, {
      headers: {
        Authorization: `Bearer ${localStorage.token} `,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response, "removeImage");
    toast.success(response.data.message);
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

//update password
export const updatePassword = (value) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.IS_LOADING,
    });
    let response = await api.post("api/v1/update_password", value, {
      headers: {
        Authorization: `Bearer ${localStorage.token} `,
      },
    });
    console.log(response, "updatePass");
    response.data.status
      ? toast.success(response.data.message)
      : toast.error(response.data.message);
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

//upload Image

//export

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

//create zoom meeting
export const createMeeting = (value) => async (dispatch) => {
  try {
    let response = await api.post("/api/v1/create-zoom-meeting", value, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
  } catch (error) {
    console.log(error.message);
    if (!error.response) {
      return toast.error(error.msg);
    }
    toast.error(error.response.data.msg);
  }
};

//refresh Oauth zoom token
export const refreshOauthToken = (value) => async (dispatch) => {
  try {
    let response = await api.post("/api/v1/refresh-token", {
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

//get zoom meeting details
export const getDoctorZoomMeeting = () => async (dispatch) => {
  try {
    let response = await api.get("api/v1/doctor/get-zoom-meetings", {
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

//get hospital by unique ID
export const getHospitalByUniqueId = (uniqueId) => async (dispatch) => {
  try {
    let response = await api.get(`api/v1/get-hospital/${uniqueId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    console.log(response, "uniqhospital");
    dispatch({
      type: actionTypes.GET_HOSPITAL,
      payload: response.data,
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
    toast.success(response.data.message);
    response.data.status
      ? toast.success(response.data.message)
      : toast.error(response.data.message);
    dispatch({
      type: actionTypes.SET_APPOINTMENT_ID,
      payload: response.data,
    });
    console.log(response, "appoint");
  } catch (error) {
    console.log(error.message);
    if (!error.response) {
      return toast.error(error.msg);
    }
    toast.error(error.response.data.msg);
  }
};

// create appointment details
export const addAppointmentDetails =
  (value, paymentValue) => async (dispatch) => {
    //console.log(paymentValue, value)
    try {
      let response = await api.post("/api/v1/appointment/details", value, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      toast.success(response.data.message);
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
      toast.error(error.response.data.msg);
    }
  };

//Create Payment details
export const addPayment = (value) => async (dispatch) => {
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

/**********Location fweature */

const geoSettings = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

//set the long and lat of users
function revealPosition(pos) {
  const crd = pos.coords;
  localStorage.setItem("latitude", crd.latitude);
  localStorage.setItem("longitude", crd.longitude);
  // console.log("Your current position is:");
  // console.log(`Latitude : ${crd.latitude}`);
  // console.log(`Longitude: ${crd.longitude}`);
  // console.log(`More or less ${crd.accuracy} meters.`);
}

function positionDenied(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
//Get location
export const getLocation = () => async (dispatch) => {
  if (navigator.geolocation) {
    console.log("geoLocation feature is available");
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "granted") {
        //console.log(result.state);
        navigator.geolocation.getCurrentPosition(revealPosition);
        dispatch({
          type: actionTypes.ALLOW_LOCATION_ACCESS,
        });
        // geoBtn.style.display = "none";
      } else if (result.state === "prompt") {
        //console.log(result.state);
        // geoBtn.style.display = "none";
        navigator.geolocation.getCurrentPosition(geoSettings);
      } else if (result.state === "denied") {
        //console.log(result.state);
        navigator.geolocation.getCurrentPosition(positionDenied);
        return dispatch({
          type: actionTypes.DISALLOW_LOCATION_ACCESS,
        });
      }
      result.addEventListener("change", () => {
        console.log(result.state);
      });
    });
  } else {
    console.log("geoLocation feature Not Available");
  }

  // if ("geolocation" in navigator) {
  //   console.log("Available");

  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     lon = position.coords.longitude;
  //     lat = position.coords.latitude;
  //     localStorage.setItem("latitude", lat);
  //     localStorage.setItem("longitude", lon);
  //   }, geoError);
  // } else {
  //   console.log("Not Available");
  // }
};

//Logout
export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("firstname");
  localStorage.removeItem("lastname");
  setAuthorizationToken(false);
  dispatch(setCurrentUser({}));
  history.push("/signin");
  window.location.reload();
};

export const pageUp = () => (dispatch) => {
  dispatch({
    type: actionTypes.NOT_LOADING,
  });
};

export const getDays = () => async (dispatch) => {
  try {
    let response = await api.get("api/v1/doctor/get-days", {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    dispatch({
      type: actionTypes.GET_ALL_DAYS,
      payload: response.data.data,
    });
    console.log(response.data.data, "geyDays");
  } catch (error) {
    console.log(error.message);
    if (!error.response) {
      return toast.error(error.msg);
    }
    toast.error(error.response.data.msg);
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
    setTimeout(() => {
      //history.push("/schedule-time");
      // window.location.reload();
    }, 2000);
  } catch (error) {
    console.log(error);
    if (!error.response) {
      return toast.error(error.msg);
    }
    toast.error(error.response.data.msg);
  }
};

//SetAppointment Action
