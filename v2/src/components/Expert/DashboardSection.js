import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
import dayjs from "dayjs";
import styled from "styled-components";
import expertdash from "./../../assets/expertdash.svg";
import booked from "./../../assets/booked.svg";
import apppx from "./../../assets/apppx.png";
import setavail from "./../../assets/setAvail.png";
import SetAppointment from "../SetAppointment/SetAppointment";
import { Link, useOutletContext } from "react-router-dom";
import AvatarImage from "../../utils/AvatarImage";
import { addAMPMToTime, formatDate } from "../../utils/MonthAndDate";
// import ViewProfile from "../ViewProfile/ViewProfile";

function DashboardSection() {
 
  const [modal, setModal] = useState(false);
  const { expertData } = useOutletContext();

  const currentDate = dayjs().format("MMM D, YYYY");
  const time = dayjs().format("hh:mm A");

  const totalPendingApps = expertData?.doctor.appointments?.filter(
    (app) => app.payment_status === "PAID" && app.status === "pending"
  ).length;

  const totalBookedApps = expertData?.doctor.appointments?.filter(
    (app) => app.payment_status === "PAID" && app.status === "passed"
  ).length;

  console.log(expertData, "expert");
  return (
    <Container>
      <Sidebar></Sidebar>
      <Layout>
        <DashHero>
          <LeftSection>
            <HeroDate>
              {dayjs().format("dddd")}, {currentDate} &nbsp; &nbsp; &nbsp;{" "}
              {time}
            </HeroDate>
            <HeroTitle>Good day {expertData?.doctor?.name}</HeroTitle>
            <HeroSubtitle>
              You have <b>{expertData?.totalPendingAppointments}</b> appointment{" "}
              {expertData?.totalPendingAppointments > 1 ? "s" : ""} remaining
              today.
            </HeroSubtitle>
            <SetAvailable onClick={() => setModal(true)}>
              <SetAvailableIcon>
                <img src={setavail} alt="setAvailabilty" />
              </SetAvailableIcon>
              <Available>Set availability</Available>
            </SetAvailable>
          </LeftSection>
          <RightSection>
            <img src={expertdash} alt="dash" />
          </RightSection>
        </DashHero>

        <SetAvailableMobile onClick={() => setModal(true)}>
          <SetAvailableIcon>
            <img src={setavail} alt="setAvailabilty" />
          </SetAvailableIcon>
          <Available className="mobile">Set availability</Available>
        </SetAvailableMobile>

        <Appointment>
          <UpcomingApp>
            <h2>Upcoming Appointment</h2>

            <Table>
              {expertData?.doctor?.appointments
                ?.filter(
                  (app) =>
                    app.payment_status === "PAID" && app.status === "pending"
                )
                .map((appointment, id) => {
                  return (
                    <TableContent key={id}>
                      <AppDetail>
                        <Image>
                          {appointment?.user?.profile_pic_link ? (
                            <img
                              src={appointment?.user?.profile_pic_link}
                              alt="pix"
                            />
                          ) : (
                            <AvatarImage
                              name={`${appointment?.user?.firstname} ${appointment?.user?.lastname}`}
                            />
                          )}
                        </Image>
                        <AppDetailContent>
                          <Name>
                            {" "}
                            {appointment?.user?.firstname}{" "}
                            {appointment?.user?.lastname}
                          </Name>
                          <Date>{formatDate(appointment?.date)}</Date>
                          <Time>{addAMPMToTime(appointment.start)}</Time>
                        </AppDetailContent>
                      </AppDetail>
                      <ViewDetailsButton>
                        <Link
                          to={`/expert-dashboard/appointment/${appointment.unique_id}`}
                        >
                          <ViewDetails>View Details</ViewDetails>
                        </Link>
                      </ViewDetailsButton>
                    </TableContent>
                  );
                })}
            </Table>
          </UpcomingApp>
          <OtherApp>
            <OtherBox>
              <img src={booked} alt="booked" />
              <div>
                <h1>{totalBookedApps}</h1>
                <h4>Appointment Booked</h4>
              </div>
            </OtherBox>
            <OtherBox>
              <img src={booked} alt="booked" />
              <div>
                <h1>{totalPendingApps}</h1>
                <h4>Upcoming Appointments</h4>
              </div>
            </OtherBox>
            <OtherBox>
              <img src={booked} alt="booked" />
              <div>
                <h1>N 0</h1>
                <h4>Total Earnings</h4>
              </div>
            </OtherBox>
          </OtherApp>
        </Appointment>

        {modal && (
          <SetAppointment
            setModal={setModal}
            doctorId={expertData?.doctor?.id}
            docAvailability={expertData?.doctor?.availablity}
          />
        )}
      </Layout>
    </Container>
  );
}

