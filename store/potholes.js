import axios from 'axios';

//ACTION TYPES
const GET_POTHOLES = 'GET_POTHOLES'


//ACTION CREATORS

const getPotholes = (potholes) => {
  return {
    type: GET_POTHOLES,
    potholes
  }
}

//THUNKS

export const fetchPotholes = (lat, lon, latDelt, lonDelt) => {
  return async dispatch => {
    const potholes = await axios.get(`${process.env.SERVER_URL}/api/potholes/nearby?lat=${lat}&lon=${lon}`);
    dispatch(getPotholes(potholes.data))
  }
}

//Default state
const defaultPotholes = {
  potholes: []
}

export default function(state = defaultPotholes, action) {
  switch (action.type) {
    case GET_POTHOLES:
      return {...state, potholes: action.potholes}
    default:
      return state;
  }
}
