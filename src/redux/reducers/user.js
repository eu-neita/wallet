// Esse reducer será responsável por tratar as informações da pessoa usuária

import { LOGIN } from '../types';

const INITIAL_STATE = {
  email: '',
};
function user(state = INITIAL_STATE, action) {
  const { payload, type } = action;
  switch (type) {
  case LOGIN:
    return {
      ...state,
      email: payload.email,
    };
  default:
    return state;
  }
}
export default user;
