import React, { useEffect, useState } from "react";
import {
  BackdropContainer as BC,
  ModalContent as MC,
  ModalHeader as MH,
  ModalBody as MB,
} from "../Logout/Logout";
import dayjs from "dayjs";
import { TimeSelections } from "../../utils/TimeSlots";
import styled from "styled-components";
import Arrow from "@material-ui/icons/ChevronRightOutlined";
import cancel from "./../../assets/cancel.png";
import GenericCalender from "../../utils/GenericCalender";
import { useNavigate } from "react-router-dom";
import {
  useCreateAppointment,
  useDoctorsDetail,
} from "../../queries/useAppointment";
import { Spin } from "../../utils/Spinners";
import { addAMPMToTime, compareStartTimes } from "../../utils/MonthAndDate";

function Bookings({ setModal, doctorId, selectedDate, selectedDay }) {
  const navigate = useNavigate();
  const {
    createAppointments,
    isLoading: isLoad,
    isSuccess,
  } = useCreateAppointment();
  const { data, isLoading } = useDoctorsDetail(doctorId);

  const [daySelected, setDaySelected] = useState(dayjs(selectedDate));
  const [slotSelected, setSlotSelected] = useState([]);
  const [selectDay, setSelectedDay] = useState(false);
  const [radioValue, setRadiovalue] = useState("");

  // console.log(
  //   data,
  //   data?.doctor?.availablity?.filter((avail) => avail.day === selectedDay),
  //   selectedDay,
  //   selectedDate,

  //   "test"
  // );

  console.log(data, "data");
  //console.log(slotSelected, selectDay, daySelected.format(), "slotss");

  isSuccess && navigate("/questionaire");
  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedSlot = data?.doctor?.availablity
      ?.filter(
        (avail) => avail.day === daySelected.format("dddd").toLowerCase()
      )[0]
      .timeslot?.filter((slot) => slot.start === radioValue);
    let value = {};
    value = {
      ...value,
      doctor_id: data?.doctor?.availablity[0].doctor_id,
      day: dayjs(daySelected).format("dddd").toLowerCase(),
      date: dayjs(daySelected).format("DD-MM-YYYY"),
      time_slots: {
        start: selectedSlot[0].start,
        end: selectedSlot[0].end,
      },
    };

    // navigate("/questionaire");
    //console.log(radioValue, selectedSlot[0], value, "radio");

    createAppointments(value);
  };

  // useEffect(() => {  console.log(slotSelected, "slotss233");}, [slotSelected]);

  return (
    <BackdropContainer>
      {(isLoading || isLoad) && <Spin />}
      <ModalContent>
        <ModalHeader>
          <h4>Schedule</h4>
          <div className="patient" onClick={() => setModal(false)}>
            <img src={cancel} alt="cancel" />
          </div>
        </ModalHeader>
        <ModalBody>
          <GenericCalender
            daySelected={daySelected}
            setDaySelected={setDaySelected}
            setModal={setModal}
            patient="patient"
            daysAvailable={data?.doctor.availablity}
            setSlotSelected={setSlotSelected}
            setSelectedDay={setSelectedDay}
            slotSelected={slotSelected}
          />
          {selectDay && (
            <AvailableTime>
              <DaysTitle>Time</DaysTitle>
              <TimeInputBox>
                <TimeInput className="patient">
                  {data?.doctor?.availablity
                    .filter(
                      (avail) =>
                        avail.day === daySelected.format("dddd").toLowerCase()
                    )[0]
                    ?.timeslot.sort(compareStartTimes)
                    ?.map((timeSlots, id) => {
                      return (
                        <Time key={id}>
                          <input
                            key={id}
                            type="radio"
                            value={timeSlots.start}
                            checked={radioValue === timeSlots.start}
                            onChange={(e) => setRadiovalue(e.target.value)}
                          />
                          &nbsp; &nbsp;
                          <label htmlFor="">
                            {addAMPMToTime(timeSlots?.start)}
                          </label>
                        </Time>
                      );
                    })}
                </TimeInput>
              </TimeInputBox>
            </AvailableTime>
          )}
        </ModalBody>

        <ButtonBox>
          {/* <p onClick={() => setRadiovalue("")}>Cancel</p> */}
          <Button disabled={!radioValue} onClick={handleSubmit}>
            Schedule
          </Button>
        </ButtonBox>
      </ModalContent>
    </BackdropContainer>
  );
}

export default Bookings;

const ModalHeader = styled(MH)`
  justify-content: space-between;
  h4 {
    color: var(--grey);
  }
`;

const ModalBody = styled(MB)`
  margin-bottom: 0em;
  margin-top: 0em;
  border: 0;
  display: flex;
  align-items: baseline;
  height: 20em;
  column-gap: 1em;

  @media only Screen and (max-width: 768px) {
    display: grid;
    height: auto;
    justify-content: unset;
  }
`;

const ModalContent = styled(MC)`
  width: 30em;
  margin: auto;
  margin-top: 11vw;

  @media only Screen and (max-width: 768px) {
    width: auto;
    margin: 11vw 1em 0em 1em;
  }
`;

const BackdropContainer = styled(BC)`
  display: block;
`;

const AvailableTime = styled.div`
  @media only Screen and (max-width: 768px) {
    margin-top: 1em;
  }
`;
const DaysTitle = styled.p`
  font-weight: bold;
  margin-bottom: 0.5em;
  color: var(--grey);
  padding-left: 1em;

  @media only Screen and (max-width: 768px) {
    /* font- */
    padding-left: 0;
    margin-bottom: 0;
  }
`;

const TimeInputBox = styled.div`
  overflow: scroll;
  height: 15em;

  @media only Screen and (max-width: 768px) {
    overflow: none;
    height: auto;
  }
`;
const TimeInput = styled.div`
  font-size: 14px;
  margin-top: 1em;
  line-height: 21px;
  color: black;
  font-weight: 400;
  display: grid;

  input {
    width: 1.2em;
    height: 1.2em;
  }
  @media only Screen and (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: unset;
  }
`;

const Time = styled.div`
  padding: 0em 0.5em 0.5em 1em;
  display: flex;
  margin-right: 0.5em;
  align-items: center;
  color: var(--grey);
  &:first-child {
  }
  @media only Screen and (max-width: 768px) {
    width: auto;
  }
`;

export const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1em;
  padding: 1em 0em;

  p {
    transition: all 0.2s;
    border-radius: 10px;
    padding: 0.8rem 1.5rem;
    border: 1px solid var(--grey);
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
    &:focus {
      transform: scale(0.9);
    }
  }
  @media only Screen and (max-width: 768px) {
    font-size: 13px;
    padding: 1rem 0rem;
  }
`;

export const Button = styled.button`
  font-size: 15px;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  background-color: var(--lightGreen);
  color: var(--white);
  border: 1px solid var(--lightGreen);
  transition: all 0.2s;

  cursor: pointer;

  &:disabled {
    opacity: 0.4;
  }

  &:hover {
    transform: scale(1.1);
  }
  &:focus {
    transform: scale(0.9);
  }
  @media only Screen and (max-width: 768px) {
    font-size: 13px;
    padding: 0.8rem 1rem;
  }
`;
