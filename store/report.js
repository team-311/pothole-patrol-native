import axios from "axios";

const initialState = {
  location: {},
  imageUrl: '',
  error: '',
};

// Action Type
const GET_PICTURE = 'GET_PICTURE';
const CLEAR_PICTURE = 'CLEAR_PICTURE';
const CLEAR_REPORT = 'CLEAR_REPORT';
const REPORT_ERROR = 'REPORT_ERROR';
const UPDATE_LOCATION = 'UPDATE_LOCATION';

//Action Creator
export const getPicture = picture => {
  return {
    type: GET_PICTURE,
    picture,
  };
};

export const createUpdateLocationAction = (location) => {
  return {
    type: UPDATE_LOCATION,
    location
  }
}

const clearReport = () => {
  return {
    type: CLEAR_REPORT,
  }
}

const createError = (error) => {
  return {
    type: REPORT_ERROR,
    error: error.message,
  }
}

export const clearPicture = () => {
  return {
    type: CLEAR_PICTURE,
  }
}

// thunk creators
export const createPostReportThunk = report => {
  return async (dispatch) => {
    try {
      await axios.post(`${process.env.SERVER_URL}/api/potholes`, report)
      dispatch(clearReport())
    } catch (error) {
      dispatch(createError(error))
    }
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PICTURE:
      return { ...state, imageUrl: action.picture }
    case CLEAR_PICTURE:
      return { ...state, imageUrl: '' }
    case UPDATE_LOCATION:
      return { ...state, location: action.location }
    case CLEAR_REPORT:
      return { ...initialState }
    case REPORT_ERROR:
      return { ...state, error: action.error }
    default:
      return state;
  }
}
