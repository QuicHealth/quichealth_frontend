import React from 'react';

export const days= () => {
    const store = [];
    for (let i = 1; i < 32; i++){
        store.push(i)
    }
    return store;
}

export const years= () => {
    const store = [];
    for (let i = 1940; i < 2021; i++){
        store.push(i)
    }
    return store;
}
export const dates = (val) => {
    
    const result = val ? days(): years();
    return result;
}

export const gender = () => {
    
}

export const months = {
        "jan": "January",
        "feb": "Febuary",
        "mar": "March",
        "apr": "April",
        "may": "May",
        "jun": "June",
        "jul": "July",
        "aug": "August",
        "sep": "September",
        "oct": "October",
        "nov": "November",
        "dec": "December"
}