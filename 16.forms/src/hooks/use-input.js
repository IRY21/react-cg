import { useReducer } from "react";

const initInputState = {
  value: '',
  isTouched: false
}

const inputStateReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return {
      value: action.value,
      isTouched: state.isTouched
    };
  }

  if (action.type === 'BLUR') {
    return {
      value: state.value,
      isTouched: true
    }
  }

  if (action.type === 'RESET') {
    return initInputState;
  }

  return initInputState
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, initInputState);

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = e => {
    dispatch({ type: 'INPUT', value: e.target.value });
  }

  const inputBlurHandler = () => {
    dispatch({ type: 'BLUR' });
  }

  const reset = () => {
    dispatch({ type: 'RESET' });
  }

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset
  }
};

export default useInput;