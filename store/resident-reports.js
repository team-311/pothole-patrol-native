import axios from "axios";

const initialState = {
  total: 0,
  potholes: [],
  error: '',
};

// action types
const GOT_RESIDENT_REPORTS = 'GOT_RESIDENT_REPORTS'
const GET_RESIDENT_REPORTS_ERROR = 'GET_RESIDENT_REPORTS_ERROR'

// action creators
export const createGotResidentReportsAction = reports => {
  return {
    type: GOT_RESIDENT_REPORTS,
    reports,
  }
}

export const createGetResidentRequestsErrorAction = error => {
  return {
    type: GET_RESIDENT_REPORTS_ERROR,
    error
  }
}

// thunk creators
export const createGetResidentReportsThunk = (userId) => {
  return async (dispatch) => {
    try {
      const { data: potholes } = await axios.get(`${process.env.SERVER_URL}/api/users/${userId}/potholes`)
      const reports = {
        total: potholes.length,
        potholes: potholes,
      }
      dispatch(createGotResidentReportsAction(reports))
    } catch (error) {
      dispatch(createGetResidentRequestsErrorAction(error.message))
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_RESIDENT_REPORTS:
      return {...state, total: action.reports.total, potholes: action.reports.potholes}
    case GET_RESIDENT_REPORTS_ERROR:
      return {...state, error: action.error}
    default:
      return state;
  }
}
