import React, { useEffect, useState } from "react";
import {
  BackdropContainer as BC,
  ModalContent as MC,
  ModalHeader as MH,
  ModalBody as MB,
} from "../Logout/Logout";
import { TimeSelections } from "../../utils/TimeSlots";
import styled from "styled-components";
import { ButtonBox } from "../HealthProfile/HealthProfile";
import { Button } from "../Settings/Settings";
import Arrow from "@material-ui/icons/ChevronRightOutlined";
import cancel from "./../../assets/cancel.png";
import { useSetAvailability } from "../../queries/useDashboard";
import { appointments } from "../../api/Patient";
import { Spin } from "../../utils/Spinners";
import cloneDeep from "lodash/cloneDeep";

const handleSelectedTime = (position, checkedState, setCheckedState) => {
  // const updatedCheckedState = checkedState.map((item, index) =>
  //   index === position ? !item : item
  // );

  // //checkedState[position] = !checkedState[position];

  setCheckedState((prevArray) => {
    const newArray = [...prevArray];
    newArray[position] = !prevArray[position];
    return newArray;
  });
};

function SetAppointment({ setModal, doctorId, docAvailability }) {
  const [activeDayTab, setActiveDayTab] = useState("");
  const [selectedTimeSlots, setSelectedTimeSlots] = useState(null);
  const [checkedState, setCheckedState] = useState(
    new Array(TimeSelections.length).fill(false)
  );
  const clonedAvailability = cloneDeep(docAvailability);
  const { setAvailables, isLoading, isSuccess } = useSetAvailability();
  const [availability, setAvailability] = useState({});
  let timeSlots = [];
  //const deepClonedArray = cloneDeep(checkedState);

  const getTimeSlotsByDay = (day, availability) => {
    //console.log(day, availability, "ankas");
    //getCheckedState(timeSlots);
    const slotsInADay = availability?.filter((slot) => slot?.day === day)?.[0];

    //console.log(slotsInADay, "slotsIndau");

    //if (!slotsInADay) return;
    const slotTemplate = new Array(TimeSelections.length).fill(false);

    if (!slotsInADay) return setCheckedState(slotTemplate);

    slotsInADay?.timeslot.forEach((slot, id) => {
      // console.log(slot, id, slotsInADay?.timeslot[id]?.start, "idSLot");
      if (
        parseInt(setCheckedStateInAvailability(slot?.start)) ||
        parseInt(setCheckedStateInAvailability(slot?.start)) === 0
      ) {
        // console.log(
        //   slotsInADay,
        //   parseInt(setCheckedStateInAvailability(slot?.start)),
        //   "checkinggg"
        // );
        const checkStatedId = parseInt(
          setCheckedStateInAvailability(slot?.start)
        );
        slotTemplate[checkStatedId] = !slotTemplate[checkStatedId];
      }
    });

    //console.log(slotTemplate, "slottemoate");

    return setCheckedState(slotTemplate);
    //return;
  };
  // console.log(docAvailability, "doctsdd");

  const getDays = (number) => {
    switch (number) {
      case 0:
        return "sunday";
      case 1:
        return "monday";
      case 2:
        return "tuesday";
      case 3:
        return "wednesday";
      case 4:
        return "thursday";
      case 5:
        return "friday";
      case 6:
        return "saturday";
      default:
        break;
    }
  };

  const setCheckedStateInAvailability = (time) => {
    switch (time) {
      case "08:00":
        return "0";
      case "08:30":
        return 1;
      case "09:00":
        return 2;
      case "09:30":
        return 3;
      case "10:00":
        return 4;
      case "10:30":
        return 5;
      case "11:00":
        return 6;
      case "11:30":
        return 7;
      case "12:00":
        return 8;
      case "12:30":
        return 9;
      case "01:00":
        return 10;
      case "01:30":
        return 11;
      case "02:00":
        return 12;
      case "02:30":
        return 13;
      case "03:00":
        return 14;
      case "03:30":
        return 15;
      case "04:00":
        return 16;
      case "04:30":
        return 17;
      default:
        break;
    }
  };
  //getTimeSlotsByDay(getDays(1), clonedAvailability);

  const seperateEachDaysApp = (timeSlots) => {
    const allDaysAppointments = [];

    // it gets each days appointments/slots
    const getEachTimeslot = (timeslot) => {
      const day = timeslot?.map((slot) => {
        return {
          slot: slot.slot,
          start: slot.start,
          end: slot.end,
          selected: slot.selected,
          status: slot.status,
          availablity: true,
        };
      });

      const dayTimeslot = {
        doctor_id: doctorId,
        day: timeslot[0]?.day,
        availablity: true,
        time_slots: day,
      };

      return dayTimeslot;
    };

    const days = Object.keys(timeSlots);

    // save each day's appointment in an array
    days.forEach((day) => {
      allDaysAppointments.push(getEachTimeslot(timeSlots[day]));
    });

    return allDaysAppointments;
  };

  useEffect(() => {
    const getCheckedState = (timeSlots) => {
      checkedState?.forEach((currentCheckedState, id) => {
        if (currentCheckedState === true) {
          const slot = {
            doctor_id: doctorId,
            ...TimeSelections[id],
            day: getDays(activeDayTab),
            checkedState,
          };
          console.log(slot, "checkinf2");
          timeSlots?.push(slot);
        }
      });
      console.log(timeSlots, "checkinf");

      setAvailability({
        ...availability,
        [getDays(activeDayTab)]: timeSlots,
      });
    };
    getCheckedState(timeSlots);
    // eslint-disable-next-line
  }, [checkedState]);

  useEffect(() => {
    if (!availability[getDays(activeDayTab)]) {
      setCheckedState(new Array(TimeSelections.length).fill(false));
    } else if (availability[getDays(activeDayTab)][0]) {
      setCheckedState(availability[getDays(activeDayTab)][0].checkedState);
    }
  }, [activeDayTab, availability]);

  useEffect(() => {
    setActiveDayTab(1);
    getTimeSlotsByDay(getDays(1), clonedAvailability);
  }, []);

  useEffect(() => {
    !isLoading && isSuccess && setModal(false);
  }, [isSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // getCheckedState(timeSlots);
    console.log(availability, seperateEachDaysApp(availability), "available");

    // this gets each day's appointment/slots, save in an array and submit them iteratively
    const allAppointments = seperateEachDaysApp(availability);
    allAppointments.forEach((appointment, id) => {
      if (allAppointments.length - 1 !== id) {
        appointment.day && setAvailables(appointment);
      } else {
        appointment.day && setAvailables({ ...appointment, lastSlot: true });
      }
    });
  };

  return (
    <BackdropContainer>
      {isLoading && <Spin />}
      <ModalContent>
        <ModalHeader>
          <h4>Set availability</h4>
          <div className="patient" onClick={() => setModal(false)}>
            <img src={cancel} alt="cancel" />
          </div>
        </ModalHeader>
        <ModalBody>
          <form>
            <SetAvailable>
              <Availability>
                <Days>
                  <DaysTitle>Day</DaysTitle>
                  <Day
                    className={activeDayTab === 1 ? "activeDayTab" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveDayTab(1);

                      getTimeSlotsByDay(getDays(1), clonedAvailability);
                    }}
                  >
                    <p>Monday</p>
                    <Arrow />
                  </Day>
                  <Day
                    className={activeDayTab === 2 ? "activeDayTab" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveDayTab(2);

                      getTimeSlotsByDay(getDays(2), clonedAvailability);
                    }}
                  >
                    <p>Tuesday</p>
                    <Arrow />
                  </Day>
                  <Day
                    className={activeDayTab === 3 ? "activeDayTab" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveDayTab(3);

                      getTimeSlotsByDay(getDays(3), clonedAvailability);
                      //getTimeSlotsByDay(getDays(3), clonedAvailability);
                    }}
                  >
                    <p>Wednesday</p>
                    <Arrow />
                  </Day>

                  <Day
                    className={activeDayTab === 4 ? "activeDayTab" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveDayTab(4);

                      getTimeSlotsByDay(getDays(4), clonedAvailability);
                      //getTimeSlotsByDay(getDays(4), clonedAvailability);
                    }}
                  >
                    <p>Thursday</p>
                    <Arrow />
                  </Day>

                  <Day
                    className={activeDayTab === 5 ? "activeDayTab" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveDayTab(5);

                      getTimeSlotsByDay(getDays(5), clonedAvailability);
                      //getTimeSlotsByDay(getDays(5), docAvailability);
                    }}
                  >
                    <p>Friday</p>
                    <Arrow />
                  </Day>

                  <Day
                    className={activeDayTab === 6 ? "activeDayTab" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveDayTab(6);
                      getTimeSlotsByDay(getDays(6), clonedAvailability);
                    }}
                  >
                    <p>Saturday</p>
                    <Arrow />
                  </Day>
                  <Day
                    className={activeDayTab === 7 ? "activeDayTab" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveDayTab(7);
                      getTimeSlotsByDay(getDays(7), clonedAvailability);
                    }}
                  >
                    <p>Sunday</p>
                    <Arrow />
                  </Day>
                </Days>
                <Times>
                  <DaysTitle>Time</DaysTitle>
                  <TimeInputBox>
                    <TimeInput className="patient">
                      {TimeSelections.map((timeSlot, id) => {
                        return (
                          <Time key={id}>
                            <input
                              key={id}
                              type="checkbox"
                              checked={checkedState[id]}
                              value={timeSlot.name}
                              name={timeSlot.value}
                              onChange={() => {
                                handleSelectedTime(
                                  id,
                                  checkedState,
                                  setCheckedState
                                );
                                // getCheckedState(timeSlots);
                              }}
                            />
                            &nbsp; &nbsp;
                            <label htmlFor="">{timeSlot.value}</label>
                          </Time>
                        );
                      })}
                    </TimeInput>
                  </TimeInputBox>
                </Times>
              </Availability>
            </SetAvailable>

            <ButtonBox>
              <p
                onClick={() =>
                  setCheckedState(new Array(TimeSelections.length).fill(false))
                }
              >
                Clear
              </p>
              <Button onClick={handleSubmit}>Save Changes</Button>
            </ButtonBox>
          </form>
        </ModalBody>
      </ModalContent>
    </BackdropContainer>
  );
}

