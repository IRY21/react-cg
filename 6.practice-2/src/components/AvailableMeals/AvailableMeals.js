import React from 'react';

import classes from './AvailableMeals.module.css';

import Card from '../UI/Card/Card';
import MealItem from '../MealItem/MealItem';
import DUMMY_MEALS from '../../data/dummy-meals';

const AvailableMeals = () => {
  return (
    <>
      <Card className={classes.meals}>
        <ul>
          {DUMMY_MEALS.map((meal) => (
            <MealItem
              key={meal.id}
              meal={meal}
            />
          ))}
        </ul>
      </Card>
    </>
  );
}

export default AvailableMeals;