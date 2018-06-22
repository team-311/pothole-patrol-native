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
