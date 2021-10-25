import * as actionTypes from "../actionTypes";
import initialState from "./../state";

const signinReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SIGNIN_SUCCESS:
      const user = `${payload.data.data.firstname} ${payload.data.data.lastname}`;
      localStorage.setItem("user", user);
      localStorage.setItem("firstname", payload.data.data.firstname);
      return {
        ...state,
        //isLoading: false,
        isLoggedIn: true,
        successMessage: payload.data.message,
        user,
        isAuthenticated: true,
      };
    case actionTypes.LOAD_USER:
      localStorage.getItem("token", payload);
      return {
        ...state,
        isLoggedIn: true,
      };
    case actionTypes.IS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.NOT_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.REMOVE_MESSAGE:
      return {
        ...state,
        successMessage: "",
        errorMessage: "",
      };
    case actionTypes.SIGNIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        errors: payload,
        errorMessage: payload,
      };
    default:
      return state;
  }
};

export default signinReducer;
