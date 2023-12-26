import dayjs from "dayjs";

export function getAllMonth() {
  let currentMonth = 0;
  const months = new Array(12).fill(null).map(() => {
    currentMonth++;
    return dayjs().month(currentMonth - 1);
  });
  return months;
}

export function getMonth(month = dayjs().month()) {
  console.log(month, "month");
  month = Math.floor(month);
  const year = dayjs().year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 0 - firstDayOfTheMonth;
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });

  return daysMatrix;
}

export const addZeroPrefix = (digit) => {
  if (digit.toString().length > 1 || digit === undefined || digit === null)
    return digit;

  return `0${digit}`;
};

export const addAMPMToTime = (time) => {
  if (!time) return;
  return parseInt(time.slice(0, 2)) > 7 && parseInt(time.slice(0, 2)) < 12
    ? `${time} AM`
    : `${time} PM`;
};

export const formatDate = (date) => {
  const d = date;
  const day = d?.slice(0, 2);
  const month = d?.slice(3, 5);
  const year = d?.slice(-4);

  const newDate = `${year}-${month}-${day}`;

  return dayjs(newDate).format("dddd MMM D, YYYY");
};

// Custom comparator function to convert "start" time to minutes past midnight
export function compareStartTimes(a, b) {
  const timeA = a.start.split(":").map(Number);
  const timeB = b.start.split(":").map(Number);

  const minutesA = timeA[0] * 60 + timeA[1];
  const minutesB = timeB[0] * 60 + timeB[1];

  console.log(timeA, timeB, minutesA, minutesB, "sort");
  if (minutesA <= 400 || minutesB <= 400) {
    if (minutesB > minutesA) {
      return 1;
    }
  } else {
    return minutesA - minutesB;
  }
}
