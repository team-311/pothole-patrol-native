import axios from 'axios';

const defaultPotholes = {
  localPotholes: []
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
    const { data } = await axios.get(`http://169.254.79.192:8080/api/potholes/1`)
    dispatch(getSinglePothole(data))
  }
}

export default function (state = defaultPotholes, action) {
  switch (action.type) {
    case GET_SINGLE_POTHOLE:
      return action.pothole
    default:
      return state;
  }
}
