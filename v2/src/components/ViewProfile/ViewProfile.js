import React, { useContext, useEffect } from "react";
import { Container } from "./../Appointments/Appointmentlayout";
import { Layout } from "../Notifications/NotificationLayout";
import back from "./../../assets/backArrow.svg";
import { Back } from "../History/HistoryDetails";
import notify from "./../../assets/notification.png";
import Work from "@material-ui/icons/WorkOutlineOutlined";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { SidebarCollapseContext } from "../../context/SidebarCollapseContext";
import { useDoctorsDetail } from "../../queries/useAppointment";
import AvatarImage from "../../utils/AvatarImage";
import { Spin } from "../../utils/Spinners";

function ViewProfile() {
  const navigate = useNavigate();
  const id = useParams().id;
  const { data, isLoading } = useDoctorsDetail(id);
  const { collapse, setCollapse } = useContext(SidebarCollapseContext);
  console.log(data, "profile");
  useEffect(() => {
    setCollapse(true);
  }, []);
  
  return (
    <Container collapse={collapse} className="viewprofile">
      {isLoading && <Spin />}
      <Sidebar></Sidebar>
      <Layout>
        <Back onClick={() => navigate(-1)} className="viewprofile">
          <img src={back} alt="back" />
          <p>Back</p>
        </Back>

        <ProfileBox>
          <Profile>
            <LeftSection>
              <Image>
                {data?.doctor?.image ? (
                  <img src={data?.doctor?.image} alt="pix" />
                ) : (
                  <AvatarImage name={data?.doctor?.name} />
                )}
              </Image>
              <ProfileDetails>
                <Name>{data?.doctor?.name}</Name>
                <p>Cardiologist</p>

                <WorkAt className="work">
                  <Work />
                  <p>Works at {data?.doctor?.hospital?.name}</p>
                </WorkAt>
              </ProfileDetails>
              <MobileWorkAt className="work">
                <Work />
                <p>Works at {data?.doctor?.hospital?.name}</p>
              </MobileWorkAt>
            </LeftSection>
            <RightSection>
              <h1>N5,000</h1>
              <p>per session</p>
            </RightSection>
          </Profile>

          <About>
            <h2>About </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
              consequat. Duis autem vel eum iriure dolor in hendrerit in
              vulputate velit esse molestie consequat, vel illum dolore eu
              feugiat nulla facilisis at vero eros et accumsan et iusto odio
              dignissim qui blandit praesent luptatum zzril delenit augue duis
              dolore te feugait nulla facilisi.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
              consequat. Duis autem vel eum iriure dolor in hendrerit in
              vulputate velit esse molestie consequat, vel illum dolore eu
              feugiat nulla facilisis at vero eros et accumsan et iusto odio
              dignissim qui blandit praesent luptatum zzril delenit augue duis
              dolore te feugait nulla facilisi.
            </p>
          </About>
        </ProfileBox>
      </Layout>
    </Container>
  );
}

export default ViewProfile;

export const Sidebar = styled.div`
  @media only Screen and (max-width: 768px) {
    display: none;
  }
`;
const ProfileBox = styled.div`
  background-color: white;
  margin: 5em 10em;
  padding: 1em;
  border-radius: 10px;

  @media only Screen and (max-width: 768px) {
    margin: 1em;
  }
`;

const Profile = styled.div`
  display: grid;
  grid-template-columns: 68% 30%;
  align-items: center;
  border-bottom: 1px solid #d5d5d5;
  padding: 1em 0;

  @media only Screen and (max-width: 768px) {
    grid-template-columns: 68% 30%;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  color: var(--grey);

  @media only Screen and (max-width: 768px) {
    gap: 0.3em;
    flex-wrap: wrap;
  }
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: var(--grey);
  p {
    font-weight: 300;
  }

  @media only Screen and (max-width: 768px) {
    margin-bottom: 1.5em;
    h1 {
      font-size: 1em;
    }

    p {
      font-size: 0.8em;
    }
  }

  @media only Screen and (max-width: 300px) {
    h1 {
      font-size: 0.8em;
    }

    p {
      font-size: 0.6em;
    }
  }
`;

const About = styled.div`
  padding: 1em 0;

  h2 {
    color: var(--darkGreen);
  }

  p {
    padding: 1em 0;
    color: var(--grey);
  }

  @media only Screen and (max-width: 768px) {
    h2 {
      font-size: 1.2em;
    }

    p {
      font-size: 13px;
    }
  }
`;

const Image = styled.div`
  img {
    width: 7em;
  }

  @media only Screen and (max-width: 768px) {
    img {
      width: 3em;
    }
  }
`;

const ProfileDetails = styled.div`
  p {
    padding: 0.5em 0;
    font-weight: 300;
  }

  @media only Screen and (max-width: 768px) {
    p {
      padding: 0.1em 0px;
      font-size: 12px;
    }
  }

  @media only Screen and (max-width: 300px) {
    p {
      padding: 0.2em 0px;
      font-size: 10px;
    }
  }
`;

const Name = styled.h1`
  color: var(--grey);
  font-size: 1.9em;
  font-weight: 500;

  @media only Screen and (max-width: 768px) {
    font-size: 1.2em;
    font-weight: 600;
  }

  @media only Screen and (max-width: 300px) {
    font-size: 0.7em;
    font-weight: 600;
  }
`;

const WorkAt = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4em;
  img {
  }

  p {
    font-weight: 300;
  }
  @media only Screen and (max-width: 600px) {
    display: none;

    .MuiSvgIcon-root {
      font-size: 0.9em;
    }
  }
`;

const MobileWorkAt = styled.div`
  align-items: center;
  gap: 0.4em;
  display: none;

  p {
    font-weight: 300;
  }
  @media only Screen and (max-width: 600px) {
    display: flex;
    p {
      font-size: 13px;
    }
    .MuiSvgIcon-root {
      font-size: 0.9em;
    }
  }
`;
