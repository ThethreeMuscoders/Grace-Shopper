import axios from 'axios';

// Actions
const SELECT_USER = 'SELECT_USER';

// Action Creators
export const selectUser = (user) => {
  return {
    type: SELECT_USER,
    user,
  };
};

// Reducer
const reducerMethods = {
  SELECT_USER(state, action) {
    return action.user;
  },
};

export default function (state = {}, action) {
  if (reducerMethods[action.type]) return reducerMethods[action.type](state, action);
  return state;
}

// Thunks
export const fetchOneUser = (id) => (dispatch) => {
  return axios.get(`/api/users/${id}`)
    .then(res => {
      dispatch(selectUser(res.data));
      return res.data;
    })
    .catch(err => console.log(err));
};
