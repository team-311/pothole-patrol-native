import axios from 'axios';

// action types
const ALL_COMMENTS = 'ALL_COMMENTS';
const NEW_COMMENT = 'NEW_COMMENT';

// action creators
const getAllComments = allComments => ({ type: ALL_COMMENTS, allComments });
const createNewComment = comment => ({ type: NEW_COMMENT, comment });

// thunk creators
export const createGetCommentsThunk = id => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`${process.env.SERVER_URL}/api/comments/${id}`);
      dispatch(getAllComments(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createNewCommentThunk = comment => {
  return async dispatch => {
    try {
      const newComment = await axios.post(`${process.env.SERVER_URL}/api/comments/`, comment);
      dispatch(createNewComment(newComment.data));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = {
  allComments: [],
  comment: {}
}
//reducer
export default function (state = initialState, action) {
  switch (action.type) {
    case ALL_COMMENTS:
      return {...state, allComments: action.allComments}
    case NEW_COMMENT:
      return {
        ...state,
        comment: action.comment.text,
        allComments: [...state.allComments, action.comment],
      };
    default:
      return state;
  }
}
