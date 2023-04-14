// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_STARTED, REQUEST_SUCCESSFUL,
  EXPENSES, REDUCEEX, EDITEX_START, EDITEX_END } from '../types';

const initialState = {
  isFetching: true,
  currencies: [],
  expenses: [],
  isEditing: false,
  editId: 0,
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

  case EDITEX_START:
    return {
      ...state,
      isEditing: true,
      editId: action.payload,
    };

  case EDITEX_END:
    return {
      ...state,
      isEditing: false,
      editId: 0,
      expenses: action.payload,
    };

  default:
    return state;
  }
}

export default wallet;
