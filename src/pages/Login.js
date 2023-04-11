import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../redux/actions/userAction';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isButtonDisabled: true,
  };

  validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  handleChangeInputs = ({ target }) => {
    const MIN_NUM = 4;
    const { value, name } = target;
    const { email, password } = this.state;
    this.setState({
      [name]: value,
    });
    this.setState({
      isButtonDisabled: !(this.validateEmail(email) && password.length > MIN_NUM),
    });
  };

  handleSubmit = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(login({ email }));
    history.push('/carteira');
  };

  render() {
    const { email, password, isButtonDisabled } = this.state;
    return (
      <form>
        <label htmlFor="email-input">E-mail:</label>
        <input
          type="email"
          id="email-input"
          data-testid="email-input"
          value={ email }
          name="email"
          onChange={ this.handleChangeInputs }
        />
        <label htmlFor="password-input">Senha:</label>
        <input
          type="password"
          id="password-input"
          data-testid="password-input"
          value={ password }
          name="password"
          onChange={ this.handleChangeInputs }
        />
        <button type="button" onClick={ this.handleSubmit } disabled={ isButtonDisabled }>
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
