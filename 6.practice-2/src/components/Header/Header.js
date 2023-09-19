import React from 'react';

import classes from './Header.module.css';

import HeaderCartButton from '../UI/HeaderCartButton/HeaderCartButton';
import MealsSummary from '../MealsSummary/MealsSummary';

const Header = () => {
  return (
    <>
      <div className={classes.header}>
        <span className={classes.logo}>ReactMeals</span>
        <HeaderCartButton />
      </div>
      <div className={classes['main-image']}>
        <img src={require("../../assets/meals.jpg")} alt="" />
      </div>
      <MealsSummary />
    </>
  );
}

export default Header;