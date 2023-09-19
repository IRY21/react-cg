import React, { useContext } from 'react';

import classes from './MealItem.module.css';
import CartContext from '../../store/cart-context';

import MealItemForm from '../MealItemForm/MealItemForm';

const MealItem = ({
  meal
}) => {
  return (
    <>
      <li className={classes.meal}>
        <div>
          <h3>{meal.name}</h3>
          <p className={classes.description}>
            {meal.description}
          </p>
          <p className={classes.price}>
            ${meal.price}
          </p>
        </div>
        <div>
          <MealItemForm
            meal={meal}
          />
        </div>
      </li>
    </>
  );
}

export default MealItem;