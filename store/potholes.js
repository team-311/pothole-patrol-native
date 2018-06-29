import axios from 'axios';

//ACTION TYPES
const GET_POTHOLES = 'GET_POTHOLES';
const GEOCODE_ADDRESS = 'GEOCODE_ADDRESS';
const UPVOTE_POTHOLE = 'UPVOTE_POTHOLE';
const UPDATE_USER_LAT_LON = 'UPDATE_USER_LAT_LON';
const UPDATE_ADDRESS = 'UPDATE_ADDRESS'

//ACTION CREATORS

const getPotholes = potholes => {
  return {
    type: GET_POTHOLES,
    potholes,
  };
};

export const updateAddressActionCreator = address => {
  return {
    type: UPDATE_ADDRESS,
    address
  }
}

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

const updateUserLatLon = coordinates => {
  return {
    type: UPDATE_USER_LAT_LON,
    coordinates
  }
}

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
// } put the location on state
//this is actual regular geocodin

export const updateUserLatLonThunkCreator = (address) => {
  const streetNum = address[0].long_name
  const streetName = address[1].long_name.split().join('+')
  const zip = address[7].long_name
  const query = `${streetNum}+${streetName},+Chicago,+IL,+${zip}`
  console.log('query', query)
  return async dispatch => {
    const results = await axios(`https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=AIzaSyCDyhK7JGy-x8idR46N4pHd89LtxKzbuq8`)
  console.log('results from reverse geocode', results.data.results[0].geometry.location.lat)
  console.log('latitude:,', results.data.results[0].geometry.location.lat, 'longitude',results.data.results[0].geometry.location.lng)
    //get coordinates
    // dispatch(updateUserLatLon(coordinates))
  }
}


// results
// :
// Array(1)
// 0
// :
// address_components
// :
// (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// formatted_address
// :
// "5662 N Clark St, Chicago, IL 60660, USA"
// geometry
// :
// location
// :
// {lat: 41.98513000000001, lng: -87.669434}
// location_type
// :
// "ROOFTOP"


// (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// 0
// :
// {long_name: "5662", short_name: "5662", types: Array(1)}
// 1
// :
// {long_name: "North Clark Street", short_name: "N Clark St", types: Array(1)}
// 2
// :
// {long_name: "Edgewater", short_name: "Edgewater", types: Array(2)}
// 3
// :
// {long_name: "Chicago", short_name: "Chicago", types: Array(2)}
// 4
// :
// {long_name: "Cook County", short_name: "Cook County", types: Array(2)}
// 5
// :
// {long_name: "Illinois", short_name: "IL", types: Array(2)}
// 6
// :
// {long_name: "United States", short_name: "US", types: Array(2)}
// 7
// :
// {long_name: "60660", short_name: "60660", types: Array(1)}

//Default state
const defaultPotholes = {
  potholes: [],
  address: [],
  upvotes: [],
  userLatLon: []
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
    case UPDATE_USER_LAT_LON: {
      return {...state, userLatLon: action.coordinates}
    }
    case UPDATE_ADDRESS: {
      return {...state, address: action.address}
    }
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
