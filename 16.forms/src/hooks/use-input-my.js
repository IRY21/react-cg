import { useState } from "react";

const useInputMy = (validateValue) => {
  const [inputValue, setInputValue] = useState('');
  const [isToched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(inputValue);

  const hasError = !valueIsValid && isToched;

  const valueChangeHandler = e => {
    setInputValue(e.target.value);
  };

  const valueBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setInputValue('');
    setIsTouched(false);
  };

  return {
    value: inputValue,
    isValid: inputValue,
    hasError,
    valueChangeHandler,
    valueBlurHandler,
    reset
  }
}

export default useInputMy;