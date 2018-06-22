import axios from 'axios';

const GEOCODE_ADDRESS = 'GEOCODE_ADDRESS'

const geocodeAddress = (address) => {
  return {
    type: GEOCODE_ADDRESS,
    address
  }
}

export const getGeocodedAddress = (lat, lon) => {
  return async dispatch => {
    const results = await axios(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyCDyhK7JGy-x8idR46N4pHd89LtxKzbuq8`)
    const dataResults = results.data.results[0].address_components
    const streetNumber = dataResults[0].long_name
    const streetName = dataResults[1].short_name
    const city = dataResults[3].long_name
    const state = dataResults[5].short_name
    const zipcode = dataResults[7].long_name
    const fullAddressArray = [streetNumber, streetName, city, state, zipcode]
    dispatch(geocodeAddress(fullAddressArray))
  }
}

const defaultPotholes = {
  localPotholes: [],
  address: []
}

export default function(state = defaultPotholes, action) {
  switch (action.type) {
    case GEOCODE_ADDRESS:
      return {...state, address: action.address}
    default:
      return state;
  }
}
