import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchCurrencies } from '../redux/actions/fetchCurrencies';
import { feExchangeRates, reduceEdEnd } from '../redux/actions/expensesAction';

const TAG_INITIAL = 'Alimentação';

class WalletForm extends Component {
  state = {
    id: 0,
    value: 0,
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: TAG_INITIAL,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  componentDidUpdate(prevState) {
    const { data, editId, isEditing } = this.props;
    if (prevState.isEditing !== isEditing && isEditing) {
      this.setState({
        value: data[editId].value,
        description: data[editId].description,
        currency: data[editId].currency,
        method: data[editId].method,
        tag: data[editId].tag,
      });
    }
  }

  editValues = () => {
    const { data, editId, dispatch } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const expenseEdit = [
      ...data,
    ];
    expenseEdit[editId] = {
      ...data[editId],
      value,
      description,
      currency,
      method,
      tag,
    };
    dispatch(reduceEdEnd(expenseEdit));
    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: TAG_INITIAL,
    });
  };

  handleForm = (target) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleButton = async () => {
    const { dispatch } = this.props;
    const { id } = this.state;
    this.setState({
      id: id + 1,
    });
    dispatch(feExchangeRates(this.state));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { currencies, isFetching, isEditing } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        {isFetching === true ? <div>Carregando...</div> : (
          <div>
            <label htmlFor="value-input">Valor da despesa: </label>
            <input
              name="value"
              onChange={ ({ target }) => this.handleForm(target) }
              value={ value }
              data-testid="value-input"
              id="value-input"
              placeholder="digite um valor"
            />
            <label htmlFor="description-input">Descrição: </label>
            <input
              name="description"
              onChange={ ({ target }) => this.handleForm(target) }
              value={ description }
              data-testid="description-input"
              id="description-input"
              placeholder="digite uma descrição"
            />
            <div>
              <label htmlFor="currency-input">Moeda: </label>
              <select
                name="currency"
                onChange={ ({ target }) => this.handleForm(target) }
                value={ currency }
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
              name="method"
              onChange={ ({ target }) => this.handleForm(target) }
              value={ method }
              data-testid="method-input"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
            <label htmlFor="tag-input">Categoria:</label>
            <select
              id="tag-input"
              name="tag"
              onChange={ ({ target }) => this.handleForm(target) }
              value={ tag }
              data-testid="tag-input"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transpote">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
            {isEditing
              ? (
                <button
                  type="button"
                  onClick={ () => this.editValues() }
                >
                  Editar despesa
                </button>
              )
              : (
                <button
                  type="button"
                  onClick={ () => this.handleButton() }
                >
                  Adicionar despesa
                </button>
              ) }
          </div>
        )}
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(),
  data: PropTypes.arrayOf(PropTypes.shape()),
  isFetching: PropTypes.bool,
  dispatch: PropTypes.func,
  isEditing: PropTypes.bool,
  editId: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  data: state.wallet.expenses,
  isFetching: state.wallet.isFetching,
  isEditing: state.wallet.isEditing,
  editId: state.wallet.editId,
});

export default connect(mapStateToProps)(WalletForm);
