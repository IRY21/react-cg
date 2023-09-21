import { useContext, useRef, useState } from 'react';

import classes from './MealCheckoutForm.module.css';

import CartContext from '../../store/cart-context';

import Input from '../UI/Input/Input';

const MealCheckoutForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isValidName, setIsValidName] = useState(false);
  const [nameInputIsTouched, setNameInputIsTouched] = useState(false);

  const [isValidAddress, setIsValidAddress] = useState(false);
  const [addressInputIsTouched, setAddressInputIsTouched] = useState(false);

  const cartCtx = useContext(CartContext);

  const customerName = useRef();
  const customerAddress = useRef();

  const nameInputChangeHandler = () => {
    if (customerName.current.value.trim() !== '') {
      setIsValidName(true);
    } else {
      setIsValidName(false);
    }
  }

  const nameInputBlurHandler = () => {
    setNameInputIsTouched(true);
  }

  const addressInputChangeHandler = () => {
    if (customerAddress.current.value.trim() !== '') {
      setIsValidAddress(true);
    } else {
      setIsValidAddress(false);
    }
  }

  const addressInputBlurHandler = () => {
    setAddressInputIsTouched(true);
  }

  let formIsValid = false;

  if (isValidName && isValidAddress) {
    formIsValid = true;
  }

  function sendCartData(order) {
    setIsLoading(true);
    setError(null);

    const res = fetch('https://react-http-6aa00-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    res
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to make order');
        } else {
          return res;
        }
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        setIsLoading(false);
      })
      .catch(error => setError(error.message))
  };

  const orderHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) return;

    sendCartData({
      name: customerName.current.value,
      address: customerAddress.current.value,
      cart: cartCtx.currentCart,
      totalAmount: cartCtx.totalAmount.toFixed(2)
    });
  
    console.log(customerName.current.value);
    console.log(customerAddress.current.value);
    console.log(JSON.stringify(cartCtx.currentCart));
    console.log(cartCtx.totalAmount, 'Total Amount');
  }

  return (
    <form
      onSubmit={orderHandler}
    >
      <div className={classes['inputs-wrap']}>
        <div className={classes['input-wrap']}>
          <Input
            ref={customerName}
            label="Name"
            input={{
              id: 'customer-name',
              type: 'text',
              view: 'wide',
              onChange: nameInputChangeHandler,
              onBlur: nameInputBlurHandler
            }}
          />
          {(!isValidName && nameInputIsTouched) && <p className={classes['error-text']}>Please enter your Name.</p>}
        </div>
        <div className={classes['input-wrap']}>
          <Input
            ref={customerAddress}
            label="Address"
            input={{
              id: 'customer-address',
              type: 'text',
              view: 'wide',
              onChange: addressInputChangeHandler,
              onBlur: addressInputBlurHandler
            }}
          />
          {(!isValidAddress && addressInputIsTouched) && <p className={classes['error-text']}>Please enter your Address.</p>}
        </div>
      </div>
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
          disabled={!formIsValid}
        >
          Order
        </button>
      </div>
    </form>
  );
};

export default MealCheckoutForm;