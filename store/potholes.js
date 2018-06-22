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

export const GET_SINGLE_POTHOLE = 'GET_SINGLE_POTHOLE'

const getSinglePothole = (pothole) => {
  return {
    type: GET_SINGLE_POTHOLE,
    pothole
  }
}

export const getSinglePotholeServer = (id) => {
  console.log('here')
  return async (dispatch) => {
    const { data } = await axios.get(`http://172.17.21.27:8080/api/potholes/1`)
    dispatch(getSinglePothole(data))
  }
}

export function potholesReducer(state = defaultPotholes, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export function singlePotholeReducer(state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_POTHOLE:
      return action.pothole
    default:
      return state;
  }
}
