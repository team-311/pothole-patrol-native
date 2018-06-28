import axios from 'axios'

// action types
const GET_ORDERS = 'GET_ORDERS'
const GET_ORDERS_ERROR = 'GET_ORDERS_ERROR'
const GOT_ORDERS = 'GOT_ORDERS'

// initial state
const initialState = {
  orders: [],
  count: 0,
  currentPage: 1,
  lastPage: 1,
  error: '',
  isFetching: true,
}

// action creators
const createGetOrdersAction = () => ({ type: GET_ORDERS })
const createGetOrdersErrorAction = (error) => ({ type: GET_ORDERS_ERROR, error })
const createGotOrdersAction = (ordersInfo) => ({ type: GOT_ORDERS, ordersInfo })

// thunk creators
export const createGetOrdersThunk = (crewId) => {
  return async (dispatch) => {
    try {
      dispatch(createGetOrdersAction())
      const { data: response } = await axios.get(`${process.env.SERVER_URL}/api/crews/${crewId}/orders`)
      const newState = {
        orders: response.orders,
        count: response.count,
        currentPage: response.currentPage,
        lastPage: response.lastPage,
      }
      dispatch(createGotOrdersAction(newState))
    } catch (error) {
      dispatch(createGetOrdersErrorAction(error.message))
    }
  }
}

// reducer
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return { ...state, isFetching: true }
    case GET_ORDERS_ERROR:
      return { ...state, isFetching: false, error: action.error }
    case GOT_ORDERS:
      return {
        ...state,
        isFetching: false,
        error: '',
        orders: action.ordersInfo.orders,
        count: action.ordersInfo.count,
        currentPage: action.ordersInfo.currentPage,
        lastPage: action.ordersInfo.lastPage
      }
    default:
      return state
  }
}
