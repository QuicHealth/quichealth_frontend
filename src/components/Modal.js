import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { TimeSelections, TimeSelection2 } from "../utils/utils";
import GenericCalender from "./GenericCalender";
import CancelIcon from "./../Image/cancel.svg";
import { useHistory } from "react-router-dom";

export const Modal = ({
  setShowModal,
  modal,
  daySelected,
  setDaySelected,
  values,
  checkedState,
  handleSelect,
  disabledSubmit,
  handleSubmit,
  errors,
}) => {
  return (
    <BackdropContainer>
      <ModalContent>
        <SideBar></SideBar>
        <ScheduleBox>
          <CalenderBox>
            <GenericCalender
              daySelected={daySelected}
              setDaySelected={setDaySelected}
              modal={modal}
            />
          </CalenderBox>
          <AvailableTimes>
            <p>Input time availabilty</p>

            <TimeInputBox>
              <TimeSelectionBox>
                <TimeInput>
                  {TimeSelections.map((time, id) => {
                    return (
                      <>
                        <div>
                          <input
                            key={id}
                            type="checkbox"
                            value={values.name}
                            name={time.value}
                            checked={checkedState[id]}
                            onChange={() => handleSelect(id)}
                          />
                          &nbsp; &nbsp;
                          <label htmlFor="">{time.value}</label>
                        </div>
                      </>
                    );
                  })}
                </TimeInput>
              </TimeSelectionBox>
            </TimeInputBox>

            <Buttons>
              <ModalButton
                className="cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </ModalButton>
              <ModalButton disabled={disabledSubmit} onClick={handleSubmit}>
                Confirm
              </ModalButton>
            </Buttons>
          </AvailableTimes>
        </ScheduleBox>
      </ModalContent>
    </BackdropContainer>
  );
};

