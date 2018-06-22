const report = {
  image: '',
};

// Action Type
const GET_PICTURE = 'GET_PICTURE';

//Action Creator
export const getPicture = picture => {
  return {
    type: GET_PICTURE,
    picture,
  };
};

export default function(state = report, action) {
  switch (action.type) {
    case GET_PICTURE:
      return { ...state, image: action.picture };
    default:
      return state;
  }
}
