import React, { useContext, useEffect, useState } from "react";
import { ZoomMtg } from "@zoomus/websdk";
import { toast } from "react-toastify";
import { Container } from "./../../Signup";
import "./expertMeeting.css";
import GlobalContext from "../../../context/GlobalContext/GlobalContext";
import { useAddEMR } from "../../../queries/useDashboard";

ZoomMtg.setZoomJSLib("https://source.zoom.us/2.14.0/lib", "/av");
ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load("en-US");
ZoomMtg.i18n.reload("en-US");

const b = document.createElement("div");
const d = document.createElement("div");

const emrDiv = `
  <div class='emr_container' id='wc-right-container emr_box'>
    <div id='emr_head'>
      <div class="icon">
      <i class="fas fa-chevron-down down"></i>
      </div>
      <h3> Add to EMR </h3>
    </div>
    

    <form id="emr_form">

      <div>
        <h4> Diagnosis</h4>
        <textarea id="diagnosis" name="diagnosis"> </textarea>
      </div>

      <div>
        <h4> Treatment</h4>
        <textarea id="treatment" name="treatment"> </textarea>
      </div>

      <div id="emr_submit">
          <button type="submit" id="emrbutton">Add </button>
      <div>
      </div>

    </form>
  </div>
`;

const emrButton = `

  <div class="footer-button__wrapper emrbuttonwrapper" tabindex="-1">
    <button type="button" class=""footer-button-base__button ax-outline footer-button__button"> 

    </button>
    <img src='./emr.png' alt="EMR" />
    <span class="footer-button-base__button-label">EMR</span>
 </div>
`;

b.innerHTML = emrButton;
d.innerHTML = emrDiv;

function ExpertMeeting() {
  const [signature, setSignature] = useState(null);
  const { expertZoomDetails } = useContext(GlobalContext);
  const { addEMRs, isLoading, isSuccess } = useAddEMR();
  const zoom = expertZoomDetails;
  var role = 1;
  var meetingNumber = zoom.meeting_id;
  var signatureEndpoint = process.env.REACT_APP_SIGNATURE_ENDPOINT;
  var sdkKey = process.env.REACT_APP_SDK_KEY;
  var userName = "Doctor";
  var passWord = zoom.password;
  var meetingId = zoom?.meeting_id;
  var zak = zoom.start_url.slice(42, 428);
  var leaveUrl = "/expert-history";
  var userEmail = "";

  const submitEmr = async (e) => {
    e.preventDefault();
    const diagnosis = document.getElementById("diagnosis").value;
    const treatments = document.getElementById("treatment").value;

    const user_id = zoom.user_id;
    const appointment_id = zoom.appointment_id;
    console.log(diagnosis, treatments, user_id, appointment_id, "ermsss");

    const response = await fetch(process.env.REACT_APP_EMR_URL, {
      method: "POST",
      headers: {
        Accept: "application/json,*/*",
        "Content-type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify({
        diagnosis,
        treatments,
        user_id,
        appointment_id,
      }),
    });
    const data = await response.json();
    // console.log(data, "responszemr");
    document.getElementsByClassName("emr_container")[0].style.display = "none";
    if (!data.status) {
      return toast.error("Something went wrong, pls try again");
    }

    return toast.success(data.msg);
  };

  if (meetingId) {
    // console.log(meetingNumber, registrantToken, passWord, "num");

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
          //registrantToken,
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
            console.log(success);
            document.getElementById("wc-content")?.appendChild(d);
            document
              .getElementsByClassName("footer__btns-container")[0]
              ?.appendChild(b);

            document
              .getElementsByClassName("emrbuttonwrapper")[0]
              ?.addEventListener("click", () => {
                document.getElementsByClassName(
                  "emr_container"
                )[0].style.display = "block";
              });

            const buttonToHide = document.getElementsByClassName(
              "security-option-menu__pop-menu"
            );
            // const buttonToHide2 = document.getElementsByClassName(
            //   "custom-dropdown-menu"
            // );

            for (let button of buttonToHide) {
              button.style.display = "none";
            }
            // for (let button of buttonToHide2) {
            //   button.style.display = "none";
            // }
            console.log(
              document.getElementsByClassName("security-option-menu__pop-menu"),
              "jdksk"
            );

            document
              .getElementsByClassName("icon")[0]
              ?.addEventListener(
                "click",
                () =>
                  (document.getElementsByClassName(
                    "emr_container"
                  )[0].style.display = "none")
              );

            document
              .getElementById("emr_form")
              ?.addEventListener("submit", submitEmr);
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

export default ExpertMeeting;
