import React from 'react'
import styled from 'styled-components'
import { connect } from "react-redux";
import { Avatar } from "@material-ui/core";
import {
  AppointmentContainerWrapper,
  Container,
  HeadSection
} from "./../Appointments";
import { ProfileImage } from "./../Overview";
import { BodyHeading, Input, InputText, MainBodys, ProfileSection, Right, SaveChanges } from '../HealthProfile';
import ExpertSidebar from './ExpertSidebar';

function ExpertHealthProfile({ openSidebar }) {
    return (
        <Container sidebar={openSidebar}>
            <ExpertSidebar />
            <MainBodys sidebar={openSidebar}>
                <HeadSection sidebar={openSidebar}>
                <h1>Health Profile</h1>
                <ProfileImage sidebar={openSidebar} className="noTopPadding">
                    <img
                    src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg"
                    alt=""
                    />
                </ProfileImage>
                </HeadSection>
                <AppointmentContainerWrapper sidebar={openSidebar}>
                    <BodyHeading className="expert">
                        <Avatar />
                        <h3>Dr. Alice Walton</h3>
                    </BodyHeading>
                </AppointmentContainerWrapper>
                <ProfileSection sidebar={openSidebar} className="expert">
                    <div>
                        <InputText>Core Specialities</InputText>
                        <Input type="text" placeholder="eg Naturopathy" className="expert" />
                    </div>
                    <br />
                    <div>
                        <InputText>Set available Date and Time</InputText>
                        <Input type="datetime-local" placeholder="eg Naturopathy" className="expert" />
                    </div>
                    <br />

                    <div>
                        <InputText>Hospital Affliate</InputText>
                        <Input type="text" placeholder="Type Here ..." className="expert" />
                    </div>
                    <br />
                    <br />
                    <div>
                        <InputText>Profile </InputText>
                        <TextBox placeholder="Type Here ..." className="expert" />
                    </div>

                    <Right className="settings">
                        <SaveChanges>Save changes</SaveChanges>
                    </Right>
                </ProfileSection>

            </MainBodys>
        </Container>
    )
}

const mapStateProps = (state) => ({
    openSidebar: state.utils.openSidebar,
  });

export default ExpertHealthProfile = connect(mapStateProps)(ExpertHealthProfile)

const TextBox = styled.textarea`
    width: 100%;
    height: 10em;
    font-size: 1.1em;
    outline: none;
    border-radius: 10px;
    border: 1px solid #000000;
    font-family: inherit;
    padding: .5em;

    ::placeholder {
    color: #bdbdbe;
  }
`;
