// each of the action works for both expert and patient
// it works by setting a parameter in the function specify a call made by an expert or patient

import * as actionTypes from "./../actionTypes";
import { api } from "./axios";
import { toast } from "react-toastify";
import { getExpertSettings } from "./DoctorActions";
import { getSettings } from "./PatientActions";

//Get Dashboard
export const getDashboard = (expert) => async (dispatch) => {
  try {
    let response;
    dispatch({
      type: actionTypes.REMOVE_CREATED_APPOINTMENT,
    });
    if (expert) {
      response = await api.get("api/v1/doctor/get-dashboard", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });

      console.log(response, "dashboard-doc");
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

//upload Image
export const uploadImage = (value, expert) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.IS_LOADING,
    });
    console.log(value);
    //if expert use expert endpoint else use patient endpoint
    let response = expert
      ? await api.post("/api/v1/doctor/upload_image", value, {
          headers: {
            Authorization: `Bearer ${localStorage.token} `,
            "Content-Type": "multipart/form-data",
          },
        })
      : await api.post("/api/v1/upload_image", value, {
          headers: {
            Authorization: `Bearer ${localStorage.token} `,
            "Content-Type": "multipart/form-data",
          },
        });
    console.log(response, "updateImage");
    response.data.status
      ? toast.success(response.data.message)
      : toast.error(response.data.message);
    expert ? dispatch(getExpertSettings()) : dispatch(getSettings());
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
export const removeImage = (value, expert) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.IS_LOADING,
    });
    //if expert use expert endpoint else use patient endpoint
    let response = expert
      ? await api.post("/api/v1/doctor/remove_image", value, {
          headers: {
            Authorization: `Bearer ${localStorage.token} `,
            "Content-Type": "multipart/form-data",
          },
        })
      : await api.post("/api/v1/remove_image", value, {
          headers: {
            Authorization: `Bearer ${localStorage.token} `,
            "Content-Type": "multipart/form-data",
          },
        });
    console.log(response, "removeImage");
    response.data.status
      ? toast.success(response.data.message)
      : toast.error(response.data.message);
    expert ? dispatch(getExpertSettings()) : dispatch(getSettings());
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
