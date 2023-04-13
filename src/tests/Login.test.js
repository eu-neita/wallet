import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

it('deve clogar na página quando escritos email e senha', async () => {
  const { history } = renderWithRouterAndRedux(<App />);
  const myEmail = 'trybe@trybe.com';
  const myPass = '1234567';
  const email = screen.getByTestId('email-input');
  const pass = screen.getByTestId('password-input');
  expect(email).toBeInTheDocument();
  expect(pass).toBeInTheDocument();

  userEvent.type(email, myEmail);
  userEvent.type(pass, myPass);
  expect(email.value).toBe(myEmail);
  expect(pass.value).toBe(myPass);
  const button = screen.getByText('Entrar');
  userEvent.click(button);

  await waitFor(() => expect(history.location.pathname).toBe('/carteira'));
});
