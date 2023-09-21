import React, { useState, useCallback, useEffect } from 'react';

import classes from './AvailableMeals.module.css';

import Card from '../UI/Card/Card';
import MealItem from '../MealItem/MealItem';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMeals = useCallback(() => {
    setIsLoading(true);
    setError(null);

    const res = fetch('https://react-http-6aa00-default-rtdb.europe-west1.firebasedatabase.app/meals.json');
    
    res
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to get list of meals');
        } else {
          return res;
        }
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        const loadedMeals = [];

        for (const key in data) {
          loadedMeals.push({
            id: data[key].id,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price
          });
        }
        setMeals(loadedMeals);
        setIsLoading(false);
      })
      .catch(error => setError(error.message))
  }, []);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  let content = <p>Found no meals.</p>

  if (meals.length > 0) {
    content = 
    <ul>
      {meals.map((meal) => (
        <MealItem
          key={meal.id}
          meal={meal}
        />
      ))}
    </ul>;
  }

  if (error) {
    content = <p>{error}</p>
  }
  
  if (isLoading) {
    content = <p>Loading...</p>
  }
  
  return (
    <>
      <Card className={classes.meals}>
        {content}
      </Card>
    </>
  );
}

export default AvailableMeals;