import React from "react";
import * as actionTypes from "./../actionTypes";
import axios from "axios";
import jwt from "jsonwebtoken";
import { toast } from "react-toastify";

import history from "./../../history";
import { setToken, setAuthorizationToken } from "./../setToken";

let token, resetToken;

const api = axios.create({
  baseURL: `https://dashboard.quichealth.com.ng`,
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
    console.log(response)
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
    console.log(error.message, error.response)
    if (!error.response) {
      toast.error(error.message);
      return dispatch({
        types: actionTypes.SIGNUP_FAIL,
        payload: error.message,
      });
    }
    dispatch({
      type: actionTypes.SIGNUP_FAIL,
      payload:
        error.response.data.errors[Object.keys(error.response.data.errors)][0],
    });
    toast.error(
      error.response.data.errors[Object.keys(error.response.data.errors)][0]
    );
  }
};

//Login or Signin a user
export const signIn = (value) => async (dispatch) => {
  dispatch({
    type: actionTypes.IS_LOADING,
  });
  try {
    let response = await api.post("api/v1/login", value);
    console.log(response)
    token = response.data.token;
    setAuthorizationToken(token);
    localStorage.setItem("token", token);
    toast.success(response.data.message);
    setTimeout(() => {
     history.push("/dashboard-overview");
     window.location.reload();
    }, 2000);
    dispatch({
      type: actionTypes.SIGNIN_SUCCESS,
      payload: response,
    });
  } catch (error) {
    if (!error.response) {
      toast.error(error.message);
      return dispatch({
        type: actionTypes.SIGNIN_FAIL,
        payload: error.message,
      });
    }
    dispatch({
      type: actionTypes.SIGNIN_FAIL,
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};

//password resetPassword
export const passwordReset = (value) => async (dispatch) => {
  dispatch({
    type: actionTypes.IS_LOADING,
  });

  try {
    let response = await api.post("api/v1/forget-password", value);
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
  } catch (error) {
    console.log(error)
    if (!error.response) {
      toast.error(error.msg);
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
export const getDashboard = () => async (dispatch) => {
  try {
    let response = await api.get("api/v1/get-dashboard", {
    headers: {
      'Authorization': `Bearer ${localStorage.token}`
    }
  })
    console.log(response)

  } catch (error) {
    if (!error.response) {
      return toast.error(error.msg)
    }
    toast.error(error.response.data.msg)
  }
}

//Logout
export const logout = () => dispatch => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('firstnane');
  setAuthorizationToken(false);
  dispatch(setCurrentUser({}));
  history.push("/signin");
  window.location.reload();
}

export const pageUp =() => dispatch => {
  dispatch({
    type: actionTypes.NOT_LOADING,
  });
}