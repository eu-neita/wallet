import React, { Component } from 'react';

class WalletForm extends Component {
  render() {
    return (
      <div>
        <label htmlFor="value-input">Valor da despesa:</label>
        <input data-testid="value-input" id="value-input" placeholder="digite um valor" />
        <label htmlFor="description-input">Descrição:</label>
        <input
          data-testid="description-input"
          id="description-input"
          placeholder="digite uma descrição"
        />
        <label htmlFor="method-input">Método de pagamento:</label>
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
    );
  }
}

export default WalletForm;
