import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { ButtonWrapper, history } from "./HistoryListing";
import apppx from "./../../assets/apppx.png";
import { Container as C } from "../Dashboard/DashboardSection";
import { Title as T } from "../Notifications/NotificationLayout";
import back from "./../../assets/backArrow.svg";
import { MobileCategory, MobileTitle } from "../Appointments/Upcoming";
import { SidebarCollapseContext } from "../../context/SidebarCollapseContext";
import { useGetHistory } from "../../queries/useAppointment";
import { addAMPMToTime, formatDate } from "../../utils/MonthAndDate";

function HistoryDetails() {
  const id = useParams().id;
  const { collapse, setCollapse } = useContext(SidebarCollapseContext);
  const { data, isLoading } = useGetHistory();
  const [details, setDetails] = useState([]);
  console.log(details, "detasz");
  useEffect(() => {
    setDetails(data?.data?.filter((hist) => hist.id === parseInt(id))[0]);
  }, [isLoading]);

  useEffect(() => {
    setCollapse(true);
  }, []);

  return (
    <Container collapse={collapse}>
      <div></div>
      <div>
        <Link to="..">
          <Back>
            <img src={back} alt="back" />
            <p>Back</p>
          </Back>
        </Link>

        <TableContent>
          <MobileCategory className="histdetails">
            <Profile>
              <img src={apppx} alt="pix" />
              <div>
                <Name>{details?.doctor?.name}</Name>
                <Link to={`/view-profile/${details?.doctor?.unique_id}`}>
                  <ViewProfile>View profile</ViewProfile>
                </Link>
              </div>
            </Profile>
            <ButtonWrapper className="mobilescreen">
              <Link to={`/history/${id}`}></Link>
            </ButtonWrapper>
          </MobileCategory>

          <MobileCategory>
            <MobileTitle>Date</MobileTitle>
            <Date>{formatDate(details?.appointments?.date)}</Date>
          </MobileCategory>

          <MobileCategory className="">
            <MobileTitle>Time</MobileTitle>
            <Date>
              {addAMPMToTime(details?.appointments?.start)} -{" "}
              {addAMPMToTime(details?.appointments?.end)}
            </Date>
          </MobileCategory>
          {/* 
          <ButtonWrapper className="fullscreen">
            <Link to={`/history/${hist.id}`}>
              <Button>View details</Button>
            </Link>
          </ButtonWrapper> */}

          <MobileCategory>
            <MobileTitle>Fee</MobileTitle>
            <Service>{details?.price || "1000"} per session</Service>
          </MobileCategory>
        </TableContent>

        <Diagnosis>
          <Title>Diagnosis</Title>
          <p>{details?.diagnosis}</p>
        </Diagnosis>
        <Treatment>
          <Title>Treatment</Title>
          <p>{details?.treatments}</p>
        </Treatment>
      </div>
    </Container>
  );
}

export default HistoryDetails;

const Container = styled(C)`
  padding: 2em;
  height: 86vh;

  @media only Screen and (max-width: 768px) {
    padding: 1em;
  }
`;
const TableContent = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 25%);
  color: #595959;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  padding: 1.5em 1em 1.5em 1em;
  margin-bottom: 2em;
  padding: 1em 0;
  font-size: 15px;

  /* p {
    padding: 1em;
    text-align: center;
    &:last-child {
    }
  } */

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
  }
`;

const Profile = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  justify-content: flex-start;
  padding-left: 1em;

  img {
    width: 3em;
  }
  div {
    padding-left: 1em;
  }

  @media only Screen and (max-width: 768px) {
    padding-left: 0em;
    /* padding-bottom: 1em; */
  }
`;
export const Service = styled.p`
  text-align: center;
`;
const Date = styled.p`
  text-align: center;
`;
//
export const Name = styled.p``;
const ViewProfile = styled.p`
  color: #2f80ed;
  margin-top: 0.4em;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;

const Diagnosis = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 1.5em 1em 1.5em 1em;
  margin: 2em 0;
  padding: 1em;
  font-size: 15px;
  p {
    font-weight: 300;
  }
`;
const Treatment = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 1.5em 1em 1.5em 1em;
  margin: 2em 0;
  padding: 1em;
  font-size: 15px;

  p {
    font-weight: 300;
  }
`;

const Title = styled(T)`
  font-size: 1.7em;
  padding-left: 0;
  margin-bottom: 0.5em;
`;

export const Back = styled.div`
  display: flex;
  margin-bottom: 2em;
  align-items: center;
  cursor: pointer;
  img {
    width: unset;
    margin-right: 1em;
  }

  &.viewprofile {
    img {
      /* width: 5em;
      height: 5em; */

      @media only Screen and (max-width: 768px) {
        width: unset;
        height: auto;
        margin-left: 1em;
      }
    }
  }
  p {
    font-size: 15px;
    font-weight: 300;
    color: var(--grey);
    @media only Screen and (max-width: 768px) {
      display: none;
    }
  }

  &:hover {
    opacity: 0.5;
  }
`;
