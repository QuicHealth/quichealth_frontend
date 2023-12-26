import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { ESignIn, Signup, signIn } from "../api/user";
import { setAuthorizationToken } from "../api/setAuth";
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext/GlobalContext";
import { useLocation, useNavigate } from "react-router-dom";
import { SidebarCollapseContext } from "../context/SidebarCollapseContext";

export const useLogin = (expert) => {
  console.log(expert, "test");
  const navigate = useNavigate();
  const { setDoctorDetails, setPatientDetails } = useContext(GlobalContext);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const ab = expert ? ESignIn : signIn;
  const {
    mutate: login,
    isLoading,
    isSuccess,
  } = useMutation(ab, {
    onSuccess: (data) => {
      const token = data.token || data.data.token.original.access_token;
      const details = expert
        ? { ...data?.user, expert: true, token: token }
        : { ...data?.data?.user, expert: false, token: token };
      expert ? setDoctorDetails(details) : setPatientDetails(details);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(details));
      setAuthorizationToken(token);
      console.log(details, "details");

      toast.success(data.message);

      !expert ? navigate("/dashboard") : navigate("/expert-dashboard");
    },
    onError: (error) =>
      expert
        ? toast.error(error.response.data.message)
        : toast.error(error.message),
  });

  return {
    login,
    isLoading,
    isSuccess,
  };
};

export const useSignup = () => {
  const navigate = useNavigate();
  const {
    mutate: register,
    isLoading,
    isSuccess,
  } = useMutation(Signup, {
    onSuccess: () => {
      navigate("/signin");
    },
    onError: (error) => toast.error(error.message),
  });

  return {
    register,
    isLoading,
    isSuccess,
  };
};
