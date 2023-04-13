// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_STARTED, REQUEST_SUCCESSFUL, REQUEST_FAILED,
  EXPENSES, REDUCEEX } from '../types';

const initialState = {
  isFetching: true,
  currencies: [],
  expenses: [],
};

function wallet(state = initialState, action) {
  switch (action.type) {
  case REQUEST_STARTED:
    return {
      ...state,
      isFetching: true,
      // errorMessage: '',
      currencies: '',
    };

  case REQUEST_SUCCESSFUL:
    return {
      ...state,
      isFetching: false,
      currencies: action.payload,
      // errorMessage: '',
    };

  case REQUEST_FAILED:
    return {
      ...state,
      isFetching: false,
      errorMessage: action.payload,
      currencies: '',
    };

  case EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };

  case REDUCEEX:
    return {
      ...state,
      expenses: [...state.expenses.filter((ex) => action.payload !== ex.id)],
    };

  default:
    return state;
  }
}

export default wallet;
