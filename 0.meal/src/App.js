import React from 'react';

import { CartContextProvider } from './store/cart-context';

import Header from './components/Header/Header';
import AvailableMeals from './components/AvailableMeals/AvailableMeals';
import Cart from './components/UI/Cart/Cart';

function App() {

  return (
    <>
      <CartContextProvider>
        <Cart />
        <Header />
        <AvailableMeals />
      </CartContextProvider>
    </>
  );
}

export default App;
