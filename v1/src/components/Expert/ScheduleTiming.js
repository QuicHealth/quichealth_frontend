import React, { useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { MainBody, Container } from "../Overview";
import ExpertSidebar from "./ExpertSidebar";
import AddIcon from "@material-ui/icons/AddCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import DeleteIcon from "@material-ui/icons/Delete";
import { timeAvailable } from "../../utils/utils";
import useForm from "../../utils/useForm";
import { getDays, addSchedule } from "../../redux/actions";

const StartEndComponent = ({
  deletes,
  values,
  setValues,
  startValues,
  setStartValues,
  AddSlotArray,
  setAddSlotArray,
  count,
  setEmpty,
  Schedules,
  day,
  setSchedules,
  endTime,
  setEndTime,
  startTime,
  setStartTime,
}) => {
  // const [endTime, setEndTime] = useState("");
  // const [startTime, setStartTime] = useState("");
  //setEmpty(addSlot)
  return (
    <>
      <StartDate>
        <p>Start Time</p>
        <SelectBox
          className="add"
          // name={count ? `startTime ${count}` : "startTime"}
          name="from"
          onChange={(e) => {
            const selectTimed = e.target.value;
            setStartTime(selectTimed);
            setValues({
              ...values,
              [e.target.name]: e.target.value
            });
            startTime.length < 1? setEmpty(true):setEmpty(false)
          }}
        >
          <option value="" hidden></option>
          {timeAvailable().map((time, id) => {
            return (
              <option key={id} value={time}>
                {time}
              </option>
            );
          })}
        </SelectBox>
      </StartDate>
      <EndDate>
        <p>End Time</p>
        <SelectBox
          className="add"
          // name={count ? `endTime ${count}` : "endTime"}
          name="to"
          onChange={(e) => {
            const selectTime = e.target.value;
            setEndTime(selectTime);
            setValues({
              ...values,
              [e.target.name]: e.target.value
            });
            selectTime.length < 1? setEmpty(true):setEmpty(false)
            
          }}
        >
          <option value="" hidden></option>
          {timeAvailable().map((time, id) => {
            return (
              <option key={id} value={time}>
                {time}
              </option>
            );
          })}
        </SelectBox>

        {/* {deletes ? (
          <DeleteIcon
            onClick={(id) => deleteSlot(id, AddSlotArray, setAddSlotArray, values,setValues, startValues,setStartValues, Schedules,setSchedules, day)}
          />
        ) : (
          ""
        )} */}
      </EndDate>
    </>
  );
};

const AddSlot = ({
  showModal,
  modalRef,
  closeModal,
  setShowModal,
  Schedules,
  setSchedules,
  day,
  setAvailable,
  activeLink,
  dayId,
  addSchedule
}) => {
  const [count, setCount] = useState(1);
  const [values, setValues] = useState({});
  const [startValues, setStartValues] = useState({});
  const [empty, setEmpty] = useState(true)
  const [endTime, setEndTime] = useState("");
  const [startTime, setStartTime] = useState("");
  const [AddSlotArray, setAddSlotArray] = useState([
    <StartEndComponent
      values={values}
      setValues={setValues}
      startValues={startValues}
      setStartValues={setStartValues}
      setEmpty={setEmpty}
      addSlot={false}
      Schedules={Schedules}
      setSchedules={setSchedules}
      day={day}
      end={endTime}
      setEndTime={setEndTime}
      startTime={startTime}
      setStartTime={setStartTime}
    />,
  ]);

  const submitTimeSlots = (e) => {
    e.preventDefault();

    values.to = endTime;
    values.from = startTime;
    values.day = dayId;
    values.id= activeLink
    values.dayId = dayId;
    console.log(values, "values");
    addSchedule(values)
    
   //setSchedules(sch);
     //console.log(Schedules, values, startValues);
     setAvailable(true)
  };


  return (
    <BackDrop showModal={showModal} ref={modalRef} onClick={closeModal}>
      <AddSlotContainer>
        <SubtitleContainer>
          <p>Add Slot</p>
          <CancelIcon onClick={() => setShowModal(false)} />
        </SubtitleContainer>
        <form>
          {AddSlotArray.map((value, id) => {
            return (
              <StartEndContainer id={id} key={id}>
                {value}
              </StartEndContainer>
            );
          })}

          <AddContainer
            onClick={() => {
              setCount(count + 1);
              setEmpty(true);
              addMoreSlot(
                AddSlotArray,
                setAddSlotArray,
                values,
                setValues,
                count,
                startValues,
                setStartValues,
                setEmpty,
               
              );
            }}
          >
            <AddIcon />
            <h4>Add Slot</h4>
          </AddContainer>
          <Button disabled={empty} onClick={submitTimeSlots}>Save Changes</Button>
        </form>
      </AddSlotContainer>
    </BackDrop>
  );
};

//add more slots
const addMoreSlot = (
  array,
  setArray,
  values,
  setValues,
  count,
  startValues,
  setStartValues,
  setEmpty,
  Schedules,
  setSchedules,
  day
) => {
  setArray([
    ...array,
    <StartEndComponent
      AddSlotArray={array}
      setAddSlotArray={setArray}
      deletes={true}
      values={values}
      setValues={setValues}
      count={count}
      startValues={startValues}
      setStartValues={setStartValues}
      setEmpty={setEmpty}
      Schedules={Schedules}
      setSchedules={setSchedules}
      day={day}
    />,
  ]);
};

//delete slot
const deleteSlot = (index, array, setArray, values,setValues, startValues,setStartValues) => {
  let allSlots = [...array];
  setValues(values);
  setStartValues(startValues);

  allSlots = allSlots.filter((slot, id) => {
    console.log(id, slot);
     return slot != index
});
  
  setArray(allSlots);
};

function ScheduleTiming({ openSidebar, getDays, addSchedule,Schedule }) {
  const { values, setValues } = useForm("schedule");
  const [Schedules, setSchedules] = useState([
    {
      Day: "Monday",
      Time: [],
      id: 1,
    },
    {
      Day: "Tuesday",
      Time: [],
      id: 2,
    },
    {
      Day: "Wednesday",
      Time: [],
      id: 3,
    },
    {
      Day: "Thursday",
      Time: [],
      id: 4,
    },
    {
      Day: "Friday",
      Time: [],
      id: 5,
    },
    {
      Day: "Saturday",
      Time: [],
      id: 6,
    },
    {
      Day: "Sunday",
      Time: [],
      id: 7,
    },
  ]);
  const [day, setDay] = useState("monday");
  const [activeLink, setActiveLink] = useState("monday");
  const [dayId, setDayId] = useState(1);

  const modalRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [available, setAvailable] = useState(false);
  let timeObjs = {};
  console.log(Schedule, "schedule")



  const closeModal = (event) => {
    if (modalRef.current === event.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    (event) => {
      if (event.key === "Escape" && setShowModal) {
        setShowModal(false);
      }
    },
    [setShowModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  useEffect(() => {
    const checkLink = Schedule?.filter((item)=> {
        return item.name === day && Object.keys(item.Time).length > 0
     })
     checkLink?.length > 0? setAvailable(true): setAvailable(false);
  }, [day]);

  useEffect(() => {
    getDays();
  }, [])

  return (
    <Container sidebar={openSidebar}>
      <ExpertSidebar />
      <MainBody>
        <Title>The timing page</Title>
        <TimingBox>
          <SubTitle>Timing Slot Duration</SubTitle>
          <SelectBox>
            <option value="" hidden>
              30mins
            </option>
          </SelectBox>

          <div>
            <List>
              {Schedule?.map((item, id) => {
                return (
                  <ListItem
                    key={id}
                    className={
                      day === item.name
                        ? "active"
                        : activeLink === item.id
                        ? "active"
                        : "null"
                    }
                    onClick={() => {
                      setActiveLink(item.id); //set active id
                      setDay(item.name); //set active day
                      setDayId(item.id); //set active id
                    }}
                  >
                    {item.name}
                  </ListItem>
                );
              })}
            </List>
            <AddSlot
              values={values}
              showModal={showModal}
              setValues={setValues}
              modalRef={modalRef}
              closeModal={closeModal}
              setShowModal={setShowModal}
              Schedules={Schedules}
              setSchedules={setSchedules}
              day={day}
              dayId={dayId}
              activeLink={activeLink}
              setAvailable={setAvailable}
              addSchedule={addSchedule}
            />
            <SlotBox>
              <h4>Time Slots</h4>
              <div onClick={() => setShowModal(true)}>
                <AddIcon />
                <h4>{available? "Edit Slot" : "Add Slot"}</h4>
              </div>
            </SlotBox>
            <TimeSlotBox>
              
              {/* {Schedules.filter((item) => item.Day === day)
                .map((item, id) => {
                  return !item.Time
                    ? timeObjs=[]
                    : Object.entries(item.Time).map(([key, value], id) => {
                        return Object.entries(value).map(([key, value], id) => {
                          const timeObj = [];
                          timeObj[id] = value;
                          return timeObj;
                        });
                      });
                })[0]
                .filter((item, id) => {
                    id % 2 === 0
                    ? (timeObjs["endTime"] = item)
                    : (timeObjs["startTime"] = item); //Sort element into endtime or startTime by their index
                })
              } */}

              {/* place each object array side by side e,g 1.00AM - 2:00PM */ 
              console.log(Schedules)
              }
              <div>
                <div>
                  {!available? <p>not available</p>:timeObjs.startTime?.map((item, index) => {
                    return (
                      <div key={index}>{`${item.join("")} - ${timeObjs.endTime[index].join(
                        ""
                      )}`}</div>
                    );
                  })}
                </div>
              </div>
            </TimeSlotBox>
          </div>
        </TimingBox>
      </MainBody>
    </Container>
  );
}

const mapStateProps = (state) => ({
  openSidebar: state.utils.openSidebar,
  Schedule: state.hospital.days
});

const mapDispatchToProps = (dispatch) => {
  return {
    getDays: () => dispatch(getDays()),
    addSchedule: (value) => dispatch(addSchedule(value))
  };
};

ScheduleTiming = connect(mapStateProps, mapDispatchToProps)(ScheduleTiming);
export default ScheduleTiming;

const Title = styled.h2`
  margin: 2em;
`;
const TimingBox = styled.div`
  margin: 3em;

  > div {
    border: 1px solid #dcd8d8;
    margin-top: 2em;
    width: 50rem;
  }
`;

const SubTitle = styled.h4`
  margin-bottom: 0.5em;
`;

const SelectBox = styled.select`
  width: 17em;
  padding: 0.8em 1em;
  border: 0px;
  font-size: 1em;
  font-family: inherit;

  :focus {
    outline: none;
  }

  &.add {
    border: 1px solid #c1c1c1;
    width: 15em;
    padding: 0.5em 1em;
  }
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-evenly;
  //margin: 1em 0;
  border-bottom: 1px solid #e0d5d5;
  /* padding-bottom: .5em; */
  padding: 1em;
`;

const ListItem = styled.li`
  border: 1px solid #c1c1c1;
  padding: 0.3em 1em;
  border-radius: 10px;

  &.active {
    background: #2fa5a8;
    color: white;
  }
`;

const TimeSlotBox = styled.div`
  padding: 0.6em;

  p {
    font-size: 1em;
    opacity: 0.5;
  }
`;

const SlotBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5em;

  > div {
    display: flex;
    column-gap: 0.2em;
    color: #2fa5a8;

    &:hover {
      opacity: 0.5;
      cursor: pointer;
    }
  }
`;

const BackDrop = styled.div`
  display: ${({ showModal }) => (showModal ? "block" : "none")};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;
const AddSlotContainer = styled.div`
  background-color: #fefefe;
  margin: 20% auto;
  padding: 20px 0;
  border: 1px solid #888;
  width: 35em;
  position: relative;
  z-index: 999;
  > div {
    display: flex;
    column-gap: 0.2em;
    padding-left: 20px;
    //color: #2fa5a8;
    > h4 {
      font-weight: 400;
    }
  }
`;
const SubtitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1em;
  border-bottom: 1px solid #c1c1c1;
  align-items: center;
  > p {
    padding: 0 0px;
    font-size: 1.4em;
    font-weight: bold;
  }
  .MuiSvgIcon-root {
    margin-right: 20px;
    &:hover {
      opacity: 0.5;
      cursor: pointer;
    }
  }
`;

const StartEndContainer = styled.div`
  display: flex;
  column-gap: 1em;
  margin: 1em 0;
  padding-left: 20px;
  p {
    margin-bottom: 0.3em;
  }
`;

const StartDate = styled.div``;
const EndDate = styled.div`
  .MuiSvgIcon-root {
    margin-left: 0.3em;

    &:hover {
      opacity: 0.5;
      cursor: pointer;
    }
  }
`;

const Slots = styled.div`
  display: flex;
  column-gap: 0.2em;
  padding-left: 20px;
`;

const Button = styled.button`
  padding: 0.5em 1em;
  //border: 1px solid black;
  width: 10em;
  margin: 1em auto;
  background: #2fa5a8;
  border-radius: 10px;
  color: white;
  font-size: inherit;
  border: 0;
  display: flex;
  justify-content: space-around;
  outline: none;
  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;

const AddContainer = styled.div`
  width: 8em;
  display: flex;
  padding-left: 20px;
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;
