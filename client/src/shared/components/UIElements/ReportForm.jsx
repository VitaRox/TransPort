// Basic imports:
import React from 'react';

// Resources
import Card from '../shared/components/UIElements/Card.js';
import Input from '../shared/components/FormElements/Input';
import Button from '../shared/components/FormElements/Button';
import { useForm } from '../shared/hooks/form-hook.js';

function Login(props) {

    // Initialize form state;
    const [formState, reportHandler] = useForm({
      location: {
        value: '',
        isValid: false
      },
      report: {
        value: '',
        isValid: false
      },
    },
    false
    );
  
    const reportSubmitHandler = e => {
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
      <Card className="report-info_">
        <form onSubmit={reportSubmitHandler}>
          <Input
            id="location"
            element="input"
            type="text"
            placeholder="What's the location you're writing about?"
            label="Location"
            //validators={[VALIDATOR_REQUIRE()]}
            errorText="GET TO DE CHOPPA."
            onInput={reportHandler}
          >
          </Input>
          <Input
            id="report"
            placeholder="File a Report"
            element="input"
            type="text"
            label="Report"
            //validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid assword."
            onInput={reportHandler}
          >
          </Input>
          <Button type="submit" disabled={!formState.isValid}>
            Submit
          </Button>
        </form>
      </Card>
    );
  }
  
  export default Login;