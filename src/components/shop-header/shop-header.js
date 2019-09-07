import React from 'react';
import './shop-header.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const ShopHeader = ({ numItems, total }) => {
  return (
    <header className="shop-header row">
      <Link to="/">
        <div className="logo text-dark">Books Shop</div>
      </Link>
      <Link to="/cart">
        <div className="shopping-cart">
          <i className="cart-icon fa fa-shopping-cart" />
          {numItems} Books (${total.toFixed(2)})
        </div>
      </Link>
    </header>
  );
};

const mapStateToProps = ({ orderTotal, orderCount }) => {
  return {
    total: orderTotal,
    numItems: orderCount
  }
};

export default connect(mapStateToProps)(ShopHeader);
