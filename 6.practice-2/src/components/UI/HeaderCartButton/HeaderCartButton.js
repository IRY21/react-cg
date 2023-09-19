import React, { useContext } from 'react';

import CartContext from '../../../store/cart-context';

import classes from './HeaderCartButton.module.css';
import CartIcon from '../../UI/CartIcon/CartIcon';

const HeaderCartButton = () => {
  const cartCtx = useContext(CartContext);
  return (
    <>
      <button
        className={classes.button}
        type='button'
        onClick={cartCtx.openCart}
      >
        <CartIcon
          className={classes.icon}
        />
        <span>Your Cart</span>
        <span
          className={classes.badge}
        >
          {cartCtx.currentCart.length}
        </span>
      </button>
    </>
  );
}

export default HeaderCartButton;