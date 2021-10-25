import * as actionTypes from "../actionTypes";
import initialState from "./../state";

const hospitalReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_ALL_HOSPITALS:
      return {
        ...state,
        hospitals: payload.hospitals,
      };
    case actionTypes.ALLOW_LOCATION_ACCESS:
      return {
        ...state,
        locationAccess: true,
      };
    case actionTypes.DISALLOW_LOCATION_ACCESS:
      return {
        ...state,
        locationAccess: false,
      };
    case actionTypes.GET_ALL_DAYS:
      return {
        ...state,
        days: payload,
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
    default:
      return state;
  }
};

export default hospitalReducer;
