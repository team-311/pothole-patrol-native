import axios from 'axios'
/* eslint-disable complexity */

// action types
const GOT_SINGLE_ORDER = 'GOT_SINGLE_ORDER'
const GET_SINGLE_ORDER_ERROR = 'GOT_SINGLE_ORDER_ERROR'
const GET_SINGLE_ORDER = 'GET_SINGLE_ORDER'
const UPDATING_SINGLE_ORDER = 'UPDATING_SINGLE_ORDER'
const UPDATING_SINGLE_ORDER_ERROR = 'UPDATING_SINGLE_ORDER_ERROR'
const UPDATED_SINGLE_ORDER = 'UPDATED_SINGLE_ORDER'
const UPDATING_SINGLE_ORDER_POTHOLE = 'UPDATING_SINGLE_ORDER_POTHOLE'
const UPDATING_SINGLE_ORDER_POTHOLE_ERROR = 'UPDATING_SINGLE_ORDER_POTHOLE_ERROR'
const UPDATED_SINGLE_ORDER_POTHOLE = 'UPDATE_SINGLE_ORDER_POTHOLE'
const GET_SINGLE_ORDER_NEXT_POTHOLE = 'GET_SINGLE_ORDER_NEXT_POTHOLE'
const GOT_SINGLE_ORDER_NEXT_POTHOLE = 'GOT_SINGLE_ORDER_NEXT_POTHOLE'

// initial state
const initialState = {
  order: {},
  error: '',
  isFetching: true,
}

// action creators
const createGetSingleOrderAction = () => ({type: GET_SINGLE_ORDER})
const createGetSingleOrderErrorAction = (error) => ({type: GET_SINGLE_ORDER_ERROR, error})
const createGotSingleOrderAction = (order) => ({type: GOT_SINGLE_ORDER, order})
const createUpdatingSingleOrderAction = () => ({type: UPDATING_SINGLE_ORDER})
const createUpdatingSingleOrderErrorAction = (error) => ({type: UPDATING_SINGLE_ORDER_ERROR, error})
const createUpdatedSingleOrderAction = (order) => ({type: UPDATED_SINGLE_ORDER, order})
const createUpdatingSingleOrderPotholeAction = () => ({type: UPDATING_SINGLE_ORDER_POTHOLE})
const createUpdatedSingleOrderPotholeAction = (pothole) => ({type: UPDATED_SINGLE_ORDER_POTHOLE, pothole})
const createUpdatingSingleOrderPotholeErrorAction = (error) => ({type: UPDATING_SINGLE_ORDER_POTHOLE_ERROR, error})
const createGetSingleOrderNextPotholeAction = () => ({type: GET_SINGLE_ORDER_NEXT_POTHOLE})
const createGotSingleOrderNextPotholeAction = (pothole) => ({type: GOT_SINGLE_ORDER_NEXT_POTHOLE, pothole})

// thunk creators
export const createGetTodaysOrderThunk = (crewId) => {
  return async (dispatch) => {
    try {
      dispatch(createGetSingleOrderAction())
      const { data: order } = await axios.get(`${process.env.SERVER_URL}/api/crews/${crewId}/orders/today`)
      dispatch(createGotSingleOrderAction(order))
    } catch (error) {
      dispatch(createGetSingleOrderErrorAction(error.message))
    }
  }
}

export const createCreateNewOrderThunk = (crewId) => {
  return async (dispatch) => {
    try {
      dispatch(createGetSingleOrderAction())
      const { data : order } = await axios.post(`${process.env.SERVER_URL}/api/crews/${crewId}/orders/`)
      dispatch(createGotSingleOrderAction(order))
    } catch (error) {
      dispatch(createGetSingleOrderErrorAction(error.message))
    }
  }
}

export const createGetSingleOrderThunk = (crewId, orderId) => {
  return async (dispatch) => {
    try {
      dispatch(createGetSingleOrderAction())
      const { data: order } = await axios.get(`${process.env.SERVER_URL}/api/crews/${crewId}/orders/${orderId}`)
      dispatch(createGotSingleOrderAction(order))
    } catch (error) {
      dispatch(createGetSingleOrderErrorAction(error.message))
    }
  }
}

export const createUpdateSingleOrderPotholeThunk = (crewId, potholeId) => {
  return async (dispatch) => {
    try {
      dispatch(createUpdatingSingleOrderPotholeAction())
      const { data: pothole } = await axios.put(`${process.env.SERVER_URL}/api/crews/${crewId}/potholes/${potholeId}/complete`)
      dispatch(createUpdatedSingleOrderPotholeAction(pothole))
    } catch (error) {
      dispatch(createUpdatingSingleOrderPotholeErrorAction(error.message))
    }
  }
}

export const createGetNextPotholeThunk = (crewId, orderId, lat, lon) => {
  return async (dispatch) => {
    try {
      dispatch(createGetSingleOrderNextPotholeAction())
      const { data: newPothole } = await axios.put(`${process.env.SERVER_URL}/api/crews/${crewId}/orders/${orderId}/next`, {lat, lon})
      dispatch(createGotSingleOrderNextPotholeAction(newPothole))
    } catch (error) {
      console.error(error)
    }
  }
}

export const createUpdateStatusSingleOrderThunk = (crewId, orderId, status) => {
  return async (dispatch) => {
    try {
      dispatch(createUpdatingSingleOrderAction())
      const {data: order} = await axios.put(`${process.env.SERVER_URL}/api/crews/${crewId}/orders/${orderId}`, {status})
      dispatch(createUpdatedSingleOrderAction(order))
    } catch (error) {
      dispatch(createUpdatingSingleOrderErrorAction(error.message))
    }
  }
}

// reducer
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_ORDER:
    case UPDATING_SINGLE_ORDER:
    case UPDATING_SINGLE_ORDER_POTHOLE:
    case GET_SINGLE_ORDER_NEXT_POTHOLE:
      return { ...state, isFetching: true }
    case GET_SINGLE_ORDER_ERROR:
    case UPDATING_SINGLE_ORDER_ERROR:
    case UPDATING_SINGLE_ORDER_POTHOLE_ERROR:
      return { ...state, isFetching: false, error: action.error }
    case GOT_SINGLE_ORDER:
    case UPDATED_SINGLE_ORDER:
      return {...state, error: '', isFetching: false, order: action.order}
    case GOT_SINGLE_ORDER_NEXT_POTHOLE:
      return {
        ...state,
        error: '',
        isFetching: false,
        order: { ...state.order, potholes: [...state.order.potholes, action.pothole] }
      }
    case UPDATED_SINGLE_ORDER_POTHOLE:
      return {
        ...state,
        error: '',
        isFetching: false,
        order: {
          ...state.order, potholes: state.order.potholes.map(pothole => {
            return pothole.id === action.pothole.id ? action.pothole : pothole
          })
        },
      }
    default:
      return state
  }
}
