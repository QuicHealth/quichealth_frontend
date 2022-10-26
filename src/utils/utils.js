import dayjs from "dayjs";

export const days = () => {
  const store = [];
  for (let i = 1; i < 32; i++) {
    store.push(i);
  }
  return store;
};

export const years = () => {
  const store = [];
  for (let i = 1940; i < 2021; i++) {
    store.push(i);
  }
  return store;
};
export const dates = (val) => {
  const result = val ? days() : years();
  return result;
};

export const timeAvailable = () => {
  const store = [];
  let i;
  for (let h = 0; h <= 12; h++) {
    for (i = 0; i < 60; i += 30) {
      if (i === 0) {
        i = i.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        });
      }
      store.push(h + ":" + i + "AM");
      i = parseInt(i, 10);
    }
  }
  if (store.includes("12:00AM")) {
    for (let h = 0; h <= 12; h++) {
      for (i = 0; i < 60; i += 30) {
        if (i === 0) {
          i = i.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          }); // replace 0.0 to 0.00
        }
        store.push(h + ":" + i + "PM");
        i = parseInt(i, 10);
      }
    }
  }
  return store;
};

export const locations = {
  ib: "Ibadan",
  lekki: "Lekki",
  lag: "Lagos",
  ow: "owerri"
};

export const genders = {
  male: "Male",
  female: "Female",
};

export const months = {
  jan: "January",
  feb: "Febuary",
  mar: "March",
  apr: "April",
  may: "May",
  jun: "June",
  jul: "July",
  aug: "August",
  sep: "September",
  oct: "October",
  nov: "November",
  dec: "December",
};

export function getMonth(month = dayjs().month()) {
  month = Math.floor(month);
  const year = dayjs().year();
  const firstDayOfTheMonth = dayjs(new Date(year, month)).daysInMonth();

  let monthCount = dayjs(new Date(year, month)).daysInMonth();
  //console.log(dayjs().month().format("MMMM"), "month")
  let currentMonthCount = 0;
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount ));
      
  
    });
  });

  return daysMatrix;
}

export function getAllMonth() {
  let month = Math.floor(dayjs().month());
  let currentMonth = 0;
  const year = dayjs().year();
  const months = new Array(12).fill(null).map(() => {
    currentMonth++;
    return dayjs().month(currentMonth-1)

    //    return dayjs(new Date (dayjs().year(),(currentMonth-1))).format("MMM YYYY")
  });
  return months
}

export const TimeSelection1 = [
  {
    slot: 1,
    start: "9:00",
    end: "09:30",
    selected: false,
    status: "enabled",
    value: "9:00AM - 9:30AM",
  },
  {
    slot: 2,
    start: "9:30",
    end: "10:00",
    selected: false,
    status: "enabled",
    value: "9:30AM - 10:00AM",
  },
  {
    slot: 3,
    start: "10:00",
    end: "10:30",
    selected: false,
    status: "enabled",
    value: "10:00AM - 10:30AM",
  },
  {
    slot: 4,
    start: "10:30",
    end: "11:00",
    selected: false,
    status: "enabled",
    value: "10:30AM - 11:00AM",
  },
  {
    slot: 5,
    start: "11:00",
    end: "11:30",
    selected: false,
    status: "enabled",
    value: "11:00AM - 11:30AM",
  },
  {
    slot: 6,
    start: "11:30",
    end: "12:00",
    selected: false,
    status: "enabled",
    value: "11:30AM - 12:00PM",
  },
  {
    slot: 7,
    start: "12:00",
    end: "12:30",
    selected: false,
    status: "enabled",
    value: "12:00PM - 12:30PM",
  },
  {
    slot: 8,
    start: "12:30",
    end: "01:00",
    selected: false,
    status: "enabled",
    value: "12:30AM - 01:00PM",
  },
  {
    slot: 9,
    start: "01:00",
    end: "01:30",
    selected: false,
    status: "enabled",
    value: "01:00PM - 01:30PM",
  },
];
export const TimeSelection2 = [
  {
    slot: 10,
    start: "01:30",
    end: "02:00",
    selected: false,
    status: "enabled",
    value: "01:30PM - 02:00PM",
  },
  {
    slot: 11,
    start: "02:00",
    end: "02:30",
    selected: false,
    status: "enabled",
    value: "02:00PM - 02:30PM",
  },
  {
    slot: 12,
    start: "02:30",
    end: "03:00",
    selected: false,
    status: "enabled",
    value: "02:30AM - 03:00PM",
  },
  {
    slot: 13,
    start: "03:00",
    end: "03:30",
    selected: false,
    status: "enabled",
    value: "03:00AM - 03:30PM",
  },
  {
    slot: 14,
    start: "03:30",
    end: "04:00",
    selected: false,
    status: "enabled",
    value: "03:30PM - 04:00PM",
  },
  {
    slot: 15,
    start: "04:00",
    end: "04:30",
    selected: false,
    status: "enabled",
    value: "04:0PM - 04:30PM",
  },
  {
    slot: 16,
    start: "04:30",
    end: "05:00",
    selected: false,
    status: "enabled",
    value: "04:30PM - 05:00PM",
  },
  {
    slot: 17,
    start: "05:00",
    end: "05:30",
    selected: false,
    status: "enabled",
    value: "05:00AM - 05:30PM",
  },
  {
    slot: 18,
    start: "05:00",
    end: "05:30",
    selected: false,
    status: "enabled",
    value: "05:30PM - 06:00PM",
  },
];

