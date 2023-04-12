import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchCurrencies } from '../redux/actions/fetchCurrencies';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    const { currencies, isFetching } = this.props;
    return (
      <div>
        {isFetching === true ? <div>Carregando...</div> : (
          <div>
            <label htmlFor="value-input">Valor da despesa: </label>
            <input
              data-testid="value-input"
              id="value-input"
              placeholder="digite um valor"
            />
            <label htmlFor="description-input">Descrição: </label>
            <input
              data-testid="description-input"
              id="description-input"
              placeholder="digite uma descrição"
            />
            <div>
              <label htmlFor="currency-input">Moeda: </label>
              <select
                id="currency-input"
                data-testid="currency-input"
              >
                {currencies.map((cur, i) => (
                  <option value={ cur } key={ i }>{cur}</option>))}
              </select>
            </div>
            <label htmlFor="method-input">Método de pagamento: </label>
            <select
              id="method-input"
              data-testid="method-input"
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="cartao-credito">Cartão de crédito</option>
              <option value="cartao-debito">Cartão de débito</option>
            </select>
            <label htmlFor="tag-input">Categoria:</label>
            <select id="tag-input" data-testid="tag-input">
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </div>
        )}
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(),
  isFetching: PropTypes.bool,
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
});

export default connect(mapStateToProps)(WalletForm);
