import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import SideBar from "./SideBar";
import { NavigateNext } from "@material-ui/icons";
import {
  getDashboard,
  pageUp,
  getLocation,
  getHospitals,
  getNotifications,
} from "../redux/actions";
import { useHistory } from "react-router-dom";

const userActivity = [
  {
    AppointmentsBooked: 60,
    PendingAppointments: 16,
    SubscriptionPlan: "premium",
    Sessions: 12,
  },
];

export const PageLimtier = ({
  RowCount,
  appointment,
  TotalCount,
  increment,
  decrement,
  limit,
  setCount,
  count,
  array,
}) => {
  return (
    <OverviewFoot className={appointment ? "appointment" : ""}>
      <RowPage>
        <p>Rows per Page </p>
        <span>{limit}</span>
        <Icon>
          <svg
            width="8"
            height="5"
            viewBox="0 0 8 5"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M.984.5h6.03c.417 0 .626.504.33.8L4.33 4.315a.47.47 0 0 1-.663 0L.653 1.299A.468.468 0 0 1 .983.5Z"
              fill="#9FA2B4"
            />
          </svg>
        </Icon>
      </RowPage>
      <PageNo>
        <PageBox>
          <span>{count === 0 ? count + 1 : count}</span> -{" "}
          <span>{count === 0 ? limit : count + limit}</span> of
          <span> {array?.length}</span>
        </PageBox>
        <IconSvg>
          <div onClick={() => decrement(setCount, count, limit)}>
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 13 1.07 7.07a.1.1 0 0 1 0-.14L7 1"
                stroke="#9FA2B4"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <div onClick={() => increment(setCount, count, limit, array)}>
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m1 13 5.93-5.93a.1.1 0 0 0 0-.14L1 1"
                stroke="#9FA2B4"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </div>
        </IconSvg>
      </PageNo>
    </OverviewFoot>
  );
};

export const decrement = (setPosition, position, limit) => {
  if (position < 1) {
    return position;
  }
  setPosition(position - limit);
  return position;
};

export const increment = (setPosition, position, limit, array) => {
  if (position + limit > array?.length - 1) {
    return position;
  }
  setPosition(position + limit);
  return position;
};

