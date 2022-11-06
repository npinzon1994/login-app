import React, { useState, useEffect } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  
  
  
  /*
  Here, inside of useEffect, we want to update the form validation
  only when either the enteredEmail or enteredPassword have changed.
  */

  useEffect(() => {
    //setting a timer to collect keystrokes only after 500ms
    const identifier = setTimeout(() => {
      console.log('Checking form validity!')
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 6
      );
    }, 500);

    //cleanup function - runs as a cleanup process before useEffect executes this function the next time
    /*Cleanup function DOES NOT execute before the first useEffect cycle*/
    //cleanup function ALSO RUNS after this component we're in right now is removed from the DOM (reused)
    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
    
  }, [enteredEmail, enteredPassword]);

  /*
  The emailChangeHandler function listens to every keystroke in 
  the email input field, and then sets the form as valid ONLY if 
  the entered email address contains a '@' and the entered password 
  is 7 characters or more.

  **IMPORTANT - The form validation is different than the evaluation
  of the individual inputs. Not only do we need to check if each
  input is valid on its own, but we also need a state that determines
  whether or not the entire form itself is valid, before the user
  can actually log in.**
  */
  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