export const PatientCalenderModal = ({
  patient,
  setModal,
  daySelected,
  setDaySelected,
  setSlotSelected,
  slotSelected,
  getClass,
  removeClass,
  arry,
  setArry,
  doctorDetails,
  id,
  allSlots,
  setAllSlots,
}) => {
  const modalRef = useRef();

  const closeModal = (event) => {
    // console.log(event, modalRef, "modal");
    if (modalRef.current === event.target) {
      setModal(false);
    }
  };

  const keyPress = useCallback(
    (event) => {
      if (event.key === "Escape" && setModal) {
        setModal(false);
      }
    },
    [setModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <BackdropContainer
      key={id}
      ref={modalRef}
      onClick={closeModal}
      className="patient"
    >
      <ModalContent>
        <SideBar></SideBar>
        <ScheduleBox className="patient">
          <CalenderBox>
            <GenericCalender
              daySelected={daySelected}
              setDaySelected={setDaySelected}
              setModal={setModal}
              patient="patient"
              daysAvailable={doctorDetails?.availablity}
              setSlotSelected={setAllSlots}
            />
          </CalenderBox>
          <AvailableTimes>
            {" "}
            <p>Available Spots</p>
          </AvailableTimes>
          {}

          <TimeInputBox>
            <PatientTimeSelectionBox className="patient">
              {/* Check if patient or expert is calling the calender component */}
              {patient ? (
                <SlotButtons>
                  {allSlots &&
                    allSlots?.map((time, id) => {
                      return (
                        <>
                          <div>
                            <button
                              className={getClass(allSlots, slotSelected, id)}
                              key={id}
                              onClick={(e) => {
                                e.preventDefault();
                                setSlotSelected(time);
                                getClass(allSlots, id);
                                setModal(false);
                                removeClass(arry, setArry);
                              }}
                            >
                              {TimeSelections.filter((times, i) => {
                                if (times.start === time.start) {
                                  time.value = times.value;
                                }
                              })}
                              {time?.value}{" "}
                            </button>
                          </div>
                        </>
                      );
                    })}
                </SlotButtons>
              ) : (
                <TimeInput className="patient">
                  {TimeSelections.map((time, id) => {
                    return (
                      <>
                        <div>
                          <input
                            key={id}
                            type="checkbox"
                            value={time.name}
                            name={time.value}
                          />
                          &nbsp; &nbsp;
                          <label htmlFor="">{time.value}</label>
                        </div>
                      </>
                    );
                  })}
                </TimeInput>
              )}
            </PatientTimeSelectionBox>
          </TimeInputBox>
        </ScheduleBox>
      </ModalContent>
    </BackdropContainer>
  );
};

export const ConfirmationModal = ({
  setModal,
  setPatientBookValues,
  value,
  createPatientAppointment,
}) => {
  let history = useHistory();
  return (
    <BackdropContainer>
      <ModalContent className="confirmation">
        <Icon onClick={() => setModal(false)}>
          <img src={CancelIcon} alt="cancel" />
        </Icon>
        <Title>Sure you want to book?</Title>
        <Body>Are you sure you want to book this doctor?</Body>
        <Buttons className="confirmation">
          <ModalButton onClick={() => setModal(false)} className="cancel">
            No, cancel
          </ModalButton>
          <ModalButton
            onClick={() => {
              console.log(value, "value");
              setPatientBookValues(value);
              createPatientAppointment(value);
              setTimeout(() => {
                history.push("/chatbot");
              }, 2000);
            }}
          >
            Yes, Confirm
          </ModalButton>
        </Buttons>
      </ModalContent>
    </BackdropContainer>
  );
};

const BackdropContainer = styled.div`
  position: fixed;
  z-index: 1004;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  &.patient {
    background-color: unset;
    overflow-y: scroll;
  }
  /* overflow-y:scroll;
  display: block; */
  //overscroll-behavior: contain;
`;

const ModalContent = styled.div`
  display: grid;
  grid-template-columns: 25% 75%;
  padding: 2em;

  &.confirmation {
    grid-template-columns: 100%;
    margin: auto;
    background-color: white;
    width: 26em;
    border-radius: 5px;
    padding: 1em 2em 2em 2em;
    position: relative;
    top: 30%;
  }
`;
const SideBar = styled.div``;
const ScheduleBox = styled.div`
  background-color: white;
  margin-top: 1em;
  border: 1px solid #dfe0eb;
  border-radius: 10px;
  position: relative;
  top: 20%;
  display: grid;
  grid-template-columns: 44% 54%;
  gap: 1em;
  padding: 1em 3em 2em 3em;

  &.patient {
    grid-template-columns: 1fr;
    width: 20em;
    padding: 0em !important;

    box-shadow: 0px, 6px rgba(0, 0, 0, 0.15);
  }
`;
const CalenderBox = styled.div`
  padding: 1em;
`;
const AvailableTimes = styled.div`
  p {
    color: #070647;
    font-weight: 600;
    margin-top: 1em;
    margin-left: 1em;
    font-size: 14px;
    text-align: center;
  }
`;

const TimeInputBox = styled.form``;
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
  }

  /* > :nth-child(even) {
    display: inline-block;
  } */
`;

const SlotButtons = styled.div`
  font-size: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1em;
  button {
    color: #161a21;
    background-color: white;
    padding: 0.6em 0.7em;
    border-radius: 5px;
    border: 1px solid rgba(107, 119, 154, 0.5);
    width: 12em;
    font-size: 13px;
    letter-spacing: 0.23px;
    font-weight: 400;

    &.setSlot {
      background-color: #009688;
      color: white;
    }
  }
`;

const TimeSelectionBox = styled.div`
  //display: flex;
  //justify-content: flex-end;
  // gap: 3em;
  margin: 1em 0em 1em 2em;

  &.patient {
    gap: 1em;
    justify-content: center;
    margin: 1em !important;
  }
`;

const PatientTimeSelectionBox = styled.div`
  //display: flex;
  //justify-content: flex-end;
  // gap: 3em;
  gap: 1em;
  justify-content: center;
  margin: 1.5em;
`;

const Buttons = styled.div`
  display: flex;
  gap: 2em;
  justify-content: flex-end;
  font-family: "Raleway", sans-serif;
  margin-top: 5em;

  &.confirmation {
    margin: 2em auto 0 auto;
  }
`;

const ModalButton = styled.button`
  font-size: 15px;
  color: white !important;
  background: #2fa5a8;
  padding: 1em 3.5em;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.5s ease;
  border: 0;

  &.cancel {
    background: white;
    border: 1px solid #2fa5a8;
    color: #2fa5a8 !important;
  }

  :hover {
    opacity: 0.6;
  }
`;

const Icon = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  left: 1.5em;
  top: -0.5em;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const Title = styled.div`
  font-weight: 600;
  color: #070647;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
`;

const Body = styled.div`
  font-weight: 400;
  color: #7b7b7b;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
`;
