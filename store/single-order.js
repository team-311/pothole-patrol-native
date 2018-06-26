import axios from 'axios'

// action types
const GOT_SINGLE_ORDER = 'GOT_SINGLE_ORDER'
const GET_SINGLE_ORDER_ERROR = 'GOT_SINGLE_ORDER_ERROR'
const GET_SINGLE_ORDER = 'GET_SINGLE_ORDER'

// initial state
const initialState = {
  order: {},
  error: '',
  isFetching: false,
}

// action creators
const createGetSingleOrderAction = () => ({type: GET_SINGLE_ORDER})
const createGetSingleOrderErrorAction = (error) => ({type: GET_SINGLE_ORDER_ERROR, error})
const createGotSingleOrderAction = (order) => ({type: GOT_SINGLE_ORDER, order})

// thunk creators
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

// reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_ORDER:
      return {...state, isFetching: true}
    case GOT_SINGLE_ORDER:
      return {...state, order: action.order, error: '', isFetching: false}
    case GET_SINGLE_ORDER_ERROR:
      return {...state, error: action.error, isFetching: false}
    default:
      return state
  }
}
