import axios from 'axios'

// action types
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

// initial state
const defaultUser = {}

// action creators
const createGetUserAction = (user) => ({type: GET_USER, user})
const createRemoveUserAction = () => ({type: REMOVE_USER})

// thunk creators
export const me = () =>
  dispatch =>
    axios.get(`${process.env.SERVER_URL}/auth/me`)
      .then(res =>
        dispatch(createGetUserAction(res.data || defaultUser)))
      .catch(err => console.log(err))

export const auth = (email, password, method) =>
  dispatch =>
    axios.post(`${process.env.SERVER_URL}/auth/${method}`, { email, password })
      .then(res => {
        dispatch(createGetUserAction(res.data))
        return res.data
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(createGetUserAction({error: authError}))
        return { error: authError.message }
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const logout = () =>
  dispatch =>
    axios.post(`${process.env.SERVER_URL}/auth/logout`)
      .then(_ => {
        dispatch(createRemoveUserAction())
      })
      .catch(err => console.log(err))

// reducer
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
