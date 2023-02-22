import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import SideBar from "./SideBar";
import {
  Container,
  MainBody,
  CheckBox,
  Image,
  HeadSection,
  AppointmentContainer,
  AppointmentContainerWrapper,
  convertTimeToTwelveHrs,
  NoDataBox,
} from "./Appointments";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import SearchIcon from "@material-ui/icons/Search";
import { ProfileImage } from "./Overview";
import { Margin } from "./SelectAppointment";
import ExpertSidebar from "./Expert/ExpertSidebar";
import { getNotifications } from "../redux/actions/PatientActions";
import { getDoctorNotifications } from "../redux/actions/DoctorActions";

function Notification({
  expert,
  openSidebar,
  notifications,
  getAllNotifications,
  getDoctorNotifications,
  doctorNotifications,
}) {
  const GenericAppointmentContainer = ({ notification, key }) => {
    return (
      <>
        <AppointmentContainers key={key}>
          <CheckBox
            className={notification.read_reciept ? "" : "active"}
          ></CheckBox>
          <Image>
            <img
              src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg"
              alt=""
              className="notify"
            />
          </Image>
          <Details>{`${notification?.message.slice(0, 81)}...`}</Details>
          <Time>
            {convertTimeToTwelveHrs(notification?.created_at.slice(11, 16))}{" "}
            {parseInt(notification?.created_at.slice(11, 16).slice(0, 2)) > 12
              ? "PM "
              : "AM "}
          </Time>
        </AppointmentContainers>
        <Margin className="notify" />
      </>
    );
  };

  let apiCall = expert ? getDoctorNotifications : getAllNotifications;

  useEffect(() => {
    apiCall();
  }, []);

  return (
    <Container sidebar={openSidebar}>
      {expert ? <ExpertSidebar /> : <SideBar />}
      <MainBody sidebar={openSidebar} className="notify">
        <HeadSection sidebar={openSidebar}>
          <h1>Notifications</h1>
          <ProfileImage sidebar={openSidebar} className="noTopPadding">
            <img
              src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg"
              alt=""
            />
          </ProfileImage>
        </HeadSection>
        <AppointmentContainerWrapper sidebar={openSidebar}>
          {!doctorNotifications || !notifications.length ? (
            ""
          ) : (
            <NotificationSearch>
              <LeftSide>
                <SelectBox>
                  <input type="checkbox" style={{ display: "block" }} />
                </SelectBox>
                <DeleteIcon />
              </LeftSide>
              <RightSide>
                <Search>
                  <NotificationSearchIcon />
                  <SearchInput placeholder="Type here to search..." />
                </Search>
              </RightSide>
              <Margin className="notify" />
          {/* Renders doctor's notification if expert is true or render patients notification  */}
            </NotificationSearch>
          )}



          {!doctorNotifications || !notifications.length ? (
            <NoDataBox>No Notification available</NoDataBox>
          ) : expert ? (
            doctorNotifications?.map((notification, key) => {
              return (
                <GenericAppointmentContainer
                  key={key}
                  notification={notification}
                />
              );
            })
          ) : (
            notifications?.map((notification, key) => {
              return (
                <GenericAppointmentContainer
                  key={key}
                  notification={notification}
                />
              );
            })
          )}
        </AppointmentContainerWrapper>
      </MainBody>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  openSidebar: state.utils.openSidebar,
  notifications: state.patient.notifications,
  doctorNotifications: state.hospital.doctorNotifications,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAllNotifications: () => dispatch(getNotifications()),
    getDoctorNotifications: () => dispatch(getDoctorNotifications()),
  };
};

export default Notification = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);

export const AppointmentContainers = styled(AppointmentContainer)`
  display: grid;
  grid-template-columns: 5% 10% 75% 10%;
  cursor: pointer;
  transition: all 0.5s ease-in;
  @media (max-width: ${800}px) {
    font-size: 15px;
  }

  @media (max-width: ${750}px) {
    font-size: 11px;
  }
  @media (max-width: ${500}px) {
    font-size: 11px;
    line-height: 16px;
    padding: 0.5em 0.5em;
    margin: 0.5em 0;
    background-color: transparent;
    border-radius: 0;
  }

  :hover {
    opacity: 0.6;
  }
`;

const Details = styled.div`
  /* overflow: hidden;
  text-overflow: ellipsis; */
  white-space: nowrap;
`;
const Time = styled.div`
  width: 100%;
  text-align: center;

  @media (max-width: ${500}px) {
    font-size: 10px;
    line-height: 16px;
    text-align: center;
    color: #c5c5c5;
  }
`;
const LeftSide = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  width: 3em;
  align-items: center;

  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
  @media (max-width: ${500}px) {
    display: none;
  }
`;
const RightSide = styled.div``;
const NotificationSearch = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${500}px) {
    display: grid;
    grid-template-columns: 100%;
    margin-bottom: 7em;
  }
`;
const SelectBox = styled.div``;

export const NotificationSearchIcon = styled(SearchIcon)`
  position: relative;
  margin-left: 10px;
  color: #c4c4c4;
  left: 1.2em;
`;

export const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
  @media (max-width: ${500}px) {
    width: 100%;
    padding: 10px 0;
  }

  &.help {
    padding: 5px 20px 20px 20px;
    @media (max-width: ${500}px) {
      padding: 0;
    }
  }
`;

export const SearchInput = styled.input`
  outline-width: 0;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  flex: 1;
  padding: 10px;
  padding-left: 40px;
  width: 25em;
  font-size: 13px;
  line-height: 15px;

  ::placeholder {
    color: #c4c4c4;
  }

  @media (max-width: ${500}px) {
    width: 100%;
  }
`;
