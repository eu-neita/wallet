import { EXPENSES, REDUCEEX } from '../types';

export const expenses = (payload) => ({
  type: EXPENSES,
  payload,
});

export const feExchangeRates = (state) => async (dispatch) => {
  const api = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await api.json();
  dispatch(expenses({ ...state, exchangeRates: data }));
};

export const reduceEx = (payload) => ({
  type: REDUCEEX,
  payload,
});
