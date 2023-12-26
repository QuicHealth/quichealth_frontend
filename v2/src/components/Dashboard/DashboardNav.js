import React, { useContext } from "react";
import styled from "styled-components";
import whitelogo from "./../../assets/whitelogo.png";
import search from "./../../assets/search.png";
import notification from "./../../assets/Notification.svg";
import profilepx from "./../../assets/profilepix.png";
import arrow from "./../../assets/downarrow.svg";
import { useLocation } from "react-router-dom";
import { HamburgerBtn } from "../Header";
import logo from "./../../assets/logo.png";
import NotificationIcon from "@material-ui/icons/NotificationsOutlined";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import { MobileClickContext } from "../../context/MobileClickContext";
import { SidebarCollapseContext } from "../../context/SidebarCollapseContext";
import AvatarImage from "../../utils/AvatarImage";

function DashboardNav({ expert, userData, expertData }) {
  const { click, setClick } = useContext(MobileClickContext);

  const { collapse } = useContext(SidebarCollapseContext);

  const firstname = userData?.user.firstname;
  const lastname = userData?.user.lastname;
  const location = useLocation();
  const isDashboard = location.pathname.includes("dashboard") ? true : false;

  return (
    <Container>
      <DesktopView>
        <Logo collapse={collapse}>
          <img src={whitelogo} alt="logo" />
        </Logo>
        <LeftNavbar expert={expert} dashboard={isDashboard}>
          {isDashboard && !expert && (
            <WelcomeBox>
              <h1>Welcome,{firstname} </h1>
              <p>
                You have{" "}
                {!userData?.totalPendingAppointments
                  ? "no"
                  : userData?.totalPendingAppointments}{" "}
                pending appointment
                {userData?.totalsPendingAppointments > 1 ? "s" : ""}
              </p>
            </WelcomeBox>
          )}

          <RightSubnavbar>
            <SearchBox>
              <Search type="text" placeholder="Search" />
              <SearchImg>
                <img src={search} alt="search" />
              </SearchImg>
            </SearchBox>
            <Notification>
              <img src={notification} alt="notifiy" />
            </Notification>
            <Profile>
              {!expert ? (
                userData?.user?.profile_pic_link ? (
                  <img src={userData?.user?.profile_pic_link} alt="profile" />
                ) : (
                  <AvatarImage name={`${firstname} ${lastname}`} />
                )
              ) : expertData?.doctor?.image ? (
                <img src={expertData?.doctor?.image} alt="profile" />
              ) : (
                <AvatarImage name={expertData?.doctor?.name} />
              )}
            </Profile>
            <Name>
              {expert
                ? expertData?.doctor?.name
                : `${firstname} ${lastname?.[0]?.toUpperCase()}`}
            </Name>
            <ArrowDown>
              <img src={arrow} alt="profile" />
            </ArrowDown>
          </RightSubnavbar>
        </LeftNavbar>
      </DesktopView>
      <MobileView>
        <HamburgerBtn
          onClick={() => setClick(!click)}
          clicked={click}
          className="dashboard"
        >
          <span />
        </HamburgerBtn>
        <Logo className="mobile">
          <img src={logo} alt="logo" />
        </Logo>

        <Icons>
          <SearchIcon />
          <NotificationIcon />
        </Icons>
      </MobileView>
    </Container>
  );
}

export default DashboardNav;

const Container = styled.div`
  width: 100%;
  padding: 2em 2em 0em 2em;

  @media only Screen and (max-width: 768px) {
    padding: 2em 1em 0em 2em;
  }
`;

const DesktopView = styled.div`
  display: flex;
  justify-content: space-between;

  position: relative;

  @media only Screen and (max-width: 768px) {
    display: none;
  }
`;
const MobileView = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Logo = styled.div`
  z-index: 6;
  position: fixed;
  display: ${(props) => (props.collapse ? "none" : "block")};
  img {
    width: unset;
  }
  &.mobile {
    display: none;
    @media only Screen and (max-width: 768px) {
      position: relative;
      display: block;
      img {
        max-width: 35vw;
      }
    }
  }
`;

const Icons = styled.div`
  @media only Screen and (max-width: 750px) {
    display: flex;
    gap: 1em;
    .MuiSvgIcon-root {
      //font-size: 1.2em;
    }
  }
`;

const LeftNavbar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: ${(props) =>
    props.dashboard && !props.expert ? "space-between" : "flex-end"};
`;

const WelcomeBox = styled.div`
  margin-left: 14em;

  h1 {
    color: var(--darkGreen);
  }
  p {
    font-weight: 300;
  }
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const RightSubnavbar = styled.div`
  display: flex;
  align-items: center;
`;
const Search = styled.input`
  padding: 0.7em 2em 0.7em 2.5em;
  border-radius: 8px;
  border: 1px solid #d5d5d5;
  width: 20em;
  font-size: 16px;
  background-color: white;

  &::placeholder {
    color: #777777;
    font-size: 14px;
  }

  @media only Screen and (max-width: 480px) {
    font-size: 12px;
    padding: 1em;
  }
`;
const SearchImg = styled.div`
  position: absolute;
  top: 0.9em;
  left: 0.7em;

  img {
    width: unset;
  }

  &.mobile {
    position: relative;
  }
`;

const Notification = styled.div`
  padding: 0 0.5em;
`;

const Profile = styled.div`
  padding: 0 0.5em;
  img {
    width: 3em;
    border-radius: 50%;
  }
`;

const Name = styled.p`
  padding: 0 0.5em;
`;
const ArrowDown = styled.div`
  padding: 0 0.5em;
`;
