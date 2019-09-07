import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ShopHeader from '../shop-header';
import { HomePage, CartPage } from '../pages';
import Modal from '../book-modal';

import './app.css';

const App = () => {
  return (
    <main role="main" className="container">
      <ShopHeader numItems={5} total={210}/>
      <Switch>
        <Route
          path="/"
          component={HomePage}
          exact />

        <Route
          path="/cart"
          component={CartPage}
          />
      </Switch>
      <Modal/>
    </main>
  );
};

export default App;
