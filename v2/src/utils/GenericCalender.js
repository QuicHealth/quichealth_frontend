import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { getAllMonth, getMonth } from "./MonthAndDate";
import Before from "@material-ui/icons/NavigateBefore";
import Next from "@material-ui/icons/NavigateNext";

function getDayClass(day, format, daySelected) {
  //const format = "DD-MM-YY";
  const nowDay = dayjs().format(format);
  const currDay = day.format(format);
  const slcDay = daySelected && daySelected.format(format);

  if (nowDay === currDay) {
    return "bg-selDay";
  } else if (currDay === slcDay) {
    return "bg-currDay";
  } else {
    return "";
  }
}

// function getDaySelected(array, day, setSlotSelected) {
//   return array
//     ?.forEach((arr, id) => {
//       if (arr.date === day.format("DD-MM-YYYY")) {
//         setSlotSelected(arr.timeslot);
//         return arr;
//       }
//     })
//     .filter((arrs, id) => arrs !== undefined);
// }

function disableButton(array, day) {
  return array
    ?.forEach((arr, id) => {
      if (arr.date === day.format("DD-MM-YYYY")) {
        return true;
      }
    })
    .filter((arrs, id) => !!arrs);
}
function GenericCalender({
  daySelected,
  modal,
  setDaySelected,
  daysAvailable,
  setSlotSelected,
  disabled,
  setSelectedDay,
  slotSelected,
}) {
  let format = "DD-MM-YY";
  const [currentMonthIdx, setCurrentMonthIdx] = useState(daySelected.month());
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth(currentMonthIdx));

  const [smallCalenderMonth, setSmallCalenderMonth] = useState(null);

  const [allMonths, setAllMonth] = useState(getAllMonth());
  const [monthsModal, setMonthModal] = useState(false);

  console.log(slotSelected, daysAvailable, "calender");

  function getDayClass(day) {
    //const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);

    if (nowDay === currDay) {
      return "bg-selDay";
    } else if (currDay === slcDay) {
      return "bg-currDay";
    } else {
      return "";
    }
  }

  function getDaySelected(array, day) {
    console.log(array, day, "selected");
    return array?.forEach((arr, id) => {
      if (arr.day === day.format("dddd").toLowerCase()) {
        setSlotSelected(arr.timeslot);
      }
    });
  }

  function disableButton(daysAvailable, day) {
    if (
      (day.format("YYYY-MM-DD"),
      dayjs().format("YYYY-MM-DD") >= day.format("YYYY-MM-DD"))
    ) {
      return true;
    }
    return !daysAvailable?.some((dayAvail) => {
      return dayAvail.day === day.format("dddd").toLowerCase();
    });
  }

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  function handlePrevMonth() {
    setCurrentMonthIdx(currentMonthIdx - 1);
  }
  function handleNextMonth() {
    setCurrentMonthIdx(currentMonthIdx + 1);
  }

  function getMonths() {
    setMonthModal(!monthsModal);
  }

  return (
    <Calender className="patient">
      <CalenderHead className="patient">
        <span onClick={() => handlePrevMonth()}>
          <Before />
        </span>
        <>
          <p className="patient">
            {dayjs(new Date(dayjs().year(), dayjs(currentMonthIdx))).format(
              "MMMM YYYY"
            )}
          </p>
          {/* <CalenderIcon className="patient" onClick={getMonths}>
            <i className="fas fa-chevron-down down"></i>
          </CalenderIcon>{" "} */}
        </>
        <span onClick={() => handleNextMonth()}>
          <Next />
        </span>
      </CalenderHead>
      <CalenderBody modal={modal} className={monthsModal ? "monthModal" : ""}>
        {monthsModal ? (
          <>
            {allMonths.map((month, i) => {
              return (
                <Month
                  onClick={() => {
                    // console.log(i, "chcking")
                    setCurrentMonthIdx(i);
                    setMonthModal(false);
                  }}
                >
                  {dayjs(new Date(month)).format("MMMM")}
                </Month>
              );
            })}
          </>
        ) : (
          <>
            {currentMonth[0].map((day, i) => (
              <WeekDays key={i} modal={modal} className="patient">
                {day.format("ddd")}
              </WeekDays>
            ))}

            {currentMonth.map((row, i) => (
              <React.Fragment key={i}>
                {row.map((day, idx) => (
                  <button
                    disabled={disableButton(daysAvailable, day)}
                    key={idx}
                    className={`${getDayClass(day, format, daySelected)}`}
                    onClick={() => {
                      setSmallCalenderMonth(currentMonthIdx);
                      setDaySelected(day);
                      setSelectedDay(true);
                      getDaySelected(daysAvailable, daySelected);
                    }}
                  >
                    <span
                      style={{
                        color:
                          day["$M"] === currentMonthIdx ? "#252733" : "#D6D8E1",
                      }}
                      className={` ${getDayClass(
                        day,
                        format,
                        daySelected
                      )} patient `}
                    >
                      {day.format("D")}
                    </span>
                  </button>
                ))}
              </React.Fragment>
            ))}
          </>
        )}
      </CalenderBody>
    </Calender>
  );
}

