import * as actionTypes from "../actionTypes";
import initialState from "./../state";

const resetPasswordReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        successMessage: payload.data.message,
        link: payload.data.link
      };
    case actionTypes.PASSWORD_RESET_FAIL:
      return {
        ...state,
        isLoading: false,
        //errorMessage: payload
      };
    default:
      return state;
  }
};

export default resetPasswordReducer;
