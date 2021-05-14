import React from 'react'
import styled from 'styled-components';
import MenuIcon from '@material-ui/icons/Menu';
import {IconBox, Title} from "./SelectAppointment";
import {Containers, Lock, PaySys} from './Payment';
import CheckedIcon from "@material-ui/icons/CheckCircle";
function Booked() {
    return (
        <Containers>
            <IconBox><MenuIcon /></IconBox>
            <BookContainer>
                <PaySys name="Dr Alice Walton" amount="N2000" total="N2000"/>
                <TitleBox>
                    <Title><CheckedIcon /></Title>
                    <Title>Appointment Booked</Title>
                </TitleBox>
                <br />
              
              <LockBox>  <Lock /> </LockBox>
            </BookContainer>
        </Containers>
    )
}

export default Booked

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
    >h2 >.MuiSvgIcon-root{
        font-size:2.5em;
        fill: #4BD37B;
    }
`;