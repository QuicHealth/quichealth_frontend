import * as actionTypes from "../actionTypes";
import initialState from "./../state";

const patientReducers = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SET_PATIENT_BOOK_VALUES:
      return {
        ...state,
        patientAppointmentValues: payload,
      };

    case actionTypes.SET_APPOINTMENT_ID:
      return {
        ...state,
        appointmentId: payload.Appointments.id,
        appointmentCreated: true,
      };

    case actionTypes.REMOVE_CREATED_APPOINTMENT:
      return {
        ...state,
        appointmentCreated: false,
      };
    case actionTypes.SET_USER_DETAILS:
      return {
        ...state,
        userDetails: payload,
      };
    case actionTypes.GET_PAID_APPOINTMENT_DETAILS:
      return {
        ...state,
        paidAppDetails: payload[payload.length - 1],
      };
    case actionTypes.GET_ALL_PAID_APPOINTMENT_DETAILS:
      return {
        ...state,
        allPaidApp: payload.reverse(),
      };
    case actionTypes.GET_PATIENT_MEETING_DETAILS:
      return {
        ...state,
        patientMeetingDetails: payload,
        pwd: payload.password,
        pMeetingId: payload.meeting_id,
        zak: payload.start_url.slice(42, 428),
      };
    case actionTypes.NOTIFICATIONS:
      return {
        ...state,
        notifications: payload.notifications,
        patientNotificationAlert: payload.new_notifications,
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

    case actionTypes.GET_HEALTH_PROFILE:
      return {
        ...state,
        patientHealthProfile: payload,
      };
    case actionTypes.GET_PATIENT_HISTORY:
      return {
        ...state,
        patientHistory: payload,
      };
    case actionTypes.PATIENT_SETTINGS:
      return {
        ...state,
        patientSettings: payload,
      };
    default:
      return state;
  }
};

export default patientReducers;
