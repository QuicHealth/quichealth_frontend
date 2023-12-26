import React, { useContext, useEffect, useState } from "react";
import { ZoomMtg } from "@zoomus/websdk";
import { Container } from "./Signup";
import GlobalContext from "../context/GlobalContext/GlobalContext";

ZoomMtg.setZoomJSLib("https://source.zoom.us/2.14.0/lib", "/av");
ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load("en-US");
ZoomMtg.i18n.reload("en-US");

function Meeting() {
  const { patientZoomDetails } = useContext(GlobalContext);
  const zoom = patientZoomDetails;

  console.log(zoom, process.env.REACT_APP_SIGNATURE_ENDPOINT, "here");

  var meetingId = zoom?.meeting_id;
  var zak = zoom.start_url.slice(42, 428);

  var signatureEndpoint = process.env.REACT_APP_SIGNATURE_ENDPOINT;
  var sdkKey = process.env.REACT_APP_SDK_KEY;

  var meetingNumber = zoom.meeting_id;
  var role = 0;
  var leaveUrl = "/rating";
  var userName = "Test";
  var userEmail = "";
  var passWord = zoom.password;
  const [signature, setSignature] = useState(null);

  var registrantToken = zak;



  if (meetingId) {
    console.log(meetingNumber, registrantToken, passWord, "num");

    fetch(signatureEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        meetingNumber: meetingId,
        role: role,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response, "res");
        console.log(meetingNumber, "numb");
        setSignature(response.signature);
      })
      .catch((error) => {
        console.error(error, "post");
      });
    //setMeetingNumber(meetingId);
  }

  function startMeeting(signature) {
    document.getElementById("zmmtg-root").style.display = "block";
    console.log(sdkKey.length);
    ZoomMtg.init({
      leaveUrl: leaveUrl,
      success: (success) => {
        console.log(success);
        console.log(
          meetingNumber,
          signature,
          passWord,
          registrantToken,
          "meetingNumber hrer"
        );
        ZoomMtg.join({
          sdkKey: sdkKey,
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          userEmail: userEmail,
          passWord: passWord,
          tk: "",
          success: (success) => {
            console.log(success, "ghgv");
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  useEffect(() => {
    startMeeting(signature);
  }, [signature]);

  return (
    <Container>
      <div id="meetingSDKElement"></div>;
    </Container>
  );
}

export default Meeting;
