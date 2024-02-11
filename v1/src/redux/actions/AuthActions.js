import * as actionTypes from "./../actionTypes";
import { toast } from "react-toastify";

import history from "./../../history";
import { api } from "./axios";
import { setAuthorizationToken } from "../setToken";
import { getDashboard } from "./GenericActions";

let token, resetToken;

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
export const signIn = (value, expert=false) => async (dispatch) => {
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

        dispatch({
          type: actionTypes.EXPERT_SIGNIN_SUCCESS,
          payload: response.data,
        });
        localStorage.setItem("doctorid", response.data.user.id);
        localStorage.setItem("doctorName", response.data.user.name);

        response.data.route = "doctor";
        setTimeout(() => {
          history.push("/expert-overview");
          window.location.reload();
        }, 2000);
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

//Logout
export const logout = (expert) => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("firstname");
  localStorage.removeItem("lastname");
  localStorage.removeItem("doctorName");
  localStorage.removeItem("patientAppId");
  setAuthorizationToken(false);
  dispatch(setCurrentUser({}));
  expert ? history.push("/expert-signin") : history.push("/signin");
  window.location.reload();
};
