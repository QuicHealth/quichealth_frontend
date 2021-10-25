import React from "react";
import { connect } from "react-redux";

import MenuIcon from "@material-ui/icons/Menu";
import { IconButton } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import BackIcon from "@material-ui/icons/ArrowBack";
import DateIcon from "@material-ui/icons/DateRange";
import ScheduleIcon from "@material-ui/icons/Schedule";
import Notification from "@material-ui/icons/NotificationsOutlined";
import HistoryIcon from "@material-ui/icons/BusinessCenterOutlined";
import UserIcon from "@material-ui/icons/PermIdentityOutlined";
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import LogoutIcon from "@material-ui/icons/ExitToAppOutlined";

import {Container, List, IconBox, StyledLink, ListItem, BackArrow, ListIcon, ListName} from "./../SideBar"
import { notShowSidebar, showSidebar, logout } from "./../../redux/actions";

function ExpertSidebar(props) {
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
          <StyledLink to="expert-overview" activeClassName="active">
            <ListIcon>
              <HomeIcon />
            </ListIcon>
            <ListName>Overview</ListName>
          </StyledLink>
  
          <StyledLink to="/expert-appointments" activeClassName="active">
            <ListIcon>
              <DateIcon />
            </ListIcon>
            <ListName>Appointments</ListName>
          </StyledLink>
  
          <StyledLink to="/expert-notifications" activeClassName="active">
            <ListIcon>
              <Notification />
            </ListIcon>
            <ListName>Notifications</ListName>
          </StyledLink>
  
          <StyledLink to="/expert-history" activeClassName="active">
            <ListIcon>
              <HistoryIcon />
            </ListIcon>
            <ListName>History</ListName>
          </StyledLink>

          <StyledLink to="/expert-healthProfile" activeClassName="active">
            <ListIcon>
              <UserIcon />
            </ListIcon>
            <ListName>Health Profile</ListName>
          </StyledLink>
          <StyledLink to="/expert-settings" activeClassName="active">
            <ListIcon>
              <SettingsIcon />
            </ListIcon>
            <ListName>Settings</ListName>
          </StyledLink>
          <StyledLink to="/schedule-time" activeClassName="active">
            <ListIcon>
              <ScheduleIcon />
            </ListIcon>
            <ListName>Schedule</ListName>
          </StyledLink>
          <StyledLink to="/expert-help" activeClassName="active">
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
    )
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

export default ExpertSidebar = connect(mapStateProps, mapDispatchToProps)(ExpertSidebar);
