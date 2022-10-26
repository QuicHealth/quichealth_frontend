import * as actionTypes from "../actionTypes";
import initialState from "./../state";

const hospitalReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_ALL_HOSPITALS:
      return {
        ...state,
        hospitals: payload,
      };
    case actionTypes.GET_DOCTOR_BY_ID:
      return {
        ...state,
        doctor: payload,
      };
    case actionTypes.GET_HOSPITAL_UNIQUE_ID:
      return {
        ...state,
        hospitalId: payload.hospital.unique_id,
      };
    case actionTypes.GET_HOSPITAL:
      return {
        ...state,
        hospital: payload,
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
    case actionTypes.GET_PAID_DOCTOR_APPOINTMENT_DETAILS:
      return {
        ...state,
        paidAppDetails: payload[payload.length - 1],
      };
    case actionTypes.GET_ALL_DOCTOR_PAID_APPOINTMENT_DETAILS:
      return {
        ...state,
        allPaidApp: payload.reverse(),
      };
    case actionTypes.GET_DOCTOR_MEETING_DETAILS:
      return {
        ...state,
        doctorMeetingDetails: payload,
        pwd: payload.password,
        dMeetingId: payload.meeting_id,
      };
    default:
      return state;
  }
};

export default hospitalReducer;
