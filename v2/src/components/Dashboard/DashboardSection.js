import React, { useContext, useEffect } from "react";
import { NavLink, useLocation, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import dashpx from "./../../assets/dashboardpx.svg";
import apppx from "./../../assets/apppx.png";
import booked from "./../../assets/booked.svg";
import { SidebarCollapseContext } from "../../context/SidebarCollapseContext";
import { useAppointment } from "../../queries/useAppointment";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
import dayjs from "dayjs";
import AvatarImage from "../../utils/AvatarImage";
import { addAMPMToTime, formatDate } from "../../utils/MonthAndDate";

function DashboardSection() {
  const { collapse, setCollapse } = useContext(SidebarCollapseContext);
  const { data } = useAppointment();
  const { setPatientDetails } = useContext(GlobalContext);
  const { userData } = useOutletContext();
  const fakeAppointments = [
    {
      docImage: "",
      name: "Dr John Adams",
      service: "Pediatrician",
      date: "Sunday, Jun 13, 2023",
      time: "10:30 AM",
    },
    {
      docImage: "",
      name: "Dr Tosin Becks",
      service: "Pediatrician",
      date: "Monday, Jun 23, 2023",
      time: "10:30 AM",
    },
  ];
  const location = useLocation();
  const isDashboard = location.pathname.includes("dashboard") ? true : false;
  console.log(
    userData?.user,
    data,
    dayjs(data?.Appointments[0]?.updated_at).format("dddd,MMMM D,YYYY"),
    "userData"
  );

  const totalBookedApps = data?.Appointments?.filter(
    (app) => app.payment_status === "PAID" && app.status === "passed"
  ).length;
  const totalPendingApps = data?.Appointments?.filter(
    (app) => app.payment_status === "PAID" && app.status === "pending"
  ).length;

  useEffect(() => {
    setCollapse(false);
  }, []);
  useEffect(() => {
    setPatientDetails(userData?.user);
  }, [userData]);
  return (
    <Container collapse={collapse}>
      <div></div>
      <Layout>
        {isDashboard && (
          <WelcomeBox>
            <h1>Welcome, {userData?.user?.firstname}</h1>
            <p>
              {" "}
              You have {!totalPendingApps ? "no" : totalPendingApps} pending
              appointment
              {totalPendingApps > 1 ? "s" : ""}
            </p>
          </WelcomeBox>
        )}

        <DashHero>
          <LeftSection>
            <HeroContent>Get the care you need, when you need it.</HeroContent>

            <SubContent>Take control of your health with a click</SubContent>

            <NavLink to="/book-appointment">
              <Button>Book Appointment</Button>
            </NavLink>
          </LeftSection>
          <RightSection>
            <img src={dashpx} alt="dash" />
          </RightSection>
        </DashHero>

        <Appointment>
          <UpcomingApp>
            <h2>Upcoming Appointment </h2>

            <Table>
              <TableHeader>
                <p>Profile</p>
                <p>Service</p>
                <p>Date</p>
                <p>Time</p>
              </TableHeader>
              {data?.Appointments?.filter(
                (app) =>
                  app.payment_status === "PAID" && app.status === "pending"
              )?.map((appointment, id) => {
                return (
                  <TableContent key={id}>
                    <Profile>
                      {appointment?.doctor?.profile_pic_link ? (
                        <img
                          src={appointment?.doctor?.profile_pic_link}
                          alt="pix"
                        />
                      ) : (
                        <AvatarImage name={appointment?.doctor?.name} />
                      )}

                      {appointment?.doctor?.name}
                    </Profile>
                    <Service>Pediatrician</Service>
                    <Date>{formatDate(appointment?.date)}</Date>
                    <Time>{addAMPMToTime(appointment?.start)}</Time>
                  </TableContent>
                );
              })}
            </Table>
          </UpcomingApp>
          <OtherApp>
            <OtherBox>
              <img src={booked} alt="booked" />
              <span>
                <h1>{totalBookedApps}</h1>
                <h4>Appointment booked</h4>
              </span>
            </OtherBox>

            <OtherBox>
              <img src={booked} alt="booked" />

              <span>
                <h1>{totalPendingApps}</h1>
                <h4>Pending Appointments</h4>
              </span>
            </OtherBox>
          </OtherApp>
        </Appointment>
      </Layout>
    </Container>
  );
}

export default DashboardSection;

export const Container = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.collapse ? "5em auto" : "15em auto"};
  width: 100%;

  @media only Screen and (max-width: 768px) {
    grid-template-columns: 100%;
  }
`;

const Layout = styled.div`
  margin: 0em 1em;
  border-top: 1px solid;
  @media only Screen and (max-width: 768px) {
    border-top: 0;
  }
`;

const WelcomeBox = styled.div`
  display: none;
  @media only Screen and (max-width: 768px) {
    display: block;
    h1 {
      color: var(--darkGreen);
    }
    p {
      font-weight: 300;
    }
  }

  @media only Screen and (max-width: 400px) {
    h1 {
      font-size: 1.5em;
    }
    p {
      font-size: 14px;
    }
  }
