import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import StarIcon from "@material-ui/icons/StarOutlined";
import { InputLabel, Input } from "./RegisterBody";
import { Container, MainBody, ViewProfile } from "./Appointments";
import SideBar from "./SideBar";

export const DocAppointment = ({ name, NoIcon }) => {
  return (
    <DocDesc>
      <DocImg>
        <img
          src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg"
          alt=""
        />
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
          <Icon>
            <i className="far fa-clock"></i>
          </Icon>
          <Time> 10:45AM GMT +1 </Time>
          <Icon>
            {NoIcon ? "" : <i className="fas fa-chevron-down down"></i>}
          </Icon>
        </DTime>
      </DocDetails>
    </DocDesc>
  );
};

export const BookAppointment = ({ name }) => {
  return (
    <BookingDetails>
      <DocAppointment name={name} />
      <BookBtn>
        <Button>Book</Button>
      </BookBtn>
    </BookingDetails>
  );
};


//The appointment component functions
function SelectAppointments({ openSidebar }) {

// the appointment function
const AppointmentComponent = ({sidebar}) => {
  return (
    <Containa>
      <Title>Select Appointment</Title>
      <SelectBox>
        <div>
          <InputLabel htmlFor="Location"> Location </InputLabel>
          <Input type="text" placeholder="e.g Lekki, Lagos" />
        </div>
        <div>
          <InputLabel htmlFor="Time"> Time </InputLabel>
          <Input type="text" placeholder="01/01/2020" />
        </div>
        <div>
          <InputLabel htmlFor="Persona"> Personal </InputLabel>
          <Input type="text" placeholder="Adult" />
        </div>
        <div>
           <ViewMore><Button>Search</Button></ViewMore>
        </div>
      </SelectBox>
      <Bookings sidebar={openSidebar}>
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
          <Button className="nobtn">
            View more <i class="fas fa-angle-right"></i>{" "}
          </Button>
        </ViewMore>
      </Bookings>
    </Containa>
  );
};


  return (
    <Container sidebar={openSidebar}>
      <SideBar />
      <MainBody>
        <AppointmentComponent sidebar={openSidebar} />
      </MainBody>
    </Container>
  );
}

const mapStateProps = (state) => ({
  openSidebar: state.utils.openSidebar,
});

export default SelectAppointments = connect(mapStateProps)(SelectAppointments);

export const Containa = styled.div`
  padding: 2em 0;
  //background: linear-gradient(180deg, #e7e7ed, #ffffff);
  margin: 0 auto;
  margin-right: 0.5em;
  margin-top:5em;
  margin-left: 0.5em;
  color: #070647;
  border-radius: 15px;
`;

export const IconBox = styled.div`
  > .MuiSvgIcon-root {
    font-size: 4em;
    color: #070647;
  }
`;
export const Title = styled.h2`
  width: 100%;
  font-size: 2.5em;
  text-align: center;
`;
const SelectBox = styled.div`
  display: grid;
  grid-template-columns: 30% 23% 22% 20%;
  column-gap: 2em;
  width: 100%;
  margin: 2em auto 1em auto;
  position: relative;
  left: -1em;
  @media (max-width: ${500}px) {
    grid-template-columns: 1fr;
    width: 100%;
    //left: 1em;
  }
  > div {
    padding: 0;
    font-size: 1.5em;
    @media (max-width: ${500}px) {
      width: 100%;
      margin: 0 auto;
      padding: 0 3em;
    }
    input {
      border: 2px solid #2fa5a9;
      width: 100%;
      padding: .5em;
      font-size: 1em;
      @media (max-width: ${750}px) {
        width: 70%;
      }
      @media (max-width: ${500}px) {
        width: 100%;
        margin-bottom: 1em;
      }
    }
    >div{
        @media (max-width: ${500}px) {
            justify-content:flex-start;
      }
    }
  }
`;
const Bookings = styled.div`
  padding: 0 5em;
  width: 50em;
  margin: 0 auto;
  margin-top: 4em;
  font-size: 1.2em;
  position: relative;
  right: 2em;
  @media (max-width: ${500}px) {
    width: 100%;
    padding: 0 0em;
    right: ${({sidebar}) => (sidebar? "0em": "2em")};
  }
`;

const Available = styled.div`
  width: 7em;
  color: white;
  background-color: #2fa5a9;
  padding: 0.2em 1em;
  font-weight: 600;
  border-radius: 5px;
`;

export const Margin = styled.div`
  width: 100%;
  height: 1px;
  background-color: #2fa5a9;
`;
const BookingDetails = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1em 0;
  align-items: center;
`;
const DocImg = styled.div`
  > img {
    height: 4em;
    width: 4em;
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
  padding-left: 0.5em;
  font-size: 1em;
`;
const DRating = styled.div`
  display: flex;
  padding-left: 0.7em;
  > .MuiSvgIcon-root {
    fill: #ffe324;
    font-size: 1.2em;

    &.nostar {
      fill: #bdbdbe;
    }
  }
`;
const DProfile = styled.div`
  padding-left: 0.5em;
  > span {
    font-size: 11px;
    font-weight: 600;
  }
`;
const DTime = styled.div`
  display: flex;
  font-size: 0.9em;
  color: green;
  width: 100%;
  justify-content: space-evenly;
`;
const Icon = styled.span`
  padding-left: 0.5em;
  > i {
    &.down {
      color: #8d8282;
    }
  }
`;
const Time = styled.span``;

const BookBtn = styled.div``;

export const Button = styled.button`
  padding: 0.5em 2.5em;
  border-radius: 20px;
  background-color: #2fa5a9;
  color: #ffffffd6;
  text-align: center;
  outline: none;
  border: 0;
  font-weight: 600;
  font-size: 1em;
  @media (max-width: ${450}px) {
    font-size: 0.9em;
    padding: 0.5em 1.5em;
    //width: 100%;
  }
  &.nobtn {
    background-color: inherit;
    color: inherit;
  }
  &:hover {
    cursor: pointer;
    opacity: 0.6;
    transition: all 0.5s;
  }
`;

export const ViewMore = styled.div`
  width: 100%;
  margin: 1.7em auto;
  display: flex;
  justify-content: space-around;
  @media (max-width: ${500}px) {
    justify-content: center;
    //width: 100%   ;
  }
  >button{
    @media (max-width: ${750}px) {
        width: 70% ;
    }
    @media (max-width: ${500}px) {
        width: 100% ;
        padding: .7em 1.5em;
    }
  }
  
`;
