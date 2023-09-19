import React from "react";

import classes from './Button.module.css';

const Button = (props) => {
const { type, onClick, children } = props;

  return (
    <button
      className={classes.button}
      onClick={onClick}
      type={type || 'button'}
    >
      {children}
    </button>
  );
};

export default Button;