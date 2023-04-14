import { REQUEST_STARTED, REQUEST_SUCCESSFUL } from '../types';

function requestStarted() {
  return { type: REQUEST_STARTED };
}

function requestSuccessful(currencies) {
  return {
    type: REQUEST_SUCCESSFUL,
    payload: currencies,
  };
}

export function fetchCurrencies() {
  return (dispatch) => {
    dispatch(requestStarted());
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => dispatch(requestSuccessful(Object.keys(data).filter((cur) => cur
      !== 'USDT'))));
  };
}
