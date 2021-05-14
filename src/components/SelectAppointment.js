import React from 'react'
import styled from 'styled-components';
import MenuIcon from '@material-ui/icons/Menu';
import StarIcon from '@material-ui/icons/StarOutlined';
//import ClockIcon from '@materal-ui/icons/ChevronRight'
import {InputLabel, Input} from "./RegisterBody";
import {ViewProfile} from "./Appointments";

export const DocAppointment = ({name, NoIcon}) => {
    return (
        <DocDesc>
            <DocImg>
                <img src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg" alt=""/>
            </DocImg>
            <DocDetails>
                <DName>{name}</DName>
                <DRating>
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon className="nostar" />
                </DRating>
                <DProfile>
                    <ViewProfile>View profile</ViewProfile>
                </DProfile>
                <DTime>
                    <Icon><i className="far fa-clock"></i></Icon>
                    <Time> 10:45AM GMT +1 </Time>
                    <Icon>{NoIcon? "":(<i className="fas fa-chevron-down down"></i>) }</Icon>
                
                </DTime>
            </DocDetails>
        </DocDesc>
    )
}

export const BookAppointment = ({name }) => {
    return (
        <BookingDetails>
        <DocAppointment name={name} />
        <BookBtn>
            <Button>Book</Button>
        </BookBtn>
    </BookingDetails>
    )
}

function SelectAppointments() {

    return (
        <Container>
            <IconBox><MenuIcon /></IconBox>
            <Title>Select Appointment</Title>
            <SelectBox>
                <div>
                <InputLabel htmlFor="Location"> Location </InputLabel>
                <Input type="text" placeholder="e.g Lekki, Lagos"/>
                </div>
                <div>
                <InputLabel htmlFor="Time"> Time </InputLabel>
                <Input type="text" placeholder="01/01/2020"/>
                </div>
                <div>
                <InputLabel htmlFor="Persona"> Personal </InputLabel>
                <Input type="text" placeholder="Adult"/>
                </div>
                <div>
                <InputLabel htmlFor="Speciality"> Speciality </InputLabel>
                <Input type="text" placeholder="Naturopathy"/>
                </div>
            </SelectBox>
            <Bookings>
                <Available>Available</Available>
                <Margin></Margin>
                <BookAppointment name="Dr Alice Walton" />
                <Margin></Margin>
                <BookAppointment name="Dr Alice Walton" />
                <Margin></Margin>
                <BookAppointment name="Dr Alice Walton" />
                <Margin></Margin>
                <BookAppointment name="Dr Alice Walton" />
                <Margin></Margin>

                <ViewMore>
                    <Button>View more <i class="fas fa-angle-right"></i> </Button>
                </ViewMore>
            </Bookings>
  
            
        </Container>
    )
}

export default SelectAppointments

export const Container = styled.div`
  padding: 2em;
  background-color: #f5f5f8;
  margin: 0 auto;
  margin-right: .5em;
  margin-left:.5em;
  color:#070647;
  border-radius: 15px;
`;

export const IconBox = styled.div`

    >.MuiSvgIcon-root{
        font-size: 3em;
        color: #070647;
    }
`;
export const Title = styled.h2`
    width: 100%;
    font-size: 2em;
    text-align: center;
`;
const SelectBox = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap:1em;
    width: 60em;
    margin: 2em auto 1em auto;
    >div>input{
        border: 2px solid #2fa5a9;
    }
`;
const Bookings = styled.div`
    padding: 0 5em;
    width: 50em;
    margin: 0 auto;
    margin-top: 4em;
`;

const Available= styled.div`
    width: 7em;
    color: white;
    background-color: #2fa5a9;
    padding: .2em 1em;
    font-weight:600;
    border-radius: 5px;
`;

export const Margin = styled.div`
    width: 100%;
    height:1px;
    background-color: #2fa5a9;
`
const BookingDetails = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 1em 0;
    align-items: center;
`;
const DocImg = styled.div`
    >img{
        height: 5em;
        width: 5em;
        border-radius: 50%;
        }
`;

const DocDesc = styled.div`
    display: flex;
    justify-content: space-between;
    width: 16em;

`;

const DocDetails = styled.div`
    display: block;
`;

const DName = styled.h3`
    padding-left: .5em;
    font-size: 1em;
`;
const DRating = styled.div`
    display: flex;
    padding-left: .7em;
    >.MuiSvgIcon-root{
    fill: #ffe324;
    font-size: 1.2em;

        &.nostar{
            fill: #bdbdbe
        }
    }
`;
const DProfile = styled.div`
    padding-left: .5em;
    >span{
        font-size:11px;
        font-weight:600;
    }
`;
const DTime= styled.div`
    display: flex;
    font-size: .9em;
    color: green;
    width: 100%;
    justify-content: space-evenly;
`;
const Icon= styled.span`
    padding-left: .5em;
    > i {
            &.down{
        color: #8d8282;
        }
    }
`;
const Time = styled.span``;

const BookBtn = styled.div``;

export const Button = styled.button`
    padding: .5em 2.5em;
    border-radius: 20px;
    background-color: #2fa5a9;
    color: #ffffffd6;
    text-align: center;
    outline: none;
    border: 0;
    font-weight: 600;
    font-size: 1em;

    &:hover{
        cursor: pointer;
        opacity: .6;
        transition: all .5s;
        }
`;

export const ViewMore = styled.div`
    width: 100%;
    margin: 2em auto;
    display: flex;
    justify-content: space-around;
`;

