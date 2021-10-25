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
       i = (i).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
      }
      store.push(h + ":" + i + "AM");
      i=parseInt(i, 10);
    }
  }
  if (store.includes("12:00AM")) {
    for (let h = 0; h <= 12; h++) {
      for (i = 0; i < 60; i += 30) {
        if (i === 0) {
          i = (i).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) // replace 0.0 to 0.00
         }
        store.push(h + ":" + i + "PM");
        i=parseInt(i, 10);
      }
    }
  }
  return store;
};


export const locations = {
  ib: "Ibadan",
  lekki: "Lekki",
  lag: "Lagos",
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
