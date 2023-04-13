import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduceEx } from '../redux/actions/expensesAction';

class Table extends Component {
  render() {
    const { data, dispatch } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={ item.id }>
              <td>{item.description}</td>
              <td>{item.tag}</td>
              <td>{item.method}</td>
              <td>{Number(item.value).toFixed(2)}</td>
              <td>
                {item.exchangeRates[item.currency].code === item.currency
                  && item.exchangeRates[item.currency].name}
              </td>
              <td>
                {Number(item.exchangeRates[item.currency].code === item.currency
                  && item.exchangeRates[item.currency].ask).toFixed(2)}
              </td>
              <td>
                {(Number(item.exchangeRates[item.currency].code === item.currency
                  && item.exchangeRates[item.currency].ask) * Number(item.value))
                  .toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <button>Editar</button>
                <button
                  data-testid="delete-btn"
                  onClick={ () => dispatch(reduceEx(item.id)) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.wallet.expenses,
});

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()),
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Table);
