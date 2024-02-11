import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Containa, IconBox } from "./../SelectAppointment";
import { toast } from "react-toastify";
import { ZoomMtg } from "@zoomus/websdk";
import { connect } from "react-redux";

import "./expertMeeting.css";
import { getAllDoctorZoomMeeting } from "../../redux/actions/DoctorActions";

ZoomMtg.setZoomJSLib("https://source.zoom.us/2.6.0/lib", "/av");

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
    <img src='./images/emr.png' alt="EMR" />
    <span class="footer-button-base__button-label">EMR</span>
 </div>
`;

b.innerHTML = emrButton;
d.innerHTML = emrDiv;

(function () {
  document
    .getElementsByClassName("icon")[0]
    ?.addEventListener("click", () => console.log("bsdbsjkbsk")); //document.getElementById("wc-content")?.removeChild(d))
})();

function ExpertMeeting({
  meetingDetails,
  pwd,
  getAllDoctorZoomMeeting,
  meetingId,
}) {
  // setup your signature endpoint here: https://github.com/zoom/meetingsdk-sample-signature-node.js
  var signatureEndpoint = process.env.REACT_APP_SIGNATURE_ENDPOINT;
  //var signature = ""
  // This Sample App has been updated to use SDK App type credentials https://marketplace.zoom.us/docs/guides/build/sdk-app
  var sdkKey = process.env.REACT_APP_SDK_KEY;
  var meetingNumber = "";
  var role = 1;
  var leaveUrl = "/expert-zoomReturn";
  var userName = "Doctor";
  var userEmail = "";
  var passWord = "";
  const [signature, setSignature] = useState(null);

  const submitEmr = async (e) => {
    const diagnosis = document.getElementById("diagnosis").value;
    const treatments = document.getElementById("treatment").value;

    e.preventDefault();

    const user_id = meetingDetails.user_id;
    const appointment_id = meetingDetails.appointment_id;
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

  // console.log(meetingId, pwd, "numid");
  passWord = pwd;
  meetingNumber = meetingId;
  if (meetingId) {
    console.log(meetingNumber, passWord, "num");

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

  useEffect(() => {
    getAllDoctorZoomMeeting();
    // console.log(meetingId, "numid");
  }, []);

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
    <Containa>
      <Wrapper>
        <div id="meetingSDKElement">
          {/* <EMRPush onClick={activate}>
            <Icon>
              <img src={EMRIcon} alt="EMR" />
            </Icon>
            <h4>EMR</h4>
          </EMRPush> */}
        </div>
        {/* {EMRactive ? <EMR zoomMeeting={true} /> : ""} */}
      </Wrapper>
    </Containa>
  );
}

const mapStateToProps = (state) => ({
  pwd: state.hospital.pwd,
  meetingId: state.hospital.dMeetingId,
  meetingDetails: state.hospital.doctorMeetingDetails,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctorZoomMeeting: () => dispatch(getAllDoctorZoomMeeting()),
  };
};

export default ExpertMeeting = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpertMeeting);

const Wrapper = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: 70% 30%;
`;
const EMRContainer = styled.div`
  background-color: #fff;
  position: absolute;
  height: 90vh;
  width: 25%;
  z-index: 101;
  right: 0em;
  top: -5em;
  padding: 1.5em;
  font-family: "Inter", sans-serif !important;
`;

const EMRHead = styled.div`
  margin-top: 3em;
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }

  &img {
    height: 20px;
  }
`;
const EMRTitle = styled.h3`
  color: #000000;
  font-size: 1.2em;
  font-weight: bold;
  text-align: center;
  margin-left: 5em;
`;

const EMRForm = styled.form`
  margin-top: 3em;
`;

const EMRBody = styled.div`
  margin-bottom: 2em;
`;

const EMRType = styled.h3`
  font-size: 14px;
  margin-bottom: 1em;
  font-weight: bold;
`;

const EMRInput = styled.textarea`
  height: 13em;
  width: 100%;
  background-color: #f8f8f8;
  border-radius: 10px;
  border: 0;
  font-size: 14px;
  font-family: "Poppins", sans-serif !important;
  border: none;
  overflow: auto;
  outline: none;
  resize: none;
`;

const EMRSubmit = styled.div`
  margin-top: 3em;
  display: flex;
  justify-content: flex-end;
`;

const EMRButton = styled.span`
  color: white;
  background-color: #2fa5a9;
  border-radius: 7px;
  padding: 0.7em 2em;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;

const EMRPush = styled.div`
  position: fixed;
  z-index: 100;
  //border: 1px solid gainsboro;
  padding: 0.3em 2em;
  border-radius: 5px;
  bottom: -0.4em;
  right: 25%;
  cursor: pointer;
  display: grid;
  justify-items: center;

  h4 {
    color: gainsboro;
    font-size: 13px;
  }

  &:hover {
    opacity: 0.6;
  }
`;
