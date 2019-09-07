import React from 'react';
import './shop-header.css';
import { Link } from 'react-router-dom';

const ShopHeader = ({ numItems, total }) => {
  return (
    <header className="shop-header row">
      <Link to="/">
        <div className="logo text-dark">Books Shop</div>
      </Link>
      <Link to="/cart">
        <div className="shopping-cart">
          <i className="cart-icon fa fa-shopping-cart" />
          {numItems} Books (${total})
        </div>
      </Link>
    </header>
  );
};

export default ShopHeader;
