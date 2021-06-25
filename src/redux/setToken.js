import axios from 'axios';

export const setToken = (token) => {
  if(token) axios.defaults.headers.common['x-access-token'] = token;
  else delete axios.defaults.headers.common['x-access-token']
}


export const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}