function Overview({
  openSidebar,
  getDashboard,
  pageUp,
  getLocation,
  getHospitals,
  getAllNotifications,
  getSettings,
}) {
  let firstName;
  let routerHistory = useHistory();
  firstName = localStorage.getItem("firstname");
  const [userAddress, setUserAddress] = useState("");

  const getAddressofCoordinate = () => {
    const longitude = localStorage.getItem("longitude");
    const latitude = localStorage.getItem("latitude");
    fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => setUserAddress(data.results[0].formatted))
      .catch((error) => alert(error));

    // console.log(getClosestHospital(latitude, longitude));
  };

  const bookAnAppointment = () => {
    routerHistory.push("/select-appointment");
  };

  Math.radians = (degree) => (degree * Math.PI) / 180;

  const numbers = [1, 2, 3, 4, 6, 9, 10, 11, 12, 13, 14];
  const [limit, setLimit] = useState(3);
  const [count, setCount] = useState(0);
  let filteredNumbers = numbers.slice(count, count + limit);

  const [appoint, setAppointment] = useState(filteredNumbers);

  useEffect(() => {
    setAppointment(filteredNumbers);
  }, [count]);

  console.log(appoint, count, filteredNumbers, "limit");

  useEffect(() => {
    getDashboard();
    pageUp();
    getLocation();
    getHospitals();
    getAllNotifications();
  }, []);

  return (
    <Container sidebar={openSidebar}>
      {console.log(userAddress)}
      <SideBar />
      <MainBody className="dashboard-overview">
        <ProfileImage sidebar={openSidebar}>
          <img
            src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg"
            alt=""
          />
        </ProfileImage>
        <SectionOne>
          <BodyHeading className="dashboard-overview">
            Hi, <span className="bold name">{firstName}</span>
          </BodyHeading>
          <ConsultExpert onClick={bookAnAppointment}>
            <p>Book Appointment </p>
            <NavigateNext />
          </ConsultExpert>
        </SectionOne>
        <SectionTwo>
          {userActivity.map((activity, id) => (
            <AppointmentContainer>
              <AppointmentDetailsBox>
                <AppointmentTitle>Appointment Booked</AppointmentTitle>
                <AppointmentBody>{activity.AppointmentsBooked}</AppointmentBody>
              </AppointmentDetailsBox>

              <AppointmentDetailsBox>
                <AppointmentTitle>Pending Appointments</AppointmentTitle>
                <AppointmentBody>
                  {activity.PendingAppointments}
                </AppointmentBody>
              </AppointmentDetailsBox>

              <AppointmentDetailsBox>
                <AppointmentTitle>Subscription Plan</AppointmentTitle>
                <AppointmentBody>{activity.SubscriptionPlan}</AppointmentBody>
              </AppointmentDetailsBox>

              <AppointmentDetailsBox>
                <AppointmentTitle>Sessions</AppointmentTitle>
                <AppointmentBody>{activity.Sessions}</AppointmentBody>
              </AppointmentDetailsBox>
            </AppointmentContainer>
          ))}

          {/* <BodyHeading className="bold">
            What do you want to do today?
          </BodyHeading>
          <BodyOption>
            <Option className="left-option">Book a physical appointment</Option>
            <Option onClick={bookAnAppointment}>
              Consult an expert online
            </Option>
          </BodyOption> */}
        </SectionTwo>

        <SectionThree>
          <OverviewContainer>
            <OverviewSectionOne>
              <SideA>Notification</SideA>
              <SideB>
                <SortBox>
                  <Icon>
                    <svg
                      width="14"
                      height="12"
                      viewBox="0 0 14 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M.129 2.268 2.316.125a.444.444 0 0 1 .618 0l2.187 2.143c.276.27.08.732-.31.732H3.501v8.571a.433.433 0 0 1-.438.429h-.874a.433.433 0 0 1-.438-.429V3H.438c-.39 0-.584-.462-.31-.732Zm6.434-.554h7A.433.433 0 0 0 14 1.286V.429A.433.433 0 0 0 13.562 0h-7a.433.433 0 0 0-.437.429v.857c0 .236.196.428.438.428Zm-.438 3v-.857c0-.237.196-.428.438-.428h5.25c.241 0 .437.191.437.428v.857a.433.433 0 0 1-.438.429h-5.25a.433.433 0 0 1-.437-.429Zm0 6.857v-.857c0-.236.196-.428.438-.428h1.75c.241 0 .437.192.437.428v.857a.433.433 0 0 1-.438.429h-1.75a.433.433 0 0 1-.437-.429Zm0-3.428v-.857c0-.237.196-.429.438-.429h3.5c.241 0 .437.192.437.429v.857a.433.433 0 0 1-.438.428h-3.5a.433.433 0 0 1-.437-.428Z"
                        fill="#C5C7CD"
                      />
                    </svg>
                  </Icon>
                  <Sort>Sort</Sort>
                </SortBox>
                <FilterBox>
                  <Icon>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.437 0H.563c-.5 0-.752.606-.398.96L4.5 5.295v4.83c0 .184.09.355.24.46l1.875 1.313a.563.563 0 0 0 .885-.461V5.295L11.835.96a.563.563 0 0 0-.398-.96Z"
                        fill="#C5C7CD"
                      />
                    </svg>
                  </Icon>
                  <Sort>Filter</Sort>
                </FilterBox>
              </SideB>
            </OverviewSectionOne>

            <OverviewSectionTwo>
              <OverviewHead>
                <DescBox>
                  <Desc>Details</Desc>
                  <Desc className="name">Name</Desc>
                  <Desc className="date">Date</Desc>
                </DescBox>
              </OverviewHead>

              <OverviewBody>
                <OverviewBox>
                  <DetailBox>
                    <Image>
                      <img src="./images/avatar/img1.jpg" alt="image" />
                    </Image>
                    <div>
                      <DetailsBody>Payment not going through</DetailsBody>
                      <DetailsTime>Updated an 2 days ago</DetailsTime>
                    </div>
                  </DetailBox>

                  <NameBox>
                    <DetailsBody>Christain Bale</DetailsBody>
                    <DetailsTime>on 24.05.2019</DetailsTime>
                  </NameBox>

                  <DateBox>
                    <DetailsBody>May 25, 2019</DetailsBody>
                    <DetailsTime>5.00 PM</DetailsTime>
                  </DateBox>
                </OverviewBox>

                <OverviewBox>
                  <DetailBox>
                    <Image>
                      <img src="./images/avatar/img1.jpg" alt="image" />
                    </Image>
                    <div>
                      <DetailsBody>Payment not going through</DetailsBody>
                      <DetailsTime>Updated an 2 days ago</DetailsTime>
                    </div>
                  </DetailBox>

                  <NameBox>
                    <DetailsBody>Christain Bale</DetailsBody>
                    <DetailsTime>on 24.05.2019</DetailsTime>
                  </NameBox>

                  <DateBox>
                    <DetailsBody>May 25, 2019</DetailsBody>
                    <DetailsTime>5.00 PM</DetailsTime>
                  </DateBox>
                </OverviewBox>

                <OverviewBox>
                  <DetailBox>
                    <Image>
                      <img src="./images/avatar/img1.jpg" alt="image" />
                    </Image>
                    <div>
                      <DetailsBody>Payment not going through</DetailsBody>
                      <DetailsTime>Updated an 2 days ago</DetailsTime>
                    </div>
                  </DetailBox>

                  <NameBox>
                    <DetailsBody>Christain Bale</DetailsBody>
                    <DetailsTime>on 24.05.2019</DetailsTime>
                  </NameBox>

                  <DateBox>
                    <DetailsBody>May 25, 2019</DetailsBody>
                    <DetailsTime>5.00 PM</DetailsTime>
                  </DateBox>
                </OverviewBox>

                <OverviewBox>
                  <DetailBox>
                    <Image>
                      <img src="./images/avatar/img1.jpg" alt="image" />
                    </Image>
                    <div>
                      <DetailsBody>Payment not going through</DetailsBody>
                      <DetailsTime>Updated an 2 days ago</DetailsTime>
                    </div>
                  </DetailBox>

                  <NameBox>
                    <DetailsBody>Christain Bale</DetailsBody>
                    <DetailsTime>on 24.05.2019</DetailsTime>
                  </NameBox>

                  <DateBox>
                    <DetailsBody>May 25, 2019</DetailsBody>
                    <DetailsTime>5.00 PM</DetailsTime>
                  </DateBox>
                </OverviewBox>
              </OverviewBody>

              <PageLimtier
                RowCount={4}
                TotalCount={1024}
                increment={increment}
                decrement={decrement}
                setCount={setCount}
                count={count}
                limit={limit}
                array={numbers}
              />
            </OverviewSectionTwo>
          </OverviewContainer>
        </SectionThree>
      </MainBody>
    </Container>
  );
}

