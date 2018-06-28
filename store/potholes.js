import axios from 'axios';

//ACTION TYPES
const GET_POTHOLES = 'GET_POTHOLES';
const GEOCODE_ADDRESS = 'GEOCODE_ADDRESS';
const UPVOTE_POTHOLE = 'UPVOTE_POTHOLE';
// const GEOCODE_USER_LOCATION = 'GEOCODE_USER_LOCATION'

//ACTION CREATORS

const getPotholes = potholes => {
  return {
    type: GET_POTHOLES,
    potholes,
  };
};

const geocodeAddress = address => {
  return {
    type: GEOCODE_ADDRESS,
    address,
  };
};

const upvotePothole = upvotedPothole => {
  return {
    type: UPVOTE_POTHOLE,
    upvotedPothole: upvotedPothole.pothole,
    upvoters: upvotedPothole.upvoters
  }
}

// const geocodeUserLocation = coordinates => {
//   return {
//     type: GEOCODE_USER_LOCATION,
//     coordinates
//   }
// }

//THUNKS

export const upvotePotholeInDB = (potholeId, userId) => {
  const postObject = {potholeId, userId}
  return async dispatch => {
    const upvotedPotholeData = await axios.put(`${process.env.SERVER_URL}/api/potholes/upvote`, postObject)
    dispatch(upvotePothole(upvotedPotholeData.data))
  }
}

export const fetchPotholes = (lat, lon) => {
  return async dispatch => {
    const potholes = await axios.get(
      `${process.env.SERVER_URL}/api/potholes/nearby?lat=${lat}&lon=${lon}`
    );
    dispatch(getPotholes(potholes.data));
  };
};

export const getGeocodedAddress = (lat, lon) => {
  return async dispatch => {
    const results = await axios(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyCDyhK7JGy-x8idR46N4pHd89LtxKzbuq8`
    );
    const dataResults = results.data.results[0].address_components;
    const streetNumber = dataResults[0].long_name;
    const streetName = dataResults[1].short_name;
    const city = dataResults[3].short_name
    const state = dataResults[5].long_name
    const zipcode = dataResults[7].long_name;
    const fullAddressArray = [streetNumber, streetName, zipcode, city, state];
    dispatch(geocodeAddress(fullAddressArray));

    return fullAddressArray;
  };
};

// export const reverseGeocodeAddress = (address) => {
//   const query = //fill this in
//   return async dispatch => {
//     const results = await axios(`https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyCDyhK7JGy-x8idR46N4pHd89LtxKzbuq8`)
//   }
// }


//Default state
const defaultPotholes = {
  potholes: [],
  address: [],
  upvotes: [],
  userLocation: []
};

export const GET_SINGLE_POTHOLE = 'GET_SINGLE_POTHOLE';

const getSinglePothole = pothole => {
  return {
    type: GET_SINGLE_POTHOLE,
    pothole,
  };
};

export const getSinglePotholeServer = id => {
  return async dispatch => {
    const { data } = await axios.get(`${process.env.SERVER_URL}/api/potholes/${id}`);
    dispatch(getSinglePothole(data));
  };
};

export function potholesReducer(state = defaultPotholes, action) {
  switch (action.type) {
    case GEOCODE_ADDRESS:
      return { ...state, address: action.address };
    case GET_POTHOLES:
      return { ...state, potholes: action.potholes };
    // case GEOCODE_USER_LOCATION: {
    //   return {...state, userLocation: action.coordinates}
    // }
    default:
      return state;
  }
}


export function singlePotholeReducer(state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_POTHOLE:
      return {pothole: action.pothole, upvoters: action.pothole.upvoters};
    case UPVOTE_POTHOLE:
      return {...state, pothole: action.upvotedPothole, upvoters: action.upvoters}
    default:
      return state;
  }
}
