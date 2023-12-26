import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/DashboardOutlined";
import Appointment from "@material-ui/icons/CalendarTodayOutlined";
import Notification from "@material-ui/icons/NotificationsOutlined";
import History from "@material-ui/icons/HistoryOutlined";
import Profile from "@material-ui/icons/PersonOutline";
import Settings from "@material-ui/icons/SettingsOutlined";
import Help from "@material-ui/icons/HelpOutline";
import Logout from "@material-ui/icons/ExitToAppOutlined";
import { MobileClickContext } from "../context/MobileClickContext";
import { SidebarCollapseContext } from "../context/SidebarCollapseContext";

const Paths = (dir, expert, setLogout) => {
  switch (dir) {
    case "appointment":
      return expert ? "/expert-appointment" : "/appointment";
    case "notifications":
      return expert ? "/expert-notifications" : "/notifications";
    case "history":
      return expert ? "/expert-history" : "/history";
    case "health_profile":
      return expert ? "/expert-healthprofile" : "/health-profile";
    case "settings":
      return expert ? "/expert-settings" : "/settings";
    case "help":
      return expert ? "/expert-help" : "/help";
    case "logout":
      //localStorage.removeItem("token");
      //setLogout(true);
      return expert ? "/expert-signin" : "/signin";
    case "dashboard":
      return expert ? "/expert-dashboard" : "/dashboard";

    default:
      break;
  }
};

export const MobileSidebar = ({ expert }) => {
  const { click, setClick } = useContext(MobileClickContext);

  const handleClick = (e) => {
    // e.preventDefault();
    setClick(!click);
  };
  return (
    <Container clicked={click} className="mobile">
      <Sidebarlinks>
        <NavBox onClick={(e) => handleClick(e)}>
          <NavLink to={Paths("dashboard", expert)}>
            <DashboardIcon />
            Dashboard
          </NavLink>
        </NavBox>

        <NavBox onClick={(e) => handleClick(e)}>
          <NavLink to={Paths("appointment", expert)}>
            <Appointment />
            Appointments
          </NavLink>
        </NavBox>

        <NavBox>
          <NavLink
            onClick={(e) => handleClick(e)}
            to={Paths("notifications", expert)}
          >
            <Notification />
            Notifications
          </NavLink>
        </NavBox>

        <NavBox>
          <NavLink
            onClick={(e) => handleClick(e)}
            to={Paths("history", expert)}
          >
            <History />
            History
          </NavLink>
        </NavBox>

        <NavBox onClick={(e) => handleClick(e)}>
          <NavLink to={Paths("health_profile", expert)}>
            <Profile />
            Health Profile
          </NavLink>
        </NavBox>

        <NavBox>
          <NavLink
            onClick={(e) => handleClick(e)}
            to={Paths("settings", expert)}
          >
            <Settings />
            Settings
          </NavLink>
        </NavBox>

        <NavBox>
          <NavLink onClick={(e) => handleClick(e)} to={Paths("help", expert)}>
            <Help />
            Help
          </NavLink>
        </NavBox>

        <NavBox className="logout">
          <NavLink onClick={(e) => handleClick(e)} to={Paths("logout", expert)}>
            <Logout />
            Logout
          </NavLink>
        </NavBox>
      </Sidebarlinks>
    </Container>
  );
};
function Sidebar({ expert }) {
  const { collapse, setHover, setLogout } = useContext(SidebarCollapseContext);
  return (
    <Container
      collapse={collapse}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Sidebarlinks>
        <NavBox>
          <NavLink to={Paths("dashboard", expert)}>
            <DashboardIcon />
            <Text collapse={collapse}> Dashboard</Text>
          </NavLink>
        </NavBox>

        <NavBox>
          <NavLink to={Paths("appointment", expert)}>
            <Appointment />
            <Text collapse={collapse}> Appointment</Text>
          </NavLink>
        </NavBox>

        <NavBox>
          <NavLink to={Paths("notifications", expert)}>
            <Notification />
            <Text collapse={collapse}> Notifications</Text>
          </NavLink>
        </NavBox>

        <NavBox>
          <NavLink to={Paths("history", expert)}>
            <History />
            <Text collapse={collapse}> History</Text>
          </NavLink>
        </NavBox>

        <NavBox>
          <NavLink to={Paths("health_profile", expert)}>
            <Profile />
            <Text collapse={collapse}> Health Profile</Text>
          </NavLink>
        </NavBox>

        <NavBox>
          <NavLink to={Paths("settings", expert)}>
            <Settings />
            <Text collapse={collapse} className="text">
              {" "}
              Settings
            </Text>
          </NavLink>
        </NavBox>

        <NavBox>
          <NavLink to={Paths("help", expert)}>
            <Help />
            <Text collapse={collapse}> Help</Text>
          </NavLink>
        </NavBox>

        <NavBox className="logout" onClick={() => setLogout(true)}>
          <NavLink>
            <Logout />
            <Text collapse={collapse}> Logout</Text>
          </NavLink>
        </NavBox>
      </Sidebarlinks>
    </Container>
  );
}

export default Sidebar;

const Container = styled.nav`
  z-index: 5;
  position: fixed;
  display: block;
  background: rgb(42, 42, 42);
  left: 0;
  top: 0;
  padding-top: 10em;
  width: ${(props) => (props.collapse ? "5em" : "15em")};
  height: 100vh;
  transition: all 0.1s;
  overflow-y: auto;

  &:hover {
    width: ${(props) => props.collapse && "15em"};
    div > div > a > p {
      display: ${(props) => props.collapse && "block !important"};
    }
  }

  @media only Screen and (max-width: 768px) {
    &.mobile {
      display: ${(props) =>
        props.clicked ? "block !important" : "none !important"};
      width: 100%;
      z-index: ${(props) => (props.clicked ? 6 : 0)};
      opacity: ${(props) => (props.clicked ? "1" : 0)};
      //visibility: ${(props) => (props.clicked ? "1" : 0)};
      transition: opacity 0.5s ease;
    }
    display: none;
  }

  &.mobile {
    display: none;
  }
`;

const Sidebarlinks = styled.div`
  padding: 1em 0em 2em 2em;

  background: #2a2a2a;
  position: relative;
`;

const NavBox = styled.div`
  a {
    display: flex;
    color: #777777;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
    align-items: center;
    margin-bottom: 2em;

    > .MuiSvgIcon-root {
      margin-right: 1em;
    }

    &::after {
      content: "";
      background-color: transparent;
      width: 2px;
      height: 20px;
      margin-left: 3em;
      display: inline-block;
      position: relative;

      transition: all 0.3s;
    }
    &.active::after {
      background-color: white;
    }

    &:hover {
      opacity: 0.5;
    }
    &.active {
      color: white;
    }
  }

  &.logout {
    margin-top: 10em;

    a {
      color: #ff3333;

      &::after {
        content: "";
        background-color: transparent;
        width: 2px;
        height: 20px;
        margin-left: 3em;
        display: inline-block;
        position: relative;

        transition: all 0.3s;
      }
      &.active::after {
        background-color: none;
      }
    }
  }
`;

const Text = styled.p`
  display: ${(props) => (props.collapse ? "none" : "block")};
`;
