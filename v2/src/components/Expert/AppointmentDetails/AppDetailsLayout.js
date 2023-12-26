import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import back from "./../../../assets/backArrow.svg";
import { Container } from "../DashboardSection";
import { Sidebar } from "../../ViewProfile/ViewProfile";
import { Layout } from "../../Notifications/NotificationLayout";
import { Back, Name, Service } from "../../History/HistoryDetails";
import { MobileCategory, MobileTitle } from "../../Appointments/Upcoming";
import {
  Date,
  Profile,
  Table,
  TableContent,
} from "../../History/HistoryListing";
import { Tabs } from "../../Appointments/Appointmentlayout";
import { addAMPMToTime, formatDate } from "../../../utils/MonthAndDate";
import { SidebarCollapseContext } from "../../../context/SidebarCollapseContext";
import { useExpertGetPatientAppDetails } from "../../../queries/useAppointment";
import AvatarImage from "../../../utils/AvatarImage";

function AppDetailsLayout() {
  const id = useParams().id;
  const { collapse, setCollapse } = useContext(SidebarCollapseContext);
  const { data, isLoading } = useExpertGetPatientAppDetails(id);

  console.log(data?.Appointments, "findAPp");
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
                {data?.Appointments?.user?.profile_pic_link ? (
                  <img
                    src={data?.Appointments?.user?.profile_pic_link}
                    style={{ width: "3em" }}
                    alt="pix"
                  />
                ) : (
                  <AvatarImage
                    name={`${data?.Appointments?.user?.firstname} ${data?.Appointments?.user?.lastname}`}
                  />
                )}

                <div>
                  <Name>
                    {`${data?.Appointments?.user?.firstname} ${data?.Appointments?.user?.lastname}`}
                  </Name>
                </div>
              </Profile>
              <div></div>
            </MobileCategory>

            <MobileCategory>
              <MobileTitle>Date</MobileTitle>
              <Date>{formatDate(data?.Appointments?.date)}</Date>
            </MobileCategory>

            <MobileCategory className="">
              <MobileTitle>Time</MobileTitle>
              <Date>
                {addAMPMToTime(data?.Appointments?.start)} -{" "}
                {addAMPMToTime(data?.Appointments?.end)}
              </Date>
            </MobileCategory>
          </TableContent>
        </Table>

        <Tabs>
          <NavLink to="." end>
            Report
          </NavLink>
          <NavLink to={"health-profile"}>Health Profile</NavLink>
        </Tabs>

        <Outlet
          context={{
            details: data?.Appointments?.details,
            user: data?.Appointments?.user,
          }}
        />
      </Layout>
    </Container>
  );
}

export default AppDetailsLayout;
