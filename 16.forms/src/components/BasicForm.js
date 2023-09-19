import useInputMy from "../hooks/use-input-my";

const BasicForm = (props) => {
  const {
    value: firstNameInputValue,
    isValid: firstNameInputIsValid,
    hasError: firstNameInputIsInvalid,
    valueChangeHandler: firstNameInputChangeHandler,
    valueBlurHandler: firstNameInputBlurHandler,
    reset: firstNameInputReset
  } = useInputMy((value) => value.trim() !== '');

  const {
    value: lastNameInputValue,
    isValid: lastNameInputIsValid,
    hasError: lastNameInputIsInvalid,
    valueChangeHandler: lastNameInputChangeHandler,
    valueBlurHandler: lastNameInputBlurHandler,
    reset: lastNameInputReset
  } = useInputMy((value) => value.trim() !== '');

  const {
    value: emailInputValue,
    isValid: emailInputIsValid,
    hasError: emailInputIsInvalid,
    valueChangeHandler: emailInputChangeHandler,
    valueBlurHandler: emailInputBlurHandler,
    reset: emailInputReset
  } = useInputMy((value) => value.includes('@'));

  let formIsValid = false;

  if (firstNameInputIsValid && lastNameInputIsValid && emailInputIsValid) {
    formIsValid = true;
  }

  const onFormSubmit = (e) => {
    e.preventDefault();

    if (!formIsValid) return;

    console.log(`First Name: ${firstNameInputValue}\n
    Last Name: ${lastNameInputValue}\n
    Email: ${emailInputValue}`);

    firstNameInputReset();
    lastNameInputReset();
    emailInputReset();
  }

  const firstNameInputClassName = firstNameInputIsInvalid
    ? 'form-control invalid'
    : 'form-control';

  const lastNameInputClassName = firstNameInputIsInvalid
    ? 'form-control invalid'
    : 'form-control';

  const emailInputClassName = firstNameInputIsInvalid
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form
      onSubmit={onFormSubmit}
    >
      <div className='control-group'>
        <div
          className={firstNameInputClassName}
        >
          <label htmlFor='first-name'>First Name</label>
          <input
            type='text'
            id='first-name'
            value={firstNameInputValue}
            onChange={firstNameInputChangeHandler}
            onBlur={firstNameInputBlurHandler}
          />
          {firstNameInputIsInvalid && (<p className="error-text">Please enter your First Name</p>)}
        </div>
        <div
          className={lastNameInputClassName}
        >
          <label htmlFor='last-name'>Last Name</label>
          <input
            type='text'
            id='last-name'
            value={lastNameInputValue}
            onChange={lastNameInputChangeHandler}
            onBlur={lastNameInputBlurHandler}
          />
          {lastNameInputIsInvalid && (<p className="error-text">Please enter your Last Name</p>)}
        </div>
        <div 
          className={emailInputClassName}
        >
          <label htmlFor='email'>E-Mail Address</label>
          <input
            type='email'
            id='email'
            value={emailInputValue}
            onChange={emailInputChangeHandler}
            onBlur={emailInputBlurHandler}
          />
          {emailInputIsInvalid && (<p className="error-text">Please enter your E-Mail</p>)}
        </div>
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid} >Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
