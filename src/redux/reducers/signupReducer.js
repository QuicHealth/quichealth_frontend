import * as actionTypes from '../actionTypes';
import initialState from './../state'

const signupReducer = (state = initialState, action) => {
    const {type , payload} = action;
    switch (type) {
        case actionTypes.SIGNUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isRegistered: true,
                successMessage: "Sign up was successful"
            }
        case actionTypes.IS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.REMOVE_MESSAGE:
            return {
                ...state,
                successMessage: "",
                errorMessage: ""
            }
        case actionTypes.SIGNUP_FAIL:
            return {
                ...state,
                isLoading: false,
                isRegistered: false,
                errors: payload,
                errorMessage: payload
            }
        default:
            return state
    }
}

export default signupReducer