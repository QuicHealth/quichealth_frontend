import React from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import { connect } from "react-redux";

function DashboardNav({ notifications, doctorNotifications, expert }) {
  let user, firstName, lastName, name;
  firstName = localStorage.getItem("firstname");
  lastName = localStorage.getItem("lastname");
  name = localStorage.getItem("name");
  user = localStorage.getItem("user");
  return (
    <Container>
      <LogoImg>
        <img src="./images/QuicHealth-1.png" alt="" />
      </LogoImg>
      <UserDetails>
        <TopIcon>
          <SearchIcon />
          <div style={{ display: "flex" }}>
            <Circle
              notifications={expert ? doctorNotifications : notifications}
            ></Circle>
            <svg
              width="14"
              height="16"
              viewBox="0 0 14 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 16a2 2 0 0 0 2-2H5A2 2 0 0 0 7 16Zm6.731-4.678c-.604-.65-1.733-1.625-1.733-4.822 0-2.428-1.703-4.372-3.999-4.849V1a1 1 0 1 0-1.998 0v.651c-2.296.477-3.998 2.42-3.998 4.849 0 3.197-1.13 4.173-1.734 4.822A.976.976 0 0 0 0 12a1 1 0 0 0 1.003 1h11.994A1 1 0 0 0 14 12a.975.975 0 0 0-.269-.678Z"
                fill="#C5C7CD"
              />
            </svg>
          </div>
        </TopIcon>
        <UserName>
          <Name>
            <div>
              <svg
                width="2"
                height="32"
                viewBox="0 0 2 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 0v32" stroke="#DFE0EB" />
              </svg>
            </div>{" "}
            <span>
              {firstName} {lastName}{" "}
            </span>
          </Name>
          <Image>
            <img
              src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg"
              alt=""
            />
          </Image>
        </UserName>
      </UserDetails>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  notifications: state.patient.patientNotificationAlert,
  doctorNotifications: state.hospital.doctorNotifications,
});

export default DashboardNav = connect(mapStateToProps)(DashboardNav);

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em 2em;
  @media (max-width: ${700}px) {
    padding: 0.5em 1em;
    //padding-top: 1em;
  }
`;

const LogoImg = styled.div`
  width: 4em;
  position: relative;
  img {
    position: absolute;
    margin-top: -1.5em;
    width: 170px;
    @media (max-width: ${500}px) {
      //height: 11em;
      width: 170px;
      //height: 72px;
      position: absolute;
      margin-top: -2.5em;
      //width: 10em;
    }
  }
  @media (max-width: ${700}px) {
    width: 2em;
  }
`;

const UserName = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em 2em;
  column-gap: 1em;
  align-items: center;
  height: unset;
  @media (max-width: ${500}px) {
    height: 5.8em;
  }
`;

const Image = styled.div`
  padding-right: 1em;
  > img {
    width: 2em;
    height: 2em;
    border-radius: 100%;
  }
  @media (max-width: ${500}px) {
    display: none;
  }
`;
const Name = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #252733;
  font-weight: bold;
  line-height: 20px;
  letter-spacing: 0.2px;
  font-family: "Mulish", sans-serif;

  div {
  }

  span {
    padding-left: 0.3em;
  }
  @media (max-width: ${500}px) {
    font-size: 13px;
    display: none;
  }
`;

const UserDetails = styled.div`
  display: flex;
  align-items: center;
  div {
  }
`;

const TopIcon = styled.div`
  display: flex;
  column-gap: 1em;
  .MuiSvgIcon-root {
    width: 0.9em;
    height: 0.7em;
    color: #c5c7cd;
  }
`;

const Circle = styled.div`
  height: 0.5em;
  width: 0.5em;
  background-color: ${({ notifications }) =>
    notifications > 0 ? "#3751ff" : "unset"};
  border-radius: 50%;
  position: relative;
  right: -1em;
  border: ${({ notifications }) =>
    notifications > 0 ? "1px solid #fffbfb" : "0"};
`;
