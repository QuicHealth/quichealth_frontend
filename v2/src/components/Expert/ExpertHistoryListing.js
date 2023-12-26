import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import apppx from "./../../assets/apppx.png";
import {
  Table,
  TableHeader,
  TableContent,
  Profile,
  Date,
  Time,
  Button,
  ButtonWrapper,
} from "../History/HistoryListing";
import { MobileCategory, MobileTitle } from "../Appointments/Upcoming";
import { SidebarCollapseContext } from "../../context/SidebarCollapseContext";
import { addAMPMToTime, formatDate } from "../../utils/MonthAndDate";
import AvatarImage from "../../utils/AvatarImage";

export const history = [
  {
    id: "0",
    docImage: "",
    name: "John Adams",
    service: "Pediatrician",
    date: "Sunday, Jun 13, 2023",
    time: "10:30AM - 11:00AM",
    price: "N5000",
  },
  {
    id: "1",
    docImage: "",
    name: " Tosin Becks",
    service: "Pediatrician",
    date: "Monday, Jun 23, 2023",
    time: "10:30AM - 11:00AM",
    price: "N5000",
  },
  {
    id: "2",
    docImage: "",
    name: " John Adams",
    service: "Pediatrician",
    date: "Sunday, Jun 13, 2023",
    time: "10:30AM - 11:00AM",
    price: "N5000",
  },
  {
    id: "3",
    docImage: "",
    name: " Tosin Becks",
    service: "Pediatrician",
    date: "Monday, Jun 23, 2023",
    time: "10:30AM - 11:00AM",
    price: "N5000",
  },
  {
    id: "4",
    docImage: "",
    name: " John Adams",
    service: "Pediatrician",
    date: "Sunday, Jun 13, 2023",
    time: "10:30AM - 11:00AM",
    price: "N5000",
  },
  {
    id: "5",
    docImage: "",
    name: "Tosin Becks",
    service: "Pediatrician",
    date: "Monday, Jun 23, 2023",
    time: "10:30AM - 11:00AM",
    price: "N5000",
  },
];

function ExpertHistoryListing({ data }) {
  const { collapse, setCollapse } = useContext(SidebarCollapseContext);
  console.log(data, "datas");
  useEffect(() => {
    setCollapse(false);
  }, []);
  return (
    <Table>
      <TableHeader className="expert">
        <p>Profile</p>
        <p>Date</p>
        <p>Time</p>
        <p></p>
      </TableHeader>
      {data
        ?.reverse()
        .filter((history) => history.payment_status === "PAID")
        .map((hist, id) => {
          return (
            <TableContent className="expert" key={hist.id}>
              <MobileCategory className="history">
                <Profile>
                  {hist?.user?.profile_pic_link ? (
                    <img src={hist?.user?.profile_pic_link} alt="pix" />
                  ) : (
                    <AvatarImage
                      name={`${hist?.user?.firstname} ${hist?.user?.lastname}`}
                    />
                  )}
                  {hist?.user?.firstname} {hist?.user?.lastname}
                </Profile>
                <ButtonWrapper className="mobilescreen">
                  <Link to={`/expert-history/${hist.id}`}>
                    <Button>View details</Button>
                  </Link>
                </ButtonWrapper>
              </MobileCategory>

              <MobileCategory>
                <MobileTitle>Date</MobileTitle>
                <Date>{formatDate(hist?.date)}</Date>
              </MobileCategory>

              <MobileCategory className="">
                <MobileTitle>Time</MobileTitle>
                <Time>
                  {addAMPMToTime(hist.start)} - {addAMPMToTime(hist.end)}
                </Time>
              </MobileCategory>

              <ButtonWrapper className="fullscreen">
                <Link to={`/expert-history/${hist.id}`}>
                  <Button>View details</Button>
                </Link>
              </ButtonWrapper>
            </TableContent>
          );
        })}
    </Table>
  );
}

export default ExpertHistoryListing;
