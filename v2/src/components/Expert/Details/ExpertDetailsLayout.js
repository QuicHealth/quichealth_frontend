import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import apppx from "./../../../assets/apppx.png";
import back from "./../../../assets/backArrow.svg";
import { Container } from "../DashboardSection";
import { Sidebar } from "../../ViewProfile/ViewProfile";
import { Layout } from "../../Notifications/NotificationLayout";
import { Back, Name, Service } from "../../History/HistoryDetails";
import { history } from "../ExpertHistoryListing";
import { MobileCategory, MobileTitle } from "../../Appointments/Upcoming";
import {
  Date,
  Profile,
  Table,
  TableContent,
} from "../../History/HistoryListing";
import { Tabs } from "../../Appointments/Appointmentlayout";
import { useGetHistory } from "../../../queries/useAppointment";
import { addAMPMToTime, formatDate } from "../../../utils/MonthAndDate";

function ExpertDetailsLayout() {
  const id = useParams().id;
  const [details, setDetails] = useState([]);
  console.log(details, id);
  const { data, isLoading } = useGetHistory(true);

  console.log(data?.data, details, "data");
  useEffect(() => {
    setDetails(data?.data?.filter((hist) => hist.id === parseInt(id))[0]);
  }, [isLoading]);
  console.log(details, data?.data[1]?.id === parseInt(id));
  return (
    <Container>
      <Sidebar></Sidebar>
      <Layout className="expert">
        <Link to="..">
          <Back>
            <img src={back} alt="back" />
            <p>Back</p>
          </Back>
        </Link>

        <Table className="expert">
          <TableContent className="expert">
            <MobileCategory className="histdetails">
              <Profile>
                {/* {details?.user?.profile_pic_link ? (
img
src={details?.user?.profile_pic_link}
style={{ width: "3em" }}
alt="pix"
/>
                ): } */}
                <img
                  src={details?.user?.profile_pic_link}
                  style={{ width: "3em" }}
                  alt="pix"
                />
                <div>
                  <Name>
                    {details?.user?.firstname} {details?.user?.lastname}
                  </Name>
                  <div></div>
                </div>
              </Profile>
              <div></div>
            </MobileCategory>

            <MobileCategory>
              <MobileTitle>Date</MobileTitle>
              <Date>{formatDate(details?.date)}</Date>
            </MobileCategory>

            <MobileCategory className="">
              <MobileTitle>Time</MobileTitle>
              <Date>
                {addAMPMToTime(details?.start)} - {addAMPMToTime(details?.end)}
              </Date>
            </MobileCategory>

            <MobileCategory>
              <MobileTitle>Fee</MobileTitle>
              <Service>5000 per session</Service>
            </MobileCategory>
          </TableContent>
        </Table>

        <Tabs>
          <NavLink to="." end>
            Report
          </NavLink>
          <NavLink to={"prescription"}>Questionaire response</NavLink>
        </Tabs>

        <Outlet
          context={{
            details: details?.details,
            appointmentId: details?.details?.appointment_id,
          }}
        />
      </Layout>
    </Container>
  );
}

export default ExpertDetailsLayout;
