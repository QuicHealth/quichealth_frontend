import * as actionTypes from "../actionTypes";
import initialState from "../state";

const utilsReducer = (state = initialState, action) => {
  const { type, payload } = action;

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
    default:
      return state;
  }
};

export default utilsReducer;
