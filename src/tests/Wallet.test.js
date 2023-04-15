import { screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const inputValue = 'value-input';
const buttonDespesa = 'Adicionar despesa';

const initial = () => {
  const myEmail = 'trybe@trybe.com';
  const myPass = '1234567';
  const email = screen.getByTestId('email-input');
  const pass = screen.getByTestId('password-input');

  userEvent.type(email, myEmail);
  userEvent.type(pass, myPass);
  const button = screen.getByText('Entrar');
  userEvent.click(button);
};

it('verifica se em /carteira existe todos os inputs', async () => {
  const { history } = renderWithRouterAndRedux(<App />);

  initial();

  await waitFor(() => expect(history.location.pathname).toBe('/carteira'));

  const valueInput = await screen.findByTestId(inputValue);
  const descriptioInput = await screen.findByTestId('description-input');
  const methodInput = await screen.findByTestId('method-input');
  const tagInput = await screen.findByTestId('tag-input');
  const buttonAdd = await screen.findByText(buttonDespesa);

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
});

it('testa se existe os buttons de editar e excluir e se ele remove', async () => {
  const { history } = renderWithRouterAndRedux(<App />);

  initial();

  await waitFor(() => expect(history.location.pathname).toBe('/carteira'));

  const valueInput = await screen.findByTestId(inputValue);
  const buttonAdd = await screen.findByText(buttonDespesa);

  userEvent.type(valueInput, 2);
  userEvent.click(buttonAdd);
  const buttonEdit = await screen.findByTestId('edit-btn');
  const buttonRemove = await screen.findByTestId('delete-btn');

  expect(buttonEdit).toBeInTheDocument();
  expect(buttonRemove).toBeInTheDocument();

  userEvent.click(buttonRemove);

  expect(buttonEdit).not.toBeInTheDocument();
  expect(buttonRemove).not.toBeInTheDocument();
});

it('testa se ao editar funciona', async () => {
  const { history } = renderWithRouterAndRedux(<App />);

  initial();

  await waitFor(() => expect(history.location.pathname).toBe('/carteira'));

  const valueInput = await screen.findByTestId(inputValue);
  const buttonAdd = await screen.findByText(buttonDespesa);

  fireEvent.change(valueInput, { target: { value: '2' } });
  userEvent.click(buttonAdd);
  const buttonEdit = await screen.findByTestId('edit-btn');

  fireEvent.click(buttonEdit);
  await waitFor(() => {
    const buttonAddEdit = screen.getByText('Editar despesa');
    fireEvent.change(valueInput, { target: { value: '4' } });
    fireEvent.click(buttonAddEdit);
  });
  const valueNew = screen.getByTestId('input-value');
  await waitFor(() => expect(valueNew).toHaveTextContent('4.00'));
});
