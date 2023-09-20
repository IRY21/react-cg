import React, { useContext } from "react";

import classes from './Cart.module.css';

import CartContext from '../../../store/cart-context';

import CartItem from '../CartItem/CartItem';
import Modal from '../Modal/Modal';

const Cart = () => {
  const cartCtx = useContext(CartContext);

  const addMealHandler = (meal) => {
    const newMealAmount = meal.amount + 1;
    cartCtx.addToCart({...meal, amount: newMealAmount});
  }

  const removeMealHandler = (meal) => {
    cartCtx.removeFromCart({...meal});
  }

  const orderHandler = () => {
    console.log(JSON.stringify(cartCtx.currentCart));
    console.log(cartCtx.totalAmount, 'Total Amount');
  }

  return (
    <Modal
      isOpen={cartCtx.isCartOpen}
      closeModal={cartCtx.closeCart}
    >
      <ul className={classes['cart-items']}>
        {cartCtx.currentCart.map(meal => {
          return (
            <CartItem
              key={meal.id}
              name={meal.name}
              price={meal.price}
              amount={meal.amount}
              onRemove={removeMealHandler.bind(null, meal)}
              onAdd={addMealHandler.bind(null, meal)}
            />
          );
        })}
      </ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{cartCtx.totalAmount.toFixed(2)}</span>
      </div>
      <div className={classes.actions}>
        <button
          className={classes['button--alt']}
          onClick={cartCtx.closeCart}
        >
          Close
        </button>
        <button
          className={classes.button}
          onClick={orderHandler}
        >
          Order
        </button>
      </div>
    </Modal>
  );
}

export default Cart;