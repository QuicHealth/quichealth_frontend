import React, { useEffect } from "react";
import { useLogin } from "../queries/useLogin";
import jwt_decode from "jwt-decode";
import { Spin } from "../utils/Spinners";

function useGoogleSignin(expert = false, divTarget) {
  const { login, isLoading, isSuccess } = useLogin(expert);

  function handleCallbackResponse(response) {
    console.log("Encoded JWT", response);
    const userObject = jwt_decode(response.credential);
    console.log("Encoded JWTt", userObject);
    const AuthPayload = {
      given_name: userObject?.given_name,
      family_name: userObject?.family_name,
      email: userObject?.email,
      sub: userObject?.sub,
      picture: userObject?.picture,
      googleAuth: true,
    };
    login(AuthPayload);
  }

  useEffect(() => {
    const googleLoginWrapper = document.createElement("div");
  // Or you can simple hide it in CSS rule for custom-google-button
  googleLoginWrapper.style.display = "none";
  googleLoginWrapper.classList.add("custom-google-button");
  
    /* global google */
    window.google?.accounts?.id?.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });

    window.google?.accounts?.id?.renderButton(
      document.getElementById(divTarget),
      {
        theme: "outline",
        size: "large",
        width: "300",
        type: "standard",
        text: "continue_with",
      }
    );
  }, []);

  return { isLoading };
}

export default useGoogleSignin;
