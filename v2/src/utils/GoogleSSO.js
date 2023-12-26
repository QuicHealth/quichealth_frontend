import React, { useEffect, useRef } from "react";
import jwt_decode from "jwt-decode";

//let google;

function handleCallbackResponse(response) {
  console.log("Encoded JWT", response);
  const userObject = jwt_decode(response);
  console.log("Encoded JWTt", userObject);
}

function GoogleSSO() {
  const googleDiv = useRef(null);

  useEffect(() => {
    /* global google */
    window.google?.accounts?.id?.initialize({
      client_id:
        "769418500818-3s13bucal7qo2lgcn426st9pttik60i0.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    window.google?.accounts?.id.renderButton(googleDiv, {
      theme: "outline",
      size: "large",
    });
  }, []);
  return <div ref={googleDiv}></div>;
}

export default GoogleSSO;
