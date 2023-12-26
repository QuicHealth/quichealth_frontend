import React from "react";
import axios from "axios";
//import { setAuthorizationToken } from "../api/setAuth";

const useRefreshToken = () => {
  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    //setAuthorizationToken
    // setAuthorizationToken((prev) => {
    //   console.log(JSON.stringify(prev));
    //   console.log(response.data);
    //   return { ...prev, accessToken: response.data };
    // });
    return response.data;
  };
  return refresh;
};

export default useRefreshToken;