export default DashboardSection;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 15em auto;
  width: 100%;

  @media only Screen and (max-width: 768px) {
    grid-template-columns: 100%;
  }
`;
export const Sidebar = styled.div`
  @media only Screen and (max-width: 768px) {
    display: none;
  }
`;
export const Layout = styled.div`
  margin: 0em 1em;

  @media only Screen and (max-width: 768px) {
    padding: 0;
  }

  @media only Screen and (max-width: 350px) {
    margin: 1em 0.5em;
  }
`;

const DashHero = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 55% 45%;
  position: relative;
  padding: 1rem 3rem 2rem 3rem;
  border-radius: 15px;
  justify-items: end;
  // align-items: center;
  margin-top: 2rem;
  background-color: var(--white);

  @media only Screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem 1rem 2rem 1rem;
    margin-top: 0rem;
  }
`;

const LeftSection = styled.div`
  width: calc(40% + 9vw);
  margin-top: 5vw;

  width: 100%;
  /* margin: 1rem auto; */

  @media only Screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    /* justify-content: center;
    align-items: center; */
    margin-top: 0vw;
  }
`;

const RightSection = styled.div`
  position: relative;
  display: block;
  img {
    width: unset;
  }

  @media only Screen and (max-width: 768px) {
    margin-top: 2rem;
    display: none;
  }
`;

const HeroDate = styled.p`
  color: var(--grey);
  font-weight: 300;

  @media only Screen and (max-width: 350px) {
    font-size: 12px;
  }
`;
const HeroTitle = styled.h2`
  padding: 1em 0;
  font-size: 3vw;
  font-weight: bolder;
  color: var(--lightGreen);

  @media only Screen and (max-width: 768px) {
    font-size: 7vw;
  }
`;
const HeroSubtitle = styled.p`
  color: var(--grey);
  font-weight: 300;
  @media only Screen and (max-width: 350px) {
    font-size: 12px;
  }
`;

const ViewDetails = styled.button`
  font-size: 15px;
  padding: 0.8rem 0.6rem;
  border-radius: 7px;
  color: var(--lightGreen);
  background-color: transparent;
  width: 8em;
  font-weight: 600;
  border: 1px solid var(--lightGreen);
  display: flex;
  -webkit-box-align: center;
  cursor: pointer;
  justify-content: center;
  transition: all 0.2s ease 0s;

  &:hover {
    opacity: 0.5;
  }

  @media only Screen and (max-width: 768px) {
    font-size: 13px;
    padding: 0.5rem 0.3rem;
    width: 7em;
  }

  @media only Screen and (max-width: 300px) {
    font-size: 11px;
    //padding: 0.5rem 0.3rem;
    width: 7em;
  }
`;

const Image = styled.div`
  img {
    width: 3em;
    border-radius: 50%;
  }
`;
const Name = styled.p`
  font-weight: 600;
`;
const Date = styled.p``;
const Time = styled.p``;

const Appointment = styled.div`
  display: grid;
  grid-template-columns: 70% auto;
  width: 100%;
  padding: 2em 0;

  @media only Screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    flex-direction: column-reverse;
    align-items: center;
  }
`;

