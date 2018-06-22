import axios from 'axios';

//geocoding is where Google finds the address based on the lat and long
const GEOCODE_ADDRESS = 'GEOCODE_ADDRESS'

const geocodeAddress = (address) => {
  return {
    type: GEOCODE_ADDRESS,
    address
  }
}

export const getGeocodedAddress = async (lat, lon) => {
  return async dispatch => {
    const {results} = await axios(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyCDyhK7JGy-x8idR46N4pHd89LtxKzbuq8`)
    const someDetails = results[0]
    console.log('someDetails', someDetails)
    console.log('getting geocoded address')
    // dispatch(geocodeAddress(someDetails))
  }
}

const defaultPotholes = {
  localPotholes: []
}

export default function(state = defaultPotholes, action) {
  switch (action.type) {
    case GEOCODE_ADDRESS:
      return {...state, address: action.address}
    default:
      return state;
  }
}
