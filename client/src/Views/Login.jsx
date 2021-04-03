// The basics:
import React, { useState, useRef }  from 'react';

// UI Resources
import Card from '../shared/components/UIElements/Card.js';
import Input from '../shared/components/FormElements/Input';
import Button from '../shared/components/FormElements/Button';

// Business logic resources
import { useForm } from '../shared/hooks/form-hook.js';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../shared/util/validators';

// Styles
import './Login.css';


function Login() {

  // TODO: figure out why these are necessary to make the Submit button clickable.
  const [username, setUsername] = useState('Enter username');
  const [password, setPassword] = useState("Enter password:");

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
  false
);

  // const onChange = () => {
  //   setUsername(props.username);
  //   setPassword(props.password);
  // };

  const loginSubmitHandler = e => {
    e.preventDefault();
    // onChange();
    console.log(formState.inputs);  // Send to backend this data
    // const data = new FormData(form.current)
    // console.log(data);
    // fetch('/api', { method: 'POST', body: data })
    //   .then(res => res.json())
    //   .then(json => setUser(json.user))
  };

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
          errorText="Please enter a valid title."
          onInput={inputHandler}
        >
        </Input>
        <Input
          id="password"
          placeholder="Enter password"
          element="input"
          type="password"
          label="Secret"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid password."
          onInput={inputHandler}
        >
        </Input>
        <Button type="submit" disabled={!formState.isValid}>
          Submit
        </Button>
      </form>
    </Card>
  )
}

export default Login;
