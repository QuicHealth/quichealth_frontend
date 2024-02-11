import * as actionTypes from "./../actionTypes";

/**********Location feeature */

export const geoSettings = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

//set the long and lat of users
export function revealPosition(pos) {
  const crd = pos.coords;
  localStorage.setItem("latitude", crd.latitude);
  localStorage.setItem("longitude", crd.longitude);
  // console.log("Your current position is:");
  // console.log(`Latitude : ${crd.latitude}`);
  // console.log(`Longitude: ${crd.longitude}`);
  // console.log(`More or less ${crd.accuracy} meters.`);
}

export function positionDenied(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

//Get location
export const getLocation = () => async (dispatch) => {
  if (navigator.geolocation) {
    console.log("geoLocation feature is available");
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "granted") {
        //console.log(result.state);
        navigator.geolocation.getCurrentPosition(revealPosition);
        dispatch({
          type: actionTypes.ALLOW_LOCATION_ACCESS,
        });
        // geoBtn.style.display = "none";
      } else if (result.state === "prompt") {
        console.log(result.state, navigator, geoSettings, "geo");
        // geoBtn.style.display = "none";
        navigator.geolocation.getCurrentPosition(geoSettings);
      } else if (result.state === "denied") {
        //console.log(result.state);
        navigator.geolocation.getCurrentPosition(positionDenied);
        return dispatch({
          type: actionTypes.DISALLOW_LOCATION_ACCESS,
        });
      }
      result.addEventListener("change", () => {
        console.log(result.state);
      });
    });
  } else {
    console.log("geoLocation feature Not Available");
  }

  // if ("geolocation" in navigator) {
  //   console.log("Available");

  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     lon = position.coords.longitude;
  //     lat = position.coords.latitude;
  //     localStorage.setItem("latitude", lat);
  //     localStorage.setItem("longitude", lon);
  //   }, geoError);
  // } else {
  //   console.log("Not Available");
  // }
};
