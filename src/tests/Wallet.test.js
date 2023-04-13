import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

it('verifica se em /carteira existe todos os inputs', async () => {
  const { history } = renderWithRouterAndRedux(<App />);
  const myEmail = 'trybe@trybe.com';
  const myPass = '1234567';
  const email = screen.getByTestId('email-input');
  const pass = screen.getByTestId('password-input');

  userEvent.type(email, myEmail);
  userEvent.type(pass, myPass);
  const button = screen.getByText('Entrar');
  userEvent.click(button);

  await waitFor(() => expect(history.location.pathname).toBe('/carteira'));

  const valueInput = await screen.findByTestId('value-input');
  const descriptioInput = await screen.findByTestId('description-input');
  const methodInput = await screen.findByTestId('method-input');
  const tagInput = await screen.findByTestId('tag-input');
  const buttonAdd = await screen.findByText('Adicionar despesa');

  expect(valueInput).toBeInTheDocument();
  expect(descriptioInput).toBeInTheDocument();
  expect(methodInput).toBeInTheDocument();
  expect(tagInput).toBeInTheDocument();
  expect(buttonAdd).toBeInTheDocument();

  const headerEmail = await screen.findByTestId('email-field');
  const headerCurrency = await screen.findByTestId('header-currency-field');

  const totalField = await screen.findByTestId('total-field');
  expect(totalField).toHaveTextContent('0');

  expect(headerEmail).toHaveTextContent('email: trybe@trybe.com');
  expect(headerCurrency).toHaveTextContent('BRL');
  userEvent.type(valueInput, 2);
  userEvent.click(buttonAdd);

  const plist = await screen.findByText('Excluir');
  expect(plist).toBeInTheDocument();
  // const plist = await screen.findByText(/Descrição/i);
//   await waitFor(async () => {
//     const totalField2 = await screen.findByTestId('total-field');
//     expect(totalField2).not.toHaveTextContent('0');
//   });
});
