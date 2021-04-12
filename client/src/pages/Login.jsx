// The basics:
import React, {useState} from 'react';

// UI Resources
import Card from '../shared/components/UIElements/Card.js';
import Input from '../shared/components/FormElements/Input';
import Button from '../shared/components/FormElements/Button';

// Business logic resources
import { useForm } from '../shared/hooks/form-hook.js';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../shared/util/validators';

// Styles
import './Login.css';

// Begin React functional component
function Login() {

  // Handle state changes governing whether Login/Signup view is shown;
  // It defaults to logging in, as this will be the more common behaviour
  // of regular/frequent end-users;
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Initialize form state;
  const [formState, inputHandler] = useForm({
    username: {
      value: '',
      isValid: false
    },
    password: {
      value: '',
      isValid: false
    },
  },
    // Validity of entire form = (validity of username && validity of password);
    false
  );

  // Handle submission of login credentials;
  const loginSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);  // Send to backend this data
    // const data = new FormData(form.current)
    // console.log(data);
    // fetch('/api', { method: 'POST', body: data })
    //   .then(res => res.json())
    //   .then(json => setUser(json.user))
  };

  // Handles switching this page to the SignUp view
  // (for users who do not yet have an account and wish to
  // make one);
  const switchModeHandler = () => {
    console.log(`Login mode: ${isLoginMode}`);
    // Invert the current state when corresponding Button clicked;
    // Best practice: use prevMode to invert state rather than !stateName
    setIsLoginMode(prevMode => !prevMode);
    // Verify state has changed;
    console.log(`Login mode: ${ isLoginMode }`);
  };

  // Render the component and its constituent components;
  return (
    <Card className="login-info_">
      <form onSubmit={loginSubmitHandler}>
        <Input
          id="username"
          element="input"
          type="text"
          placeholder="Enter username"
          label="Username"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid username."
          onInput={inputHandler}
        >
        </Input>
        <Input
          id="password"
          placeholder="Enter password"
          element="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Please enter a valid password."
          onInput={inputHandler}
        >
        </Input>
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