export default GenericCalender;

const Calender = styled.div`
  background-color: white;
  margin-top: 1em;
  border: 3px solid #d5d5d5;
  border-radius: 10px;
  box-shadow: 0px, 6px rgba(0, 0, 0, 0.15);

  &.patient {
    border: 1px solid #dfe0eb;
    border-radius: 16px;
    @media only Screen and (max-width: 768px) {
      padding: 1em;
    }
  }
`;
const CalenderBody = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);

  &.monthModal {
    grid-template-columns: repeat(1, 1fr);
    font-size: 13px;
    font-weight: 600;
    justify-items: center;
  }

  button {
    border: 0;
    background-color: white;
    border-radius: 10px;
    color: blanchedalmond;
    padding: 1em;

    &.bg-currDay {
      background-color: #009688;
      color: white !important;
    }
    &.bg-selDay {
      background-color: white;
      color: #070647 !important;
    }
    &.patient {
      color: #070647;
    }
    &:disabled {
      opacity: 0.4;
      // color: white !important;
      cursor: not-allowed;
    }

    span {
      &.bg-currDay {
        color: white !important;
      }
      &.avail-day {
        //color: red !important;
      }
    }

    &:disabled span {
      //color: #dadade !important;
    }

    @media only Screen and (max-width: 768px) {
      padding: 0.5em;
    }
  }
`;

const Month = styled.span`
  cursor: pointer;
  padding: 0.1em;

  &:hover {
    opacity: 0.6;
  }
`;

const WeekDays = styled.span`
  text-align: center;
  padding: ${({ modal }) => (modal ? ".5em 0" : "0.5em 0")};
  font-size: ${({ modal }) => (modal ? "15px" : "13px")};
  color: #797b86;
  font-weight: ${({ modal }) => (modal ? "400" : "600")};
  &.bg-selDay,
  &.bg-currDay {
    color: white !important;
  }

  &.patient {
    font-weight: 600;
    line-height: 24px;
    color: #070647;
  }
`;

const CalenderHead = styled.div`
  display: flex;
  padding: 0.3em 0;
  margin-top: 1em;
  align-items: center;
  align-items: center;
  justify-content: space-between;

  p {
    font-size: 13px;
    font-weight: 600;
    color: #161a21;

    &.patient {
      color: #070647;
      /* margin-left: 1em;
      margin-left: 1.5em;
      margin-bottom: 1em; */
    }
  }
`;

const CalenderIcon = styled.div`
  cursor: pointer;

  &.patient {
    font-size: 0.5em;
    color: #7b7b7b;
    margin-left: 0.5em;
    position: relative;
    top: -1em;
  }
`;
