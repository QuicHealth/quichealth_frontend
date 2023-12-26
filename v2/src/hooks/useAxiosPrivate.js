import axios from "axios";
import { axiosPrivate } from "../api/axios";
import { setAuthorizationToken } from "../api/setAuth";
import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const useAxiosPrivate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const expertRoute = location?.pathname?.includes("expert");
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer $token`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        const isUnauthenticated =
          error?.response.data.debug.message === "Unauthenticated.";
        if (error.response.status === 500 && isUnauthenticated) {
          expertRoute ? navigate("/expert-signin") : navigate("/signin");
        }

        // I will use the below condition when refresh token is available and allow-header is activated in the backend
        //This would replace the expired token with a fresh token instead redirecting users to the login page ( current inmplementation)

        // if (error.response.status === 403 && !prevRequest.sent) {
        //   prevRequest.sent = true;
        //   // no refreshToken yet so we stop
        //   //   const newAccessToken = await refresh();
        //   //   prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        //   //   return axiosPrivate(prevRequest);
        // }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(responseIntercept);
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, []);
  return axiosPrivate;
};

export default useAxiosPrivate;
