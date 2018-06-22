import axios from 'axios';

//ACTION TYPES
const GET_POTHOLES = 'GET_POTHOLES'
const GEOCODE_ADDRESS = 'GEOCODE_ADDRESS'

//ACTION CREATORS

const getPotholes = (potholes) => {
  return {
    type: GET_POTHOLES,
    potholes
  }
}

const geocodeAddress = (address) => {
  return {
    type: GEOCODE_ADDRESS,
    address
  }
}

//THUNKS

export const fetchPotholes = (lat, lon, latDelt, lonDelt) => {
  return async dispatch => {
    const potholes = await axios.get(`${process.env.SERVER_URL}/api/potholes/nearby?lat=${lat}&lon=${lon}`);
    dispatch(getPotholes(potholes.data))
  }
}

export const getGeocodedAddress = (lat, lon) => {
  return async dispatch => {
    const results = await axios(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyCDyhK7JGy-x8idR46N4pHd89LtxKzbuq8`)
    const dataResults = results.data.results[0].address_components
    const streetNumber = dataResults[0].long_name
    const streetName = dataResults[1].short_name
    const zipcode = dataResults[7].long_name
    const fullAddressArray = [streetNumber, streetName, zipcode]
    dispatch(geocodeAddress(fullAddressArray))
  }
}

//Default state
const defaultPotholes = {
  localPotholes: [],
  address: []
}

export default function(state = defaultPotholes, action) {
  switch (action.type) {
    case GEOCODE_ADDRESS:
      return {...state, address: action.address}
    case GET_POTHOLES:
      return {...state, potholes: action.potholes}
    default:
      return state;
  }
}