`;

const DashHero = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
  position: relative;
  padding: 1rem 6rem 2rem 3rem;
  border-radius: 15px;
  justify-items: end;
  align-items: center;
  margin-top: 2rem;
  background-color: var(--lightGreen);
  @media only Screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem 1rem 2rem 1rem;
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
    justify-content: center;
    align-items: center;
  }
`;

const RightSection = styled.div`
  position: relative;
  img {
    width: unset;
  }

  @media only Screen and (max-width: 768px) {
    margin-top: 2rem;
    display: none;
  }
`;

const HeroContent = styled.h1`
  font-size: 3vw;
  //width: 28rem;
  line-height: 4vw;
  color: var(--white);

  @media only Screen and (max-width: 750px) {
    text-align: center;
    font-size: 1.7em;
    line-height: unset;
  }

  @media only Screen and (max-width: 350px) {
    // text-align: center;
    width: 90%;
    font-size: 1.1em;
    line-height: unset;
  }
`;

const SubContent = styled.h6`
  font-size: 1.5vw;
  font-weight: 300;
  line-height: 27px;
  color: var(--white);
  padding: 2rem 0;

  @media only Screen and (max-width: 768px) {
    text-align: center;
    line-height: 1.5em;
    padding: 1.8rem 0;
    width: 27em;
    font-size: 4vw;
  }
  @media only Screen and (max-width: 480px) {
    width: 21em;
  }
`;

const Button = styled.button`
  //margin-top: 2rem;
  font-size: 20px;
  padding: 0.8rem 2.5rem;
  border-radius: 10px;
  color: var(--lightGreen);
  background: var(--white);
  border: 1px solid var(--lightGreen);
  transition: all 0.2s;

  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
  &:focus {
    transform: scale(0.9);
  }
  @media only Screen and (max-width: 768px) {
    font-size: 16px;
    font-weight: 600;
  }
`;

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
    padding-bottom: 0.5em;
    font-size: 1.3em;
  }

  @media only Screen and (max-width: 350px) {
    padding: 1em 0.5em;
    h2 {
      font-size: 1em;
    }
  }
`;

const Table = styled.div`
  @media only Screen and (max-width: 768px) {
    width: 100%;
  }
`;

const TableHeader = styled.h4`
  display: grid;
  grid-template-columns: repeat(4, 25%);
  font-weight: 400;
  color: var(--darkGreen);
  border-bottom: 1px solid #d5d5d5;
  p {
    padding: 1em;
    text-align: center;
    &:last-child {
      text-align: right;
      padding-right: 1em;
      margin-right: 2em;
    }
  }

  @media only Screen and (max-width: 768px) {
    display: none;
    p {
      padding: 0 0.5em;
      font-size: 13px;
    }
  }

  @media only Screen and (max-width: 450px) {
    p {
      font-size: 12px;
      padding: 0 0.3rem;
      // width: 7em;
    }
  }
`;
const Profile = styled.p`
  display: flex;
  justify-content: space-around;
  align-items: center;

  img {
    width: 3em;
    border-radius: 50%;
  }

  @media only Screen and (max-width: 768px) {
    gap: 0.5em;
  }
`;
const Service = styled.p`
  @media only Screen and (max-width: 768px) {
    display: none;
  }
`;
const Date = styled.p``;
const Time = styled.p``;

const TableContent = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 25%);
  color: #595959;
  align-items: center;
  p {
    padding: 1em;
    text-align: center;
    &:last-child {
      text-align: right;
      margin-right: 1em;
    }
  }
  @media only Screen and (max-width: 750px) {
    gap: 0 0em;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.2em 0;
    border-bottom: 1px solid #d5d5d5;
    p {
      padding: 0 0.5em;
      font-size: 13px;
    }
  }
  @media only Screen and (max-width: 420px) {
    p {
      font-size: 12px;
      padding: 0 0.3rem;
      // width: 7em;
    }
  }
`;
const OtherApp = styled.div`
  padding-left: 2em;
  width: 100%;
  @media only Screen and (max-width: 768px) {
    display: flex;
    gap: 1.5em;
    padding-left: 0;
    justify-content: space-between;
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
  margin-bottom: 1.5em;

  h1 {
    color: #164e73;
  }

  h4 {
    color: #777777;
    font-weight: 500;
  }
  img {
    width: unset;
  }

  @media only Screen and (max-width: 480px) {
    display: flex;
    flex-direction: column;

    /* max-width: 9em; */

    h1 {
      text-align: center;
      padding: 0.8em 0 0.2em 0;
      font-size: 1.2em;
    }

    h4 {
      text-align: center;
      font-size: 14px;
    }
  }

  @media only Screen and (max-width: 350px) {
    padding: 1em 0.5em;
    //width: 6em;
    justify-content: space-between;
    display: flex;
    flex-direction: column;
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
