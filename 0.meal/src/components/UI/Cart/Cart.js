import React, { useContext } from "react";

import classes from './Cart.module.css';

import CartContext from '../../../store/cart-context';

import CartItem from '../CartItem/CartItem';
import Modal from '../Modal/Modal';
import MealCheckoutForm from "../../MealCheckoutForm/MealCheckoutForm";

const Cart = () => {
  const cartCtx = useContext(CartContext);

  const addMealHandler = (meal) => {
    const newMealAmount = meal.amount + 1;
    cartCtx.addToCart({...meal, amount: newMealAmount});
  }

  const removeMealHandler = (meal) => {
    cartCtx.removeFromCart({...meal});
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
      <MealCheckoutForm />
    </Modal>
  );
}

export default Cart;