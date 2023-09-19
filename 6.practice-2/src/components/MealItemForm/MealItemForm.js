import React, { useState, useContext, useRef } from 'react';

import CartContext from '../../store/cart-context';
import classes from './MealItemForm.module.css';

import Input from '../UI/Input/Input';

const MealItemForm = ({
  meal
}) => {
  const [isValidAmount, setIsValidAmount] = useState(true);
  const cartCtx = useContext(CartContext);

  const amountInputRef = useRef();
  
  const submitHandler = (event) => {
    event.preventDefault();
    const inputValue = +amountInputRef.current.value;
    if (inputValue < 1 || inputValue > 5) {
      setIsValidAmount(false);
      return;
    }

    setIsValidAmount(true);
    cartCtx.addToCart({...meal, amount: inputValue});
  };

  return (
    <>
      <form
        className={classes.form}
        onSubmit={submitHandler}
      >
        <Input
          ref={amountInputRef}
          label="Amount"
          input={{
            id: 'amount_' + meal.id,
            type: 'number',
            min: '0',
            max: '5',
            step: '1',
            defaultValue: '0'
          }}
        />
        <button>
          + Add
        </button>
        {!isValidAmount && <p>Please enter a valid amount (1-5).</p>}
      </form>
    </>
  );
}

export default MealItemForm;