const mapStateProps = (state) => ({
  openSidebar: state.utils.openSidebar,
  locationAccess: state.hospital.locationAccess,
  hospitals: state.utils.hospitals,
});
const mapDispatchToProps = (dispatch) => {
  return {
    getDashboard: () => dispatch(getDashboard()),
    pageUp: () => dispatch(pageUp()),
    getLocation: () => dispatch(getLocation()),
    getHospitals: () => dispatch(getHospitals()),
    getAllNotifications: () => dispatch(getNotifications()),
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

export const Container = styled.div`
  display: grid;
  grid-template-columns: ${({ sidebar }) => (sidebar ? "20% 80%" : "10% auto")};
  height: 100vh;
  scroll-behavior: smooth;
  @media (max-width: ${800}px) {
    grid-template-columns: 25% 74%;
  }

  @media (max-width: ${700}px) {
    grid-template-columns: 12% 88%;
  }
`;
export const MainBody = styled.div`
  background: linear-gradient(180deg, #e7e7ed, #ffffff);
  border-top-right-radius: 15px;
  margin-right: 0.7em;
  padding: 0 0.7em;
  transition: all 2s ease-in;
`;

export const BodyHeading = styled.h2`
  color: #070647;
  padding: 1em;
  font-size: 1.8em;
  &.dashboard-overview {
    padding-top: 0;
    padding-left: 0.5em;
    font-family: "Mulish", sans-serif;
  }
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

const SectionTwo = styled.div`
  margin: 3em auto 0 auto;
  font-family: "Mulish", sans-serif;

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
    margin-top: 0.5em;
    height: 2.5em;
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

const SectionOne = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3em;
  align-items: baseline;
`;
const ConsultExpert = styled.div`
  font-size: 18px;
  display: flex;
  align-items: center;
  padding: 0 0.5em;
  height: 3em;
  border-radius: 10px;
  background-color: #2fa5a9;
  color: #ffffffe6;
  transition: all 0.5s ease;
  font-family: "Poppins", sans-serif;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  .MuiSvgIcon-root {
    font-size: 1.5em;
    position: relative;
    left: 0.2em;
  }
  p {
    font-weight: 600;
  }
`;

const AppointmentDetailsBox = styled.div`
  background-color: #fff;
  width: 15em;
  height: 8em;
  display: flex;
  border-radius: 8px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 0px solid #3751ff;
  border-width: none;
  transition: all 0.1s;

  &:hover,
  &:hover h3,
  &:hover h4 {
    cursor: pointer;
    //border-width: thin;
    opacity: 0.8;
    color: #3751ff !important;
  }
`;

const AppointmentTitle = styled.h3`
  color: #9fa2b4;
  transition: all 0.5s;
`;
const AppointmentBody = styled.h4`
  font-size: 2.5em;
  transition: all 0.5s;
  padding-top: 0.3em;
`;

const AppointmentContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SectionThree = styled.div`
  margin: 3em 0;
`;

const OverviewContainer = styled.div`
  background-color: #ffffff;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const OverviewSectionOne = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2em;
  border: 1px solid #dfe0eb;
  border-bottom: none;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;
const SideA = styled.p`
  color: #252733;
  font-weight: 700;
  font-size: 19px;
  line-height: 23.85px;
  letter-spacing: 0.4px;
`;
const SideB = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 1em;
`;
const SortBox = styled.div`
  display: flex;
`;
const FilterBox = styled.div`
  display: flex;
`;
const Icon = styled.div`
  padding-right: 0.5em;
`;
const Sort = styled.div`
  color: #4b506d;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.2px;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
const OverviewSectionTwo = styled.div`
  border: 1px solid #dfe0eb;
  border-top: none;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
`;

const OverviewHead = styled.div`
  border: 1px solid #dfe0eb;
  border-top: none;
`;
const Desc = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 17.57px;
  letter-spacing: 0.2px;
  color: #9fa2b4;

  &.name {
    position: relative;
    left: 4em;
  }
  &.date {
    position: relative;
    left: 6.5em;
    width: 70%;
  }
`;
const DescBox = styled.div`
  padding: 1em;
  display: grid;
  grid-template-columns: 37% 33% 30%;
  padding: 1em 2em;
`;

const OverviewBody = styled.div``;
const OverviewBox = styled.div`
  border: 1px solid #dfe0eb;
  border-top: none;
  padding: 1em;
  display: grid;
  grid-template-columns: 37% 33% 30%;
  transition: all 0.3s ease-in;
  &:hover {
    background-color: #3751ff0a;
    cursor: pointer;
  }
`;
const DetailBox = styled.div`
  display: flex;
  column-gap: 1em;
  padding-left: 1em;
  align-items: center;
`;

const Image = styled.div``;
const DetailsBody = styled.h3`
  color: #252733;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.2px;
  padding-bottom: 0.3em;
`;
const DetailsTime = styled.h5`
  color: #c5c7cd;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.2px;
  padding-top: 0.3em;
`;

const NameBox = styled.div`
  position: relative;
  left: 4em;
`;
const DateBox = styled.div`
  position: relative;
  left: 5.5em;
  width: 70%;
`;
const OverviewFoot = styled.div`
  display: flex;
  justify-content: flex-end;
  //column-gap: 5em;
  padding: 2em;

  &.appointment {
    position: relative;
    bottom: 0;
    left: 4em;
  }
`;
const RowPage = styled.div`
  display: flex;
  width: 15%;
  justify-content: space-evenly;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.3px;
  align-items: center;

  p {
    color: #9fa2b4;
  }
  span {
    color: #4b506d;
  }
`;
const PageNo = styled.div`
  display: flex;
  width: 20%;
  justify-content: space-around;
  align-items: center;
`;
const PageBox = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.3px;
  color: #9fa2b4;
  span {
  }
`;

const IconSvg = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 50%;

  svg {
    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
`;
