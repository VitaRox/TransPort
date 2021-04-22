// Basic imports:
import React from 'react';

// Resources
import Card from './Card.js';
import Input from '../FormElements/Input';
import Button from '../FormElements/Button';

// Business Logic
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from '../../util/validators';

// Styles
import './ReportForm.css';

import { useForm } from '../../hooks/form-hook.js';

function ReportForm(props) {

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
      console.log(formState.inputs);  // Send to backend this data
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
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid string."
            onInput={reportHandler}
          >
          </Input>
          <Input
            id="report"
            placeholder="File a Report"
            element="input"
            type="text"
            label="Report"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password."
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
  
  export default ReportForm;