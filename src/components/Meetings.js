import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MenuIcon from "@material-ui/icons/Menu";
import { Containa, IconBox } from "./SelectAppointment";
import { ViewProfile, Name, Details, MainBody, Image } from "./Appointments";
import { AppointmentContainer } from "./History";
//import ZoomMtgEmbedded from "@zoomus/websdk/embedded";
import { ZoomMtg } from "@zoomus/websdk";
import { connect } from "react-redux";
import { getPatientZoomMeeting } from "../redux/actions";

ZoomMtg.setZoomJSLib("https://source.zoom.us/2.6.0/lib", "/av");

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load("en-US");
ZoomMtg.i18n.reload("en-US");

function Meetings({ getPatientZoomMeeting, pwd, zak, meetingId }) {
  // setup your signature endpoint here: https://github.com/zoom/meetingsdk-sample-signature-node.js
  var signatureEndpoint = "http://localhost:4000";
  //var signature = ""
  // This Sample App has been updated to use SDK App type credentials https://marketplace.zoom.us/docs/guides/build/sdk-app
  var sdkKey = "CW3Cjig4wb7ergJYRgsBtJ0yiMAoZf3NXgRe";
  var meetingNumber = "";
  var role = 0;
  var leaveUrl = "http://localhost:3000/appointments";
  var userName = "React";
  var userEmail = "";
  var passWord = "";
  const [signature, setSignature] = useState(null);
  //const [meetingNumber, setMeetingNumber] = useState(null);
  // pass in the registrant's token if your meeting or webinar requires registration. More info here:
  // Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/meetings#join-registered
  // Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/webinars#join-registered
  var registrantToken = "";
  registrantToken = zak;
  passWord = pwd;
  meetingNumber = meetingId;

  let request = {
    meetingNumber: "123456789",
    role: 0,
    signature:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZGtLZXkiOiJhYmMxMjMiLCJtbiI6IjEyMzQ1Njc4OSIsInJvbGUiOjAsImlhdCI6MTY0NjkzNzU1MywiZXhwIjoxNjQ2OTQ0NzUzLCJhcHBLZXkiOiJhYmMxMjMiLCJ0b2tlbkV4cCI6MTY0Njk0NDc1M30.UcWxbWY-y22wFarBBc9i3lGQuZAsuUpl8GRR8wUah2M",
  };

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

  useEffect(() => {
    getPatientZoomMeeting();
    // console.log(meetingId, "numid");
  }, []);


  function startMeeting(signature) {
    document.getElementById("zmmtg-root").style.display = "block";
    console.log(sdkKey.length);
    ZoomMtg.init({
      leaveUrl: leaveUrl,
      success: (success) => {
        console.log(success);
        console.log(meetingNumber, signature, passWord,registrantToken,"meetingNumber hrer");
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
      <div id="meetingSDKElement"></div>;
    </Containa>
  );
}

const mapStateToProps = (state) => ({
  meetingId: state.patient.pMeetingId,
  pwd: state.patient.pwd,
  zak: state.patient.zak,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getPatientZoomMeeting: () => dispatch(getPatientZoomMeeting()),
  };
};

export default Meetings = connect(
  mapStateToProps,
  mapDispatchToProps
)(Meetings);

const MainBodyBox = styled(MainBody)`
  background-color: #f5f5f8;
`;

const HistoryContainer = styled(AppointmentContainer)`
  border: none;
  box-shadow: none;
  background-color: #f5f5f8;
`;

const HistoryType = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  //padding: 0em 4em;
  text-align: center;
  border: 1px solid;
  border-bottom: 0;
  background-color: white;
  box-shadow: 2px 3px #2e302f4a;
`;
const HTypeName = styled.h3`
  padding: 1.5em 0;
  border-left: 1px solid;

  &.select {
    background-color: #3769d7;
    color: white;
    border-left: 0;
  }
`;

const HistoryTypeContainer = styled.div`
  height: 80vh;
  background-color: white;
  box-shadow: 2px 3px #2e302f4a;
`;
const Date = styled.div``;
const Time = styled.div``;
const Minutes = styled.div``;
