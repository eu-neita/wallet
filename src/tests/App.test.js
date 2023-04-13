import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

it('deve renderizar o componente App no login, e conter as labels de email e senha', () => {
  renderWithRouterAndRedux(<App />);

  const email = screen.getByText(/E-mail/i);
  const pass = screen.getByText(/Senha/i);
  expect(email).toBeInTheDocument();
  expect(pass).toBeInTheDocument();
});

it('deve conter inputs de email e senha e testa se login é rederizado em /', () => {
  const { history } = renderWithRouterAndRedux(<App />);

  const email = screen.getByTestId('email-input');
  const pass = screen.getByTestId('password-input');
  expect(email).toBeInTheDocument();
  expect(pass).toBeInTheDocument();
  expect(history.location.pathname).toBe('/');
});
