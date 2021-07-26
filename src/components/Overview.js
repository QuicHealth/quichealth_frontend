import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import SideBar from "./SideBar";
import { getDashboard, pageUp } from "../redux/actions";
import { FitnessCenterSharp } from "@material-ui/icons";
import { hospitalLongLat } from "./PlacesCoordinate";

function Overview({ openSidebar, getDashboard, pageUp }) {
  let firstName;
  let lat = 0;
  let lon = 0;

  firstName = localStorage.getItem("firstname");
  const [userAddress, setUserAddress] = useState("");

  const getLocation = () => {
    if ("geolocation" in navigator) {
      console.log("Available");
      navigator.geolocation.getCurrentPosition(function (position) {
        lon = position.coords.longitude;
        lat = position.coords.latitude;
        localStorage.setItem("latitude", lat);
        localStorage.setItem("longitude", lon);
        console.log({ lat, lon });
      });
      getAddressofCoordinate();
    } else {
      console.log("Not Available");
    }
  };

  const getAddressofCoordinate = () => {
    const longitude = localStorage.getItem("longitude");
    const latitude = localStorage.getItem("latitude");
    fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => setUserAddress(data.results[0].formatted))
      .catch((error) => alert(error));

    console.log(getClosestHospital(latitude, longitude));
  };

  const getClosestHospital = (latitude, longitude) => {
    let distanceInKm = {};
    //get the distance of each hospital to the user location
    for (const [key, value] of Object.entries(hospitalLongLat)) {
      distanceInKm[key] = getDistance([latitude, longitude], value)
    }
    
    //const sortByShortestDistance ;
   const sortByShortestDistance = Object.entries(distanceInKm)
   const result =  sortByShortestDistance.sort((a, b) => a[1] - b[1] )
   return Object.fromEntries(result);
  };

  const getDistance = (origin, destination) => {
    const [lat1, lon1] = origin;
    const [lat2, lon2] = destination;
    const radius = 6371; //km 25.99765215004212

    const differenceOfLatitude = Math.radians(lat2 - lat1);
    const differenceOfLongitude = Math.radians(lon2 - lon1);
    const a =
      Math.sin(differenceOfLatitude / 2) * Math.sin(differenceOfLatitude / 2) +
      Math.cos(Math.radians(lat1)) *
        Math.cos(Math.radians(lat2)) *
        Math.sin(differenceOfLongitude / 2) *
        Math.sin(differenceOfLongitude / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = radius * c;
    return distance;
  };

   Math.radians = (degree) => degree * Math.PI / 180;

  useEffect(() => {
    //getDashboard();
    //pageUp()
    getLocation();
  }, []);

  return (
    <Container sidebar={openSidebar}>
      {console.log(userAddress)}
      <SideBar />
      <MainBody>
        <ProfileImage sidebar={openSidebar}>
          <img
            src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg"
            alt=""
          />
        </ProfileImage>
        <BodyHeading>
          Welcome, <span className="bold name">{firstName}!,</span>
        </BodyHeading>
        <BodySection>
          <BodyHeading className="bold">
            What do you want to do today?
          </BodyHeading>
          <BodyOption>
            <Option className="left-option">Book a physical appointment</Option>
            <Option>Consult an expert online</Option>
          </BodyOption>
        </BodySection>
      </MainBody>
    </Container>
  );
}

const mapStateProps = (state) => ({
  openSidebar: state.utils.openSidebar,
});
const mapDispatchToProps = (dispatch) => {
  return {
    getDashboard: () => dispatch(getDashboard()),
    pageUp: () => dispatch(pageUp()),
  };
};
Overview = connect(mapStateProps, mapDispatchToProps)(Overview);
export default Overview;

const slidein = keyframes`
    0%{
        grid-template-columns: 10% auto;
    }
    100%{
        grid-template-columns: 20% auto;
    }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: ${({ sidebar }) => (sidebar ? "20% 80%" : "10% auto")};
  height: 100vh;
  @media (max-width: ${800}px) {
    grid-template-columns: 25% 74%;
  }

  @media (max-width: ${700}px) {
    grid-template-columns: 12% 88%;
  }
`;
const MainBody = styled.div`
  background: linear-gradient(180deg, #e7e7ed, #ffffff);
  border-top-right-radius: 15px;
  margin-right: 0.7em;
  transition: all 2s ease-in;
`;

const BodyHeading = styled.h2`
  color: #070647;
  padding: 1em;
  font-size: 2em;
  @media (max-width: ${800}px) {
    font-size: 17px;
  }

  @media (max-width: ${700}px) {
    font-size: 20px;
    font-weight: 400;
    padding: 2em 0;
    padding-bottom: 0;
  }
  &.bold,
  span {
    font-weight: 700;
  }
  &.bold {
    @media (max-width: ${700}px) {
      font-size: 24px;
      width: 80%;
      margin: 0 auto;
      line-height: 36px;
    }
  }
  &.name {
    text-transform: capitalize;
  }
`;

const BodySection = styled.div`
  width: 80%;
  margin: 1em auto 0 auto;
  text-align: center;

  @media (max-width: ${700}px) {
    width: 100%;
  }
`;
const BodyOption = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  padding: 0 2.5em;
  font-weight: 600;
  width: 60em;
  margin: 0 auto;
  margin-top: 3em;
  //max-width: 45rem;

  @media (max-width: ${800}px) {
    //display: grid;
    width: 100%;
    //padding: 0;
  }

  @media (max-width: ${700}px) {
    display: block;
    width: 100%;
  }
`;
const Option = styled.div`
  padding: 1em 0.2em 1em 0.2em;
  border: 3px solid #070647;
  margin: 2em 0.5em;
  border-radius: 40px;
  font-size: 1.3em;
  width: 17em;
  box-shadow: 2px 3px #2e302f4a;

  @media (max-width: ${900}px) {
    width: 80%;
    //font-size: 12px;
  }
  @media (max-width: ${700}px) {
    width: 18em;
    margin: 2em auto;
    //font-size: 10px;
  }
  @media (max-width: ${400}px) {
    width: 100%;
    margin: 2em auto;
    font-size: 14px;
    line-height: 21px;
  }

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  &.left-option {
    background-color: #2fa5a9;
    color: white;
    border: 0px solid #070647;
    //padding: 1em 0.2em 0.7em 0.2em;
  }
`;

export const ProfileImage = styled.div`
  padding-right: 1em;
  display: none;
  > img {
    width: 2.5em;
    border-radius: 100%;
    object-fit: contain;
    @media (max-width: ${500}px) {
      object-fit: cover;
    }
  }
  @media (max-width: ${500}px) {
    display: flex;
    padding: 1em 2em;
    justify-content: flex-end;
    &.noTopPadding {
      padding: ${({ sidebar }) => (sidebar ? "0 1em" : "1em")};
    }
  }
`;
