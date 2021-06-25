import React from "react";
import * as actionTypes from "./../actionTypes";
import axios from "axios";
import jwt from 'jsonwebtoken';
import { toast } from "react-toastify";

import history from "./../../history";
import {setToken, setAuthorizationToken } from './../setToken';

let token;

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
      user
    }
}

// Register or Signup a User
export const registerUser = (value) => async (dispatch) => {
  dispatch({
    type: actionTypes.IS_LOADING,
  });
  try {
    let response = await api.post("api/v1/register", value);
    console.log(response, "response");
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

//Login or Signup a user
export const signIn = (value) => async (dispatch) => {
  dispatch({
    type: actionTypes.IS_LOADING,
  });
  try {
    let response = await api.post("api/v1/login", value);
    token = response.data.token;
    setAuthorizationToken(token)
    console.log(response);
    toast.success(response.data.message);
    dispatch({
        type: actionTypes.SIGNIN_SUCCESS,
        payload: response
    })
    setTimeout(() => {
        history.push("/dashboard-overview");
        window.location.reload();
      }, 2000);
  } catch (error) {
      console.log(error.response);
    if (!error.response) {
      toast.error(error.message);
      return dispatch({
        type: actionTypes.SIGNIN_FAIL,
        payload: error.message,
      });
    }
    dispatch({
      type: actionTypes.SIGNIN_FAIL,
      payload:
        error.response.data.message,
    });
    toast.error(
      error.response.data.message
    );
  }
};
