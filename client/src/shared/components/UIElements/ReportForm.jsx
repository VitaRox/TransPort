// Basic imports:
import React, {useState, useContext} from 'react';

// Resources
import Card from './Card.js';
import Input from '../FormElements/Input';
import Button from '../FormElements/Button';

// Business Logic
import { VALIDATOR_MINLENGTH, VALIDATOR_ADDRESS} from '../../util/validators';

// Styles
import './ReportForm.css';

import { useForm } from '../../hooks/form-hook.js';

//Begin React functional component 
function ReportForm(props) {

    // Initialize form state;
    const [formState, reportHandler] = useForm({
      title: {
        value: '',
        isValid: false
      },
      reportText: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      }
    },
    // Validity of entire form = (validity of title && validity of report
    // && validity of address);
    false
    );
    

    // Handles submission of report information;
    const reportSubmitHandler = event => {
      event.preventDefault();
      console.log(formState.inputs);  // Send to backend this data
    };
  
    // Render the component and consituent components; 
    return (
      <Card className="report-info_">
        <form onSubmit={reportSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            placeholder="Think of a catchy title for your report!"
            label="Title   "
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid string."
            onInput={reportHandler}
          >
          </Input>
          <Input
            id="reportText"
            placeholder="File a Report"
            element="input"
            type="text"
            label="Report"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Something is not right"
            onInput={reportHandler}
          >
          </Input>
          <Input
            id="address"
            placeholder="Input the address of the location you're reporting on"
            element="input"
            type="text"
            label="Address   "
            validators={[VALIDATOR_MINLENGTH(12)]}
            errorText="That is not a valid address"
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