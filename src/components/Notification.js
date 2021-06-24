import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import SideBar from "./SideBar";
import {
  Container,
  MainBody,
  CheckBox,
  Image,
  AppointmentContainer,
  AppointmentContainerWrapper,
} from "./Appointments";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import SearchIcon from "@material-ui/icons/Search";
import { ProfileImage } from "./Overview";

function Notification({ openSidebar }) {
  return (
    <Container sidebar={openSidebar}>
      <SideBar />
      <MainBody>
        <ProfileImage>
          <img
            src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg"
            alt=""
          />
        </ProfileImage>
        <AppointmentContainerWrapper>
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

          <AppointmentContainers>
            <CheckBox className="active"></CheckBox>
            <Image>
              <img
                src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg"
                alt=""
              />
            </Image>
            <Details>
              Tobi, you've got 3 minutes left to your appointment,try not to
              keep the doctor waiting...
            </Details>
            <Time>10:45AM</Time>
          </AppointmentContainers>
          <AppointmentContainers>
            <CheckBox className="active"></CheckBox>
            <Image>
              <img
                src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg"
                alt=""
              />
            </Image>
            <Details>
              Tobi, you've got 3 minutes left to your appointment,try not to
              keep the doctor waiting...
            </Details>
            <Time>10:45AM</Time>
          </AppointmentContainers>
          <AppointmentContainers>
            <CheckBox></CheckBox>
            <Image>
              <img
                src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg"
                alt=""
              />
            </Image>
            <Details>
              Tobi, you've got 3 minutes left to your appointment,try not to
              keep the doctor waiting...
            </Details>
            <Time>10:45AM</Time>
          </AppointmentContainers>
          <AppointmentContainers>
            <CheckBox></CheckBox>
            <Image>
              <img
                src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg"
                alt=""
              />
            </Image>
            <Details>
              Tobi, you've got 3 minutes left to your appointment,try not to
              keep the doctor waiting...
            </Details>
            <Time>10:45AM</Time>
          </AppointmentContainers>
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
  grid-template-columns: 5% 10% 70% 15%;
  @media (max-width: ${800}px) {
    font-size: 15px;
  }

  @media (max-width: ${750}px) {
    font-size: 11px;
  }
  @media (max-width: ${400}px) {
    font-size: 7px;
  }
`;

const Details = styled.div``;
const Time = styled.div`
  width: 100%;
  text-align: center;
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
`;
const RightSide = styled.div``;
const NotificationSearch = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const SelectBox = styled.div``;

export const NotificationSearchIcon = styled(SearchIcon)`
  position: absolute;
  margin-left: 10px;
  color: #00000054;
`;

export const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

export const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
  padding: 10px;
  padding-left: 40px;
  width: 25em;

  @media (max-width: ${500}px) {
    width: 100%;
  }
`;
