// The basics:
import React, { useState, useContext } from 'react';

// UI Resources
import Card from '../shared/components/UIElements/Card.js';
import Input from '../shared/components/FormElements/Input';
import Button from '../shared/components/FormElements/Button';

// Business logic resources
import { useForm } from '../shared/hooks/form-hook.js';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from '../shared/util/validators';
import { AuthContext } from '../shared/context/auth-context';

// Styles
import './Login.css';

// Begin React functional component
function Login() {

  const auth = useContext(AuthContext);

  // Handle state changes governing whether Login/Signup view is shown;
  // It defaults to logging in, as this will be the more common behaviour
  // of regular/frequent end-users;
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Initialize form state;
  const [formState, inputHandler, setFormData] = useForm({
    username: {
      value: '',
      isValid: false
    },
    password: {
      value: '',
      isValid: false
    },
  },
    // Validity of entire form = (validity of username && validity of password
    // && validity of email if in sign up mode);
    false
  );

  // Handles switching this page to the SignUp view
  // (for users who do not yet have an account and wish to
  // make one);
  const switchModeHandler = () => {
    // If we are switching to login mode:
    if (!isLoginMode) {
      // ... reset email to 'undefined' (we don't need to pass this along
      // because we only need username and password to log in);
      setFormData(
        {
          ...formState.inputs,
          email: undefined
        },
        formState.inputs.username.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          email: {
            value: '',
            isValid: false
          }
        },
        false
      );
    }
    // Invert the current state when corresponding Button clicked;
    // Best practice: use prevMode to invert state rather than !stateName
    setIsLoginMode(prevMode => !prevMode);
  };

  // Handle submission of login credentials;
  const loginSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);  // Send to backend this data
    auth.login();
    // const data = new FormData(form.current)
    // console.log(data);
    // fetch('/api', { method: 'POST', body: data })
    //   .then(res => res.json())
    //   .then(json => setUser(json.user))
  };

  const logoutSubmitHandler = event => {
    event.preventDefault();
    console.log("Logging out now: ");
    auth.logout();
  };

  // Render the component and its constituent components;
  // When creating account, user should also enter their email;
  // TODO: Confirmation email will be sent to them as another layer of security
  return (
    <Card className="login-info_">
      <form onSubmit={loginSubmitHandler}>
        {!isLoginMode && (
          <Input
            id="email"
            element="input"
            type="email"
            label="E-mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
        )}
        <Input
          id="username"
          element="input"
          type="text"
          placeholder="Enter username"
          label="Enter your username here"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid username."
          onInput={inputHandler}
        />
        <Input
          id="password"
          placeholder="Enter password"
          element="input"
          type="password"
          label="Enter your password here"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Please enter a valid password."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'LOG IN' : 'SIGN UP'}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        Go to {isLoginMode ? 'SIGN UP' : 'LOG IN'}
      </Button>
    </Card>
  );
}

export default Login;
// End React functional component
