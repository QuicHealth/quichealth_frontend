const initialState = {
    openSidebar : true,
    token: localStorage.getItem('token'),
    isRegistered : false,
    isLoading: false,
    successMessage: "",
    errorMessage: "",
    isAuthenticated: "",
    user: "",
    isLoggedIn: false,
    link:"",
    resetToken: localStorage.getItem('resetToken'),
    hospitals: [],
    locationAccess: false,
    days: null
}

export default initialState;