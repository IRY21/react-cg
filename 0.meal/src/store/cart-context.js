import React, { useState, useReducer, useContext } from 'react';

const CartContext = React.createContext({
  currentCart: [],
  totalAmount: 0,
  addToCart: (meal) => {},
  removeFromCart: (meal) => {},
  openCart: () => {},
  closeCart: () => {},
  isCartOpen: false,
});

const cartReducer = (state, action) => {
  const existingMealIndex = state.currentCart.findIndex((item) => item.id === action.meal.id);
  const existingMeal = state.currentCart[existingMealIndex];
  let updatedTotalAmount;
  
  if (action.type === 'ADD') {
    if (existingMeal) {
      updatedTotalAmount
        = state.totalAmount
        - (action.meal.price * existingMeal.amount)
        + (action.meal.price * action.meal.amount);
      
      existingMeal.amount = action.meal.amount;

      return { 
        currentCart: [...state.currentCart],
        totalAmount: updatedTotalAmount
      }
    } else {
      updatedTotalAmount = state.totalAmount + action.meal.price * action.meal.amount;

      return { 
        currentCart: [...state.currentCart, action.meal],
        totalAmount: updatedTotalAmount
      }
    }
  }

  if (action.type === 'REMOVE') {
    updatedTotalAmount
      = state.totalAmount
      - action.meal.price;
    
    existingMeal.amount = action.meal.amount - 1;

    if (existingMeal.amount <= 0) {
      state.currentCart.splice(existingMealIndex, 1);
      return { 
        currentCart: [...state.currentCart],
        totalAmount: updatedTotalAmount
      }
    }
    
    return { 
      currentCart: [...state.currentCart],
      totalAmount: updatedTotalAmount
    }
  }
}

export const CartContextProvider = (props) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartCtx = useContext(CartContext);
  const [cartList, setCartList] = useReducer(cartReducer, cartCtx);
  
  const addItemToCart = (meal) => {
    setCartList({ type: 'ADD', meal: meal });
  };

  const removeItemFromCart = (meal) => {
    setCartList({ type: 'REMOVE', meal: meal });
  };

  const openCart = () => {
    setIsCartOpen(true);
  }

  const closeCart = () => {
    setIsCartOpen(false);
  }

  return <CartContext.Provider
    value={{
      currentCart: cartList.currentCart,
      addToCart: addItemToCart,
      removeFromCart: removeItemFromCart,
      totalAmount: cartList.totalAmount,
      openCart: openCart,
      closeCart: closeCart,
      isCartOpen: isCartOpen,
    }}
  >
    {props.children}
  </CartContext.Provider>
};


export default CartContext;