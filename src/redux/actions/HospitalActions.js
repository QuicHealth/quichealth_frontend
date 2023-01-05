import * as actionTypes from "./../actionTypes";
import { api } from "./axios";
import { toast } from "react-toastify";

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
  