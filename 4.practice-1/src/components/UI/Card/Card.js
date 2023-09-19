import React from 'react';

import classes from './Card.module.css'

const Card = (props) => {
  const { className, children } = props;
  
  return (
    <div className={`${className} ${classes.card}`}>
      {children}
    </div>
  );
}

export default Card;