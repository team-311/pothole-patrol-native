import axios from 'axios'

// action types
const GET_COMPLETED_ORDERS = 'GET_COMPLETED_ORDERS'
const GET_COMPLETED_ORDERS_ERROR = 'GET_COMPLETED_ORDERS_ERROR'
const GOT_COMPLETED_ORDERS = 'GOT_COMPLETED_ORDERS'

// initial state
const initialState = {
  previousOrders: [],
  totalPotholesPrevious: 0,
  thisWeeksOrders: [],
  totalPotholesThisWeek: 0,
  total: 0,
  error: '',
  isFetching: true,
  crew: '',
}

// action creators
const createGetCompletedOrdersAction = () => ({ type: GET_COMPLETED_ORDERS })
const createGetCompletedOrdersErrorAction = (error) => ({ type: GET_COMPLETED_ORDERS_ERROR, error })
const createGotCompletedOrdersAction = (ordersInfo) => ({ type: GOT_COMPLETED_ORDERS, ordersInfo })

// thunk creators
export const createGetCompletedOrdersThunk = (crewId) => {
  return async (dispatch) => {
    try {
      dispatch(createGetCompletedOrdersAction())
      const { data: response } = await axios.get(`${process.env.SERVER_URL}/api/crews/${crewId}/orders/completed`)
      const newState = {
        previousOrders: response.previousOrders,
        thisWeeksOrders: response.thisWeeksOrders,
        total: response.total,
        crew: response.crew,
        totalPotholesPrevious: response.totalPotholesPrevious,
        totalPotholesThisWeek: response.totalPotholesThisWeek,
      }
      dispatch(createGotCompletedOrdersAction(newState))
    } catch (error) {
      dispatch(createGetCompletedOrdersErrorAction(error.message))
    }
  }
}

// reducer
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COMPLETED_ORDERS:
      return { ...state, isFetching: true }
    case GET_COMPLETED_ORDERS_ERROR:
      return { ...state, isFetching: false, error: action.error }
    case GOT_COMPLETED_ORDERS:
      return {
        ...state,
        isFetching: false,
        error: '',
        previousOrders: action.ordersInfo.previousOrders,
        thisWeeksOrders: action.ordersInfo.thisWeeksOrders,
        total: action.ordersInfo.total,
        crew: action.ordersInfo.crew,
        totalPotholesPrevious: action.ordersInfo.totalPotholesPrevious,
        totalPotholesThisWeek: action.ordersInfo.totalPotholesThisWeek,
      }
    default:
      return state
  }
}
