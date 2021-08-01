import React from "react";
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
} from "./Appointments";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import SearchIcon from "@material-ui/icons/Search";
import { ProfileImage } from "./Overview";
import { Margin } from "./SelectAppointment";
import ExpertSidebar from "./Expert/ExpertSidebar";

function Notification({ expert, openSidebar }) {
  return (
    <Container sidebar={openSidebar}>
      {expert ? <ExpertSidebar /> :<SideBar />}
      <MainBody sidebar={openSidebar} className="notify">
        <HeadSection sidebar={openSidebar}>
          <h1>Notifications</h1>
          <ProfileImage sidebar={openSidebar}  className="noTopPadding">
            <img
              src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg"
              alt=""
            />
          </ProfileImage>
        </HeadSection>
        <AppointmentContainerWrapper sidebar={openSidebar}>
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
                <SearchInput placeholder="Search in chats" />
              </Search>
            </RightSide>
          </NotificationSearch>

          <Margin className="notify" />
          <AppointmentContainers>
            <CheckBox className="active"></CheckBox>
            <Image >
              <img
                src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg"
                alt=""
                className="notify"
              />
            </Image>
            <Details>
              Tobi, you've got 3 minutes left to your appointment,try not to
              keep the doctor waiting...
            </Details>
            <Time>10:45AM</Time>
          </AppointmentContainers>

          <Margin className="notify" />
          <AppointmentContainers>
            <CheckBox className="active"></CheckBox>
            <Image>
              <img
                src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg"
                alt=""
                className="notify"
              />
            </Image>
            <Details>
              Tobi, you've got 3 minutes left to your appointment,try not to
              keep the doctor waiting...
            </Details>
            <Time>10:45AM</Time>
          </AppointmentContainers>

          <Margin className="notify" />
          <AppointmentContainers>
            <CheckBox></CheckBox>
            <Image>
              <img
                src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg"
                alt=""
                className="notify"
              />
            </Image>
            <Details>
              Tobi, you've got 3 minutes left to your appointment,try not to
              keep the doctor waiting...
            </Details>
            <Time>10:45AM</Time>
          </AppointmentContainers>

          <Margin className="notify" />
          <AppointmentContainers>
            <CheckBox></CheckBox>
            <Image>
              <img
                src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg"
                alt=""
                className="notify"
              />
            </Image>
            <Details>
              Tobi, you've got 3 minutes left to your appointment,try not to
              keep the doctor waiting...
            </Details>
            <Time>10:45AM</Time>
          </AppointmentContainers>
          <Margin className="notify" />
        </AppointmentContainerWrapper>
      </MainBody>
    </Container>
  );
}

const mapStateProps = (state) => ({
  openSidebar: state.utils.openSidebar,
});

export default Notification = connect(mapStateProps)(Notification);

export const AppointmentContainers = styled(AppointmentContainer)`
  display: grid;
  grid-template-columns: 5% 10% 75% 10%;
  @media (max-width: ${800}px) {
    font-size: 15px;
  }

  @media (max-width: ${750}px) {
    font-size: 11px;
  }
  @media (max-width: ${500}px) {
    font-size: 11px;
    line-height: 16px;
    padding: .5em .5em;
    margin: 0.5em 0;
    background-color: transparent;
    border-radius: 0;
  }
`;

const Details = styled.div`
  overflow: hidden; 
  text-overflow: ellipsis; 
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
  position: absolute;
  margin-left: 10px;
  color: #c4c4c4;
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
