import * as actionTypes from "../actionTypes";
import initialState from "../state";

const utilsReducer = (state = initialState, action) => {
  const { type, payload, user } = action;

  switch (type) {
    case actionTypes.SHOW_SIDEBAR:
      return {
        ...state,
        openSidebar: true,
      };
    case actionTypes.NOT_SHOW_SIDEBAR:
      return {
        ...state,
        openSidebar: false,
      };
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    case actionTypes.NOT_LOADING:
      return {
        ...state,
        isLoading: false,
      };
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
    default:
      return state;
  }
};

export default utilsReducer;
