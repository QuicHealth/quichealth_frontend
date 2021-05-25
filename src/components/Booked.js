import React from 'react'
import styled from 'styled-components';
import { connect } from "react-redux";
import MenuIcon from '@material-ui/icons/Menu';
import {IconBox, Title} from "./SelectAppointment";
import {Containers, Lock, PaySys} from './Payment';
import CheckedIcon from "@material-ui/icons/CheckCircle";
import { Container, MainBody } from './Appointments';
import SideBar from './SideBar';

const BookedComponent = () => {
    return (
        <Containers>
        <BookContainer>
            <PaySys name="Dr Alice Walton" amount="N2000" total="N2000"/>
            <TitleBox>
                <Title><CheckedIcon /></Title>
                <Title>Appointment Booked</Title>
            </TitleBox>
            <br />
          
          <Lock />
        </BookContainer>
    </Containers>
    )
}
function Booked({ openSidebar}) {
    return (
        <Container sidebar={openSidebar}>
            <SideBar />
            <MainBody>
                <BookedComponent />
            </MainBody>
        </Container>
    )
}

const mapStateProps = (state) => ({
    openSidebar: state.utils.openSidebar
})

export default Booked = connect(mapStateProps)(Booked);

const BookContainer = styled.div`
    display: grid;
    justify-content: space-around;
    align-items: center;

`;

const LockBox = styled.div`
    margin-top:5em;
`;

const TitleBox = styled.div`
    margin-top: 3em;
    >h2 {
        @media (max-width: ${500}px) {
            font-size: 1.5em;
        }
        .MuiSvgIcon-root{
        font-size:2.5em;
        fill: #4BD37B;
    }
    }
`;