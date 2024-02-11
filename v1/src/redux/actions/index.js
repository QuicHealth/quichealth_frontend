import * as actionTypes from "./../actionTypes";
import { toast } from "react-toastify";
import history from "./../../history";
import { setAuthorizationToken } from "./../setToken";
import { api } from "./axios";
import { getHospitalByUniqueId } from "./HospitalActions";
import { createMeeting } from "./DoctorActions";


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


//SetAppointment Action
