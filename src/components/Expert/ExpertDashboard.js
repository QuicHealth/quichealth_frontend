import React from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components'
import { BodyHeading, Container, MainBody, ProfileImage } from '../Overview'
import { Avatar } from "@material-ui/core";
import { Icon } from '../SelectAppointment';
import ExpertSidebar from './ExpertSidebar';

function ExpertDashboard({ openSidebar}) {
    return (
        <Container sidebar={openSidebar}>
            <ExpertSidebar />
            <MainBody>
            <ProfileImage sidebar={openSidebar}>
            <img
                src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg"
                alt=""
            />
            </ProfileImage>

            <WelcomeContainer sidebar={openSidebar}>
            <HeaderImage> 
                <img
                src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg"
                alt=""
            /></HeaderImage>
            <BodyHeading sidebar={openSidebar}>
                Nice having you back, <b>Dr Alice</b> 
            </BodyHeading>
            </WelcomeContainer>
            
            <OverviewContainer sidebar={openSidebar}>
                <PatientImage>
                <Avatar />
                </PatientImage>

                <PatientDetails>
                    <PName>Tobi’s appointment is in 15 minutes</PName>
                    <ViewProfile> View Health Profile</ViewProfile>
                    <PTime>
                        <Icon className="noLeftPadding big"> 
                        <i className="fas fa-calendar-alt"></i>
                        </Icon> &nbsp;
                        <Icon className="noIcon"> <i class="far fa-clock"></i> &nbsp;</Icon>
                      
                        <div>
                        <Date>10-07-2020</Date>
                        <Time> 10:45AM GMT +1 </Time>
                        </div>

                        <Icon className="noIcon">
                            <i className="fas fa-chevron-down down"></i>
                        </Icon>
                    </PTime>
                </PatientDetails>
            </OverviewContainer>
            </MainBody>
            
        </Container>
    )
}

const mapStateProps = (state) => ({
    openSidebar: state.utils.openSidebar,
  });
  const mapDispatchToProps = (dispatch) => {
    return {

    };
  };

ExpertDashboard = connect(mapStateProps, mapDispatchToProps)(ExpertDashboard)
export default ExpertDashboard

const WelcomeContainer= styled.div` 
    display: flex;
    padding: 2em;
    align-items: center;
    margin-bottom: 5em;
    position: relative;
    @media (max-width: ${500}px) {
        padding: 0;
    }
     h2{
        position: relative;
        font-size: 18px;
        @media (max-width: ${500}px) {
        right: ${({ sidebar}) => (sidebar? "-1em": "0")};
        } 
    }
`;
const HeaderImage = styled.div`
    display: block;
    img{
        width: 6em;
        height: 6em;
        border-radius: 50%;
    }
    @media (max-width: ${500}px) {
         display: none;
    }
`;

const OverviewContainer = styled.div`
    position: relative;
    left: ${({ sidebar}) => (sidebar? "-4em": "0em")};
    display: flex;
    width: 50em;
    padding: 2em;
    margin: 1em auto;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 42px;
    @media (max-width: ${500}px) {
    width: ${({ sidebar }) => (!sidebar? "unset" : "90%")};
    left: ${({ sidebar}) => (sidebar? "0em": "-1.5em")};
    justify-content: none;
  }
`;

const PatientImage = styled.div`

> img {
    height: 4em;
    width: 4em;
    border-radius: 50%;
  }
  .MuiAvatar-colorDefault {
    color: #747474;
    width: 6em;
    height: 6em;
    @media (max-width: ${500}px) {
      width: 4em;
      height: 4em;
    }
  }
`;
const PatientDetails = styled.div`

`;

const PName = styled.h3`
    padding-left: 0.5em;
    font-size: 30px;
    line-height: 35.16px;
    @media (max-width: ${500}px) {
      font-size: 15px;
      line-height: 21px;
    }
`;

const ViewProfile = styled.div`
    font-size: 15px;
    color: #3C6BE4;
    padding: 1em 1em;
    @media (max-width: ${500}px) {
      font-size: 12px;
      padding: .2em.6em;
    }
`;

const PTime = styled.div`
 padding-left: 0.5em;
  display: flex;
  font-size: 0.9em;
  color: green;
  width: 100%;
  align-items: center;
  //justify-content: space-evenly;
`;

const Time= styled.span``;

const Date = styled.div`
    display: none;
    @media (max-width: ${500}px) {
        display: block;
    }
`;


