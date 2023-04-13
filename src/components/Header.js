import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    return (
      <div>
        <p data-testid="email-field">{`email: ${email}`}</p>
        <p data-testid="total-field">
          {total.length === 0 ? '0.00' : total
            .reduce((acc, item) => acc + (Number(item
              .value) * Number(item.exchangeRates[item.currency].ask)), 0)
            .toFixed(2)}
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
  total: PropTypes.arrayOf(PropTypes.shape()),
}.isRequired;

export default connect(mapStateToProps)(Header);