export const TimeSelections = [
  {
    slot: 1,
    start: "09:00",
    end: "09:30",
    selected: false,
    status: "enabled",
    value: "9:00AM - 9:30AM",
  },
  {
    slot: 2,
    start: "09:30",
    end: "10:00",
    selected: false,
    status: "enabled",
    value: "9:30AM - 10:00AM",
  },
  {
    slot: 3,
    start: "10:00",
    end: "10:30",
    selected: false,
    status: "enabled",
    value: "10:00AM - 10:30AM",
  },
  {
    slot: 4,
    start: "10:30",
    end: "11:00",
    selected: false,
    status: "enabled",
    value: "10:30AM - 11:00AM",
  },
  {
    slot: 5,
    start: "11:00",
    end: "11:30",
    selected: false,
    status: "enabled",
    value: "11:00AM - 11:30AM",
  },
  {
    slot: 6,
    start: "11:30",
    end: "12:00",
    selected: false,
    status: "enabled",
    value: "11:30AM - 12:00PM",
  },
  {
    slot: 7,
    start: "12:00",
    end: "12:30",
    selected: false,
    status: "enabled",
    value: "12:00PM - 12:30PM",
  },
  {
    slot: 8,
    start: "12:30",
    end: "01:00",
    selected: false,
    status: "enabled",
    value: "12:30AM - 01:00PM",
  },
  {
    slot: 9,
    start: "01:00",
    end: "01:30",
    selected: false,
    status: "enabled",
    value: "01:00PM - 01:30PM",
  },
  {
    slot: 10,
    start: "01:30",
    end: "02:00",
    selected: false,
    status: "enabled",
    value: "01:30PM - 02:00PM",
  },
  {
    slot: 11,
    start: "02:00",
    end: "02:30",
    selected: false,
    status: "enabled",
    value: "02:00PM - 02:30PM",
  },
  {
    slot: 12,
    start: "02:30",
    end: "03:00",
    selected: false,
    status: "enabled",
    value: "02:30AM - 03:00PM",
  },
  {
    slot: 13,
    start: "03:00",
    end: "03:30",
    selected: false,
    status: "enabled",
    value: "03:00AM - 03:30PM",
  },
  {
    slot: 14,
    start: "03:30",
    end: "04:00",
    selected: false,
    status: "enabled",
    value: "03:30PM - 04:00PM",
  },
  {
    slot: 15,
    start: "04:00",
    end: "04:30",
    selected: false,
    status: "enabled",
    value: "04:0PM - 04:30PM",
  },
  {
    slot: 16,
    start: "04:30",
    end: "05:00",
    selected: false,
    status: "enabled",
    value: "04:30PM - 05:00PM",
  },
  {
    slot: 17,
    start: "05:00",
    end: "05:30",
    selected: false,
    status: "enabled",
    value: "05:00PM - 05:30PM",
  },
  {
    slot: 18,
    start: "05:30",
    end: "06:00",
    selected: false,
    status: "enabled",
    value: "05:30PM - 06:00PM",
  },
];