import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import notify from "./../../assets/notification.png";
import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import { addZeroPrefix } from "../../utils/MonthAndDate";
//var relativeTime = require('dayjs/plugin/relativeTime')
const fakeApp = [
  {
    message:
      "Your appointment with Dr. Jane starts in 5 minutes. Try not to keep her waiting",
    image: "",
    time: "3s ago",
    day: "today",
  },
  {
    message:
      "Your appointment with Dr. Jane is booked successfully. Do ensure you save the date",
    image: "",
    time: "2h ago",
    day: "today",
  },
  {
    message:
      "Dr. Anthonia just approved your appointment. Ensure you save the date",
    image: "",
    time: "2h ago",
    day: "today",
  },
  {
    message: "How did your  meeting with Dr. Jonathan go ?",
    image: "",
    time: "2h ago",
    day: "today",
  },
  {
    message:
      "Dear Jane, kindly upload your electronic medical record. This will help the doctor assess your condition and provide appro...",
    image: "",
    time: "2d ago",
    day: "today",
  },

  {
    message: "Welcome to QuicHealth Emmanuel. Do have a awesome time with us.",
    image: "",
    time: "2d ago",
    day: "Last Week",
  },
];
const extractDateFromUTCString = (utcdate) => {
  dayjs.extend(relativeTime);
  const date = utcdate?.slice(0, 10);

  const dates = new Date(utcdate).toLocaleTimeString();
  //return time interval from current time
  return dayjs(date + dates).fromNow();
};
const GenericDaysNotification = ({ day, notifications }) => {
  console.log(notifications, "notifi");
  return (
    <>
      <Day>{day}</Day>
      {notifications?.reverse().map((notification, id) => {
        return (
          <Notification key={id}>
            <ProPix>
              <img src={notify} alt="notifiy" />
            </ProPix>
            <Message>
              <p>{notification.message}</p>
              <p className="time">
                {extractDateFromUTCString(notification.created_at)}
              </p>
            </Message>
          </Notification>
        );
      })}
    </>
  );
};

// function getPreviousDay(date = new Date()) {
//   const previous = new Date(date.getTime());
//   previous.setDate(date.getDate() - 2);

//   return previous;
// }

function AllMessages() {
  const { notifications } = useOutletContext();
  const day = addZeroPrefix(dayjs().get("date"));
  const month = addZeroPrefix(dayjs().get("month") + 1);

  const year = dayjs().get("year");
  const todayDate = `${year}-${month}-${day}`;

  // const yesterdayDate = `${year}-${month}-${day - 2}`;
  // console.log(yesterdayDate, getPreviousDay(), "testin");

  // const getNotificationsByDate = (date) => {
  //   const notification = notifications?.filter(
  //     (notification) =>
  //       extractDateFromUTCString(notification?.created_at) === date
  //   );
  //   return notification;
  // };

  // const todayNotification = getNotificationsByDate(todayDate);

  // console.log(getNotificationsByDate(todayDate), "today's date");

  return (
    <Container>
      <GenericDaysNotification
        day={"Notifications"}
        notifications={notifications}
      />
      {/* <span style={{ marginTop: "5em" }}></span>
      <GenericDaysNotification day={"Others"} notification={fakeApp} /> */}
    </Container>
  );
}

export default React.memo(AllMessages);

export const Container = styled.div`
  display: grid;
  background-color: white;
  border-radius: 10px;
  margin-bottom: 5em;
  margin-top: 2em;
  padding: 1.5em 1em 1.5em 1em;
`;

export const Notification = styled.div`
  display: grid;
  grid-template-columns: 8% auto;
  border-bottom: 1px solid #d5d5d5;
  padding: 1.5em;
  align-items: center;
  @media only Screen and (max-width: 768px) {
    grid-template-columns: 20% auto;
    padding: 0.5em 0.5em;
  }
`;

export const ProPix = styled.span`
  img {
    width: unset;

    @media only Screen and (max-width: 768px) {
      width: 3em;
    }
  }
`;

export const Message = styled.span`
  @media only Screen and (max-width: 768px) {
    font-size: 12px;
  }
  p {
    color: var(--grey);
    &.time {
      margin-top: 1em;
      color: #777777;
      font-size: 12px;

      @media only Screen and (max-width: 768px) {
        font-size: 10px;
        margin-top: 0.5em;
      }
    }
  }
`;

export const Day = styled.h2`
  color: var(--grey);
  margin-left: 1em;
  padding-bottom: 0.5em;

  @media only Screen and (max-width: 768px) {
    font-size: 15px;
  }
`;
