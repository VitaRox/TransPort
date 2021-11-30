// The basics:
import React, { useState, useContext } from 'react';

// UI Resources
import Card from '../shared/components/UIElements/Card.js';
import Input from '../shared/components/FormElements/Input';
import Button from '../shared/components/FormElements/Button';
import ImageUpload from '../shared/components/FormElements/ImageUpload.js';
import ErrorModal from '../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner.js';

// Business logic resources
import { useForm } from '../shared/hooks/form-hook.js';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from '../shared/util/validators';
import { AuthContext } from '../shared/context/auth-context';
import { useHttpClient } from '../shared/hooks/http-hook';

// Styles
import './Login.css';


// Begin React functional component
function Login() {

  const auth = useContext(AuthContext);

  // Handle state changes governing whether Login/Signup view is shown;
  // It defaults to logging in, as this will be the more common behaviour
  // of regular/frequent end-users;
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Provide user feedback about errors that take place
  const { error, isLoading, sendRequest, clearError } = useHttpClient();

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
    // && validity of email if in sign-up mode);
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
          email: undefined,
          image: undefined
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
          },
          image: {
            value: null,
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

  // Handle submission of login credentials or signup credentials
  const authSubmitHandler = async event => {
    event.preventDefault();
    console.log(formState.inputs);

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          'http://localhost:4000/api/users/login',
          'POST',
          JSON.stringify({
            username: formState.inputs.username.value,
            password: formState.inputs.password.value
          }),
        {
          'Content-Type': 'application/json'
        }
      );
      auth.login(responseData.user.id);
      } catch (err) {
        console.log(err.message);
      }

    } else {
      try {
        const formData = new FormData();
        formData.append('username',formState.inputs.username.value);
        formData.append('email', formState.inputs.email.value);
        formData.append('password', formState.inputs.password.value);
        formData.append('image', formState.inputs.image.value);
        const responseData = await sendRequest(
          'http://localhost:4000/api/users/signup',
          'POST',
          formData
        );
        auth.login(responseData.user.id);
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  // Render the component and its constituent components;
  // When creating account, user should also enter their email;
  // TODO: Confirmation email will be sent to them as another layer of security
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="login-info_">
        {isLoading && <LoadingSpinner asOverlay className="center"/>}
        <h1>Login Required</h1>
        <hr />
        <form onSubmit={authSubmitHandler}>
          <Input
            id="username"
            element="input"
            type="text"
            placeholder="Enter username"
            label="Enter your username here:    "
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid username."
            onInput={inputHandler}
          />
          {!isLoginMode && (
            <Input
              id="email"
              element="input"
              type="email"
              label="E-mail"
              placeholder="example@email.com"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please enter a valid email address."
              onInput={inputHandler}
            />
          )}
          <Input
            id="password"
            placeholder="Enter password"
            element="input"
            type="password"
            label="Enter your password here:    "
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter password with at least one uppercase, lowercase, numeral, symbol."
            onInput={inputHandler}
          />
          {!isLoginMode && (
            <ImageUpload center id="image" onInput={inputHandler} />
          )}
          <br />
          <Button type="submit" disabled={!formState.isValid} size={'big'}>
            {isLoginMode ? 'LOG IN' : 'SIGN UP'}
          </Button>
        </form>
        <hr />
        <Button inverse onClick={switchModeHandler} size={'big'}>
          GO TO {isLoginMode ? 'SIGN UP' : 'LOG IN'}
        </Button>
        </Card>
      </React.Fragment>
  );
}

export default Login;
// End React functional component