export default SetAppointment;

const ModalHeader = styled(MH)`
  justify-content: space-between;
  h4 {
    color: var(--grey);
  }
`;

const ModalBody = styled(MB)`
  margin-bottom: 0em;
  border: 0;
`;

const ModalContent = styled(MC)`
  width: 35em;
  margin: auto;
  margin-top: 5vw;
  @media only Screen and (max-width: 768px) {
    width: auto;
  }

  @media only Screen and (max-width: 500px) {
    margin: 7em 0.5em;
  }
`;
const BackdropContainer = styled(BC)`
  display: block;
`;
const SetAvailable = styled.div`
//display: flex;
/ justify-content: space-between;
margin-bottom: 0em;
`;

const Availability = styled.div`
  //width: 35em;
  border-radius: 8px;
  border: 1px solid #d5d5d5;
  padding: 1em 0;
  display: grid;
  grid-template-columns: 40% 60%;

  @media only Screen and (max-width: 768px) {
    grid-template-columns: 50% 50%;
  }
`;

const Days = styled.div`
  border-right: 2px solid #d5d5d5;
`;
const Times = styled.div``;
const Day = styled.button`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  padding: 1em;
  width: 100%;
  font-size: 14px;
  color: var(--grey);
  background-color: white;
  cursor: pointer;

  &.activeDayTab {
    background-color: buttonface;
  }
`;
const Time = styled.div`
  padding: 0em 0.5em 0.5em 1em;
  display: flex;
  align-items: flex-end;
  &:first-child {
  }
`;
const DaysTitle = styled.p`
  font-weight: bold;
  margin-bottom: 0.5em;
  color: var(--grey);
  padding-left: 1em;
`;

const TimeInputBox = styled.div``;
const TimeInput = styled.div`
font-size: 14px;

line-height: 21px;
color: black;
font-weight: 400;
display: grid;
grid-template-columns: 1fr 1fr;

//gap: 1em;
input {
  margin-top: 1em;
  width: 1.5em;
  height: 1.5em;
  cursor: pointer;
}

label {
  color: var(--grey);
  font-weight: 100;
}
@media only Screen and (max-width: 768px) {
  grid-template-columns: 1fr;
  height: 26em;
  overflow-y: auto;
  width: 100% !important;

  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
  background-color: #f1f1f1; /* Set the background color of the scrollbar track */
}
::-webkit-scrollbar-thumb {
  background-color: #888; /* Set the color of the scrollbar thumb */
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* Set the color of the scrollbar thumb on hover */
}
`;
