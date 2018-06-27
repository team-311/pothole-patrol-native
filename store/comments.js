import axios from 'axios';

// action types
const ALL_COMMENTS = 'ALL_COMMENTS';

// initial state
// const initialState = {
//   comment: '',
//   allComments: [],
// };

// action creators
const getAllComments = allComments => ({ type: ALL_COMMENTS, allComments });

// thunk creators
export const createGetCommentsThunk = id => {
  return async dispatch => {
    // try {
    console.log('in the creategetcomments thunk', id)
    const { data } = await axios.get(`${process.env.SERVER_URL}/api/comments/${id}`);
    console.log('comments in thunk: ', data)
    dispatch(getAllComments(data));
    // } catch (error) {
    //   console.log(error);
    // }
  };
};

//reducer
export default function (state = [], action) {
  switch (action.type) {
    case ALL_COMMENTS:
      return action.allComments
    default:
      return state;
  }
}
