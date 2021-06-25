const initialState = {
    openSidebar : true,
    token: localStorage.getItem('token'),
    isRegistered : false,
    isLoading: false,
    successMessage: "",
    errorMessage: "",
    isAuthenticated: "",
    user: "",
    isLoggedIn: false
}

export default initialState;