import React, { lazy, useContext, useEffect } from "react";
import styled from "styled-components";
import { Container } from "../Dashboard/DashboardSection";
import { Layout, Title as T } from "../Notifications/NotificationLayout";
import { Link } from "react-router-dom";
import { MobileCategory, MobileTitle } from "../Appointments/Upcoming";
//import ExpertHistoryListing from "../Expert/ExpertHistoryListing";
import { SidebarCollapseContext } from "../../context/SidebarCollapseContext";
import { useGetHistory } from "../../queries/useAppointment";
import { Spin } from "../../utils/Spinners";
import { addAMPMToTime, formatDate } from "../../utils/MonthAndDate";
import dayjs from "dayjs";
import AvatarImage from "../../utils/AvatarImage";

export const history = [
  {
    id: "0",
    docImage: "",
    name: "Dr John Adams",
    service: "Pediatrician",
    date: "Sunday, Jun 13, 2023",
    time: "10:30 AM",
    price: "N5000",
  },
  {
    id: "1",
    docImage: "",
    name: "Dr Tosin Becks",
    service: "Pediatrician",
    date: "Monday, Jun 23, 2023",
    time: "10:30 AM",
    price: "N5000",
  },
  {
    id: "2",
    docImage: "",
    name: "Dr John Adams",
    service: "Pediatrician",
    date: "Sunday, Jun 13, 2023",
    time: "10:30 AM",
    price: "N5000",
  },
  {
    id: "3",
    docImage: "",
    name: "Dr Tosin Becks",
    service: "Pediatrician",
    date: "Monday, Jun 23, 2023",
    time: "10:30 AM",
    price: "N5000",
  },
  {
    id: "4",
    docImage: "",
    name: "Dr John Adams",
    service: "Pediatrician",
    date: "Sunday, Jun 13, 2023",
    time: "10:30 AM",
    price: "N5000",
  },
  {
    id: "5",
    docImage: "",
    name: "Dr Tosin Becks",
    service: "Pediatrician",
    date: "Monday, Jun 23, 2023",
    time: "10:30 AM",
    price: "N5000",
  },
];

const ExpertHistoryListing = lazy(() =>
  import("../Expert/ExpertHistoryListing")
);

const PatientListing = ({ history }) => {
  formatDate();
  if (!history?.length) return <div>No History is available</div>;
  return (
    <Table>
      <TableHeader>
        <p>Profile</p>
        <p>Service</p>
        <p>Date</p>
        <p>Time</p>
        <p></p>
      </TableHeader>
      {history.map((hist, id) => {
        return (
          <TableContent key={hist.id}>
            <MobileCategory className="history">
              <Profile>
                {hist?.doctor?.profile_pic_link ? (
                  <img src={hist?.doctor?.profile_pic_link} alt="pix" />
                ) : (
                  <AvatarImage name={hist?.doctor?.name} />
                )}

                {hist?.doctor?.name}
              </Profile>

              <ButtonWrapper className="mobilescreen">
                <Link to={`/history/${hist.id}`}>
                  <Button>View details</Button>
                </Link>
              </ButtonWrapper>
            </MobileCategory>

            <MobileCategory>
              <MobileTitle>Speciality</MobileTitle>
              <Service>{hist.doctor.specialty}</Service>
            </MobileCategory>

            <MobileCategory>
              <MobileTitle>Date</MobileTitle>
              <Date> {formatDate(hist.appointments.date)}</Date>
            </MobileCategory>

            <MobileCategory className="">
              <MobileTitle>Time</MobileTitle>
              <Time>
                {addAMPMToTime(hist.appointments.start)} -{" "}
                {addAMPMToTime(hist.appointments.end)}
              </Time>
            </MobileCategory>

            <ButtonWrapper className="fullscreen">
              <Link to={`/history/${hist.id}`}>
                <Button>View details</Button>
              </Link>
            </ButtonWrapper>
          </TableContent>
        );
      })}
    </Table>
  );
};
function HistoryListing({ expert }) {
  const { collapse, setCollapse } = useContext(SidebarCollapseContext);
  const { data, isLoading } = useGetHistory(expert);

  console.log(data, "history");
  useEffect(() => {
    setCollapse(false);
  }, []);
  return (
    <Container collapse={collapse}>
      {isLoading && <Spin />}
      <div></div>
      <Layout style={{ minHeight: "85vh" }}>
        <Title>History</Title>
        {expert ? (
          <ExpertHistoryListing data={data?.data} />
        ) : (
          <PatientListing history={data?.data} />
        )}
      </Layout>
    </Container>
  );
}

export default HistoryListing;

const Title = styled(T)`
  color: var(--darkGreen);
  margin-bottom: 3em;
`;

export const Table = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 1.5em 1em 1.5em 1em;
  margin-bottom: 2em;

  @media only Screen and (max-width: 768px) {
    background-color: transparent;

    &.expert {
      padding: 1.5em 0;
    }
  }
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 20%);
  font-weight: 600;
  color: var(--grey);
  border-bottom: 1px solid #d5d5d5;
  justify-items: center;
  p {
    padding: 1em;
    //text-align: center;
    // padding-left: 2em;
    &:last-child {
      text-align: right;
      padding-right: 1em;
      margin-right: 2em;
    }

    &:first-child {
      //text-align: left;
      margin-right: 5vw;
    }
  }

  &.expert {
    /* display: flex;
    justify-content: space-between; */
    grid-template-columns: repeat(4, 25%);
  }

  @media only Screen and (max-width: 768px) {
    display: none;
  }
`;

export const Profile = styled.p`
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 15px;
  gap: 1em;

  img {
    border-radius: 50%;
    width: 3em;
  }
`;
const Service = styled.p`
  font-size: 15px;
`;
export const Date = styled.p`
  font-size: 15px;
`;
export const Time = styled.p`
  font-size: 15px;
  /* text-align: right;
  margin-right: 1em; */
`;

export const TableContent = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 20%);
  color: #595959;
  align-items: center;
  padding: 1em 0;
  border-bottom: 1px solid #d5d5d5;
  p {
    padding: 1em;
    text-align: center;
    &:last-child {
    }
  }
  &.expert {
    display: flex;
    justify-content: space-between;
    padding: 1em 0.5em;
    p {
      padding: 0;
    }
  }
  @media only Screen and (max-width: 768px) {
    display: block;
    border-bottom: 0;
    background-color: white;
    margin-bottom: 1em;
    padding: 1em;
    border-radius: 10px;
    p:nth-child(n + 1) {
      font-weight: 300;
    }
    p:nth-child(n + 2) {
      font-weight: 500;
    }

    &.expert {
      display: block;
    }
  }
`;

export const Button = styled.button`
  //margin-top: 2rem;
  font-size: 15px;
  padding: 0.8rem 2rem;
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
    font-size: 14px;
    padding: 0.8rem 0.8em;
  }
`;

export const ButtonWrapper = styled.div`
  display: block;
  &.mobilescreen {
    display: none;
  }

  &.fullscreen {
    display: flex;
    justify-content: center;
  }
  @media only Screen and (max-width: 768px) {
    &.mobilescreen {
      display: block;
    }
    &.fullscreen {
      display: none;
    }
  }
`;
