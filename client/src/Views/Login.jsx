// The basics:
import React, { useState, useRef }  from 'react';

// Resources
import Card from '../shared/components/UIElements/Card.js';
import Input from '../shared/components/FormElements/Input';
import Button from '../shared/components/FormElements/Button';

// Styles
import './Login.css';

function Login(props) {

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [username, setUsername] = useState('Enter username');
  const [password, setPassword] = useState("Enter password:");
  const form = useRef(null);

  const submit = e => {
    e.preventDefault();
    onChange();

    const data = new FormData(form.current)
    console.log(data);
    // fetch('/api', { method: 'POST', body: data })
    //   .then(res => res.json())
    //   .then(json => setUser(json.user))
  }
  const onChange = () => {
    setUsername(username);
    setPassword(password);
  }

  return (
    <Card className="user-login">
      <form ref={form} className="_login-info">
        <Input placeholder="Enter username" element="input" onChange={onChange}>{username}</Input>
        <Input placeholder="Enter password" element="input" type="password" onChange={onChange}>{username}</Input>
        <Button type="submit">Submit</Button>
      </form>
    </Card>
  )
}

export default Login;