const UpcomingApp = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 1.5em 1em 1.5em 1em;
  width: 100%;

  h2 {
    font-weight: 600;
    color: var(--darkGreen);
    padding-bottom: 1.5em;
    font-size: 1.2em;
  }

  @media only Screen and (max-width: 350px) {
    padding: 1em 0.5em;
    h2 {
      font-size: 1em;
    }
  }
`;

const Table = styled.div``;
const TableContent = styled.div`
  display: grid;
  grid-template-columns: 72% 25%;
  gap: 0 2em;
  color: rgb(89, 89, 89);
  border-bottom: 1px solid rgb(213, 213, 213);
  justify-items: center;
  align-items: center;
  justify-content: center;
  padding: 0.5em 0;

  @media only Screen and (max-width: 750px) {
    gap: 0 0em;
  }
`;

const AppDetail = styled.div`
  display: flex;
  padding: 1em 0px;
  align-items: center;
  width: 100%;

  p {
    padding: 1em;
    text-align: center;
    font-size: 15px;
    &:last-child {
      text-align: right;
      margin-right: 1em;
    }
  }

  @media only Screen and (max-width: 768px) {
    p {
      padding: 0 0.5em;
      font-size: 13px;
    }
  }

  @media only Screen and (max-width: 350px) {
    p {
      font-size: 10px;
      padding: 0 0.3rem;
      // width: 7em;
    }
  }
`;

const AppDetailContent = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  @media only Screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ViewDetailsButton = styled.div``;

const OtherApp = styled.div`
  padding-left: 2em;

  @media only Screen and (max-width: 768px) {
    display: flex;
    gap: 1.5em;
    padding-left: 0;
  }

  @media only Screen and (max-width: 359px) {
    display: flex;
    gap: 0.5em;
    padding-left: 0;
  }
`;

const OtherBox = styled.div`
  display: grid;
  grid-template-columns: 30% auto;
  background-color: white;
  border-radius: 10px;
  padding: 1.5em 1em 1.5em 1em;
  justify-items: center;
  align-items: center;
  justify-content: start;
  margin-bottom: 1em;

  h1 {
    color: #164e73;
    font-size: 1.5em;
  }

  h4 {
    color: #777777;
    font-weight: 600;
    font-size: 13px;
  }
  img {
    width: unset;
  }

  @media only Screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;

    h1 {
      text-align: center;
      padding: 0.8em 0 0.2em 0;
      font-size: 1.2em;
    }

    h4 {
      text-align: center;
    }
  }

  @media only Screen and (max-width: 350px) {
    padding: 1em 0.5em;
    width: 6em;
    justify-content: space-between;

    h1 {
      text-align: center;
      padding: 0.5em 0 0.2em 0;
      font-size: 1em;
    }

    h4 {
      font-size: 10px;
    }
  }
`;

const SetAvailable = styled.div`
  margin-top: 2em;
  display: flex;
  padding: 0.8rem 0.6rem;
  border-radius: 7px;
  border: 1px solid var(--lightGreen);
  width: 15em;
  cursor: pointer;
  align-items: center;
  transition: all 0.5s ease-in-out;
  justify-content: center;
  align-items: center;
  :hover {
    opacity: 0.6;
  }
  @media only Screen and (max-width: 480px) {
    display: none;
  }
`;

const SetAvailableMobile = styled.div`
  display: none;
  //justify-content: flex-end;
  cursor: pointer;
  align-items: center;
  transition: all 0.5s ease-in-out;
  margin: 1em 0;
  :hover {
    opacity: 0.6;
  }
  @media only Screen and (max-width: 768px) {
    display: flex;
  }
`;

const SetAvailableIcon = styled.span`
  color: var(--lightGreen);
`;
const Available = styled.p`
  font-size: 16px;
  letter-spacing: 0.1px;
  margin-left: 0.5em;
  font-weight: 400;
  color: var(--lightGreen);
  background-color: transparent;

  &.mobile {
    font-weight: 600;
  }
`;
