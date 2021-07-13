import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import MenuIcon from "@material-ui/icons/Menu";
import { IconButton } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import BackIcon from "@material-ui/icons/ArrowBack";
import DateIcon from "@material-ui/icons/DateRange";
import Notification from "@material-ui/icons/NotificationsOutlined";
import HistoryIcon from "@material-ui/icons/BusinessCenterOutlined";
import UserIcon from "@material-ui/icons/PermIdentityOutlined";
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import LogoutIcon from "@material-ui/icons/ExitToAppOutlined";

import { notShowSidebar, showSidebar, logout } from "./../redux/actions";

function SideBar(props) {
  const { openSidebar, showSidebar, notShowSidebar, logout } = props;

  return (
    <Container
      style={
        !openSidebar
          ? { background: "linear-gradient(180deg, #e7e7ed, #ffffff)", marginLeft:".7em", borderTopLeftRadius: "15px" }
          : { backgroundColor: " #fff" }
      }
    >
      <IconBox
        style={
          !openSidebar
            ? { transform: "scaleX(1)", opacity: 1 }
            : { transform: "scaleX(1)", opacity: 0 }
        }
      >
        <IconButton>
          {!openSidebar ? <MenuIcon onClick={() => showSidebar()} /> : ""}
        </IconButton>
      </IconBox>
      <List
        style={
          !openSidebar ? { transform: "scaleX(0" } : { transform: "scaleY(1)" }
        }
      >
        <BackArrow>
          <IconButton>
            {openSidebar ? <BackIcon onClick={() => notShowSidebar()} /> : ""}
          </IconButton>
        </BackArrow>
        <StyledLink to="dashboard-overview" activeClassName="active">
          <ListIcon>
            <HomeIcon />
          </ListIcon>
          <ListName>Overview</ListName>
        </StyledLink>

        <StyledLink to="/appointments" activeClassName="active">
          <ListIcon>
            <DateIcon />
          </ListIcon>
          <ListName>Appointments</ListName>
        </StyledLink>

        <StyledLink to="/notifications" activeClassName="active">
          <ListIcon>
            <Notification />
          </ListIcon>
          <ListName>Notifications</ListName>
        </StyledLink>

        <StyledLink to="/history" activeClassName="active">
          <ListIcon>
            <HistoryIcon />
          </ListIcon>
          <ListName>History</ListName>
        </StyledLink>
        <StyledLink to="/health-profile" activeClassName="active">
          <ListIcon>
            <UserIcon />
          </ListIcon>
          <ListName>Health Profile</ListName>
        </StyledLink>
        <StyledLink to="/settings" activeClassName="active">
          <ListIcon>
            <SettingsIcon />
          </ListIcon>
          <ListName>Settings</ListName>
        </StyledLink>
        <StyledLink to="/help" activeClassName="active">
          <ListIcon>
            <InfoIcon />
          </ListIcon>
          <ListName>Help</ListName>
        </StyledLink>
        <ListItem>
          <ListIcon>
            <LogoutIcon onClick={()=> logout()} />
          </ListIcon>
          <ListName onClick={()=> logout()}>Signout</ListName>
        </ListItem>
      </List>
    </Container>
  );
}

const mapStateProps = (state) => ({
  openSidebar: state.utils.openSidebar,
});

const mapDispatchToProps = (dispatch) => {
  return {
    showSidebar: () => dispatch(showSidebar()),
    notShowSidebar: () => dispatch(notShowSidebar()),
    logout: () => dispatch(logout()),
  };
};
export default SideBar = connect(mapStateProps, mapDispatchToProps)(SideBar);

const Container = styled.div`
  position: relative;
  transition: all 400ms ease;
`;
const List = styled.ul`
  list-style: none;
  display: flex;
  font-size:1.2em;
  flex-direction: column;
  padding-left: 0;
  transform-origin: left;
  transform: scale(1);
  transition: all 400ms ease;
  &.active {
    transform: perspective(1200px) rotateY(0deg);
  }
`;
const IconBox = styled.div`
  position: absolute;
  left: 0;
  padding-left: 2em;
  cursor: pointer;
  transform-origin: left;
  transform: perspective(1200px) rotateX(0deg);
  opacity: 1;
  transition: all 600ms ease;
  @media (max-width: ${700}px) {
    padding-left: 0em;
  }

  > button > span > .MuiSvgIcon-root {
    font-size: 2em;
    color: #070647;
    @media (max-width: ${700}px) {
      //font-size: 1em;
    }
  }
  &:hover {
    // opacity: .6;
  }
`;
const StyledLink = styled(NavLink)`
  width: 100%;
  margin: auto;
  display: flex;
  align-items: baseline;
  padding-bottom: 0.5em;
  font-weight: 500;
  text-decoration: none;
  color: #c4c4c4;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  &.active {
    padding-left: 1em;
    opacity: 1;
    background: #e8e8ed;
    border-left: 10px solid #070647;
    color: #070647;
    @media (max-width: ${800}px) {
      padding-left: 0.5em;
      border-left: 5px solid #050445;
    }
    @media (max-width: ${500}px) {
      padding-left: 0em;
    }
  }
`;

const ListItem = styled.li`
  //opacity: 0.4;
  width: 100%;
  margin: auto;
  display: flex;
  align-items: baseline;
  padding-bottom: 0.5em;
  font-weight: 500;
  color: #c4c4c4;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  &.active {
    padding-left: 1em;
    opacity: 1;
    background-color: #fafafb;
    border-left: 10px solid #050445;
    @media (max-width: ${800}px) {
      //padding-left: 0.5em;
      border-left: 5px solid #050445;
    }
  }
`;
const BackArrow = styled.li`
  opacity: 1 !important;
  text-align: right;
  padding-right: 1em;
  width: 100%;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
const ListIcon = styled.span`
  position: relative;
  top: 0.5em;
  padding-right: 0.5em;
  padding-left: 2em;

  @media (max-width: ${800}px) {
    padding-left: 1.5em;
  }

  @media (max-width: ${500}px) {
    padding-left: .5em;
  }

  .MuiSvgIcon-root {
    font-size: 2em;
    @media (max-width: ${700}px) {
      font-size: 1.5em;
    }
  }
`;
const ListName = styled.span`
  @media (max-width: ${700}px) {
    display: none;
  }
  @media (max-width: ${800}px) {
    font-size: 13px;
  }
`;
