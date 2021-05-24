// Basic imports:
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

// Resources
import Card from '../../shared/components/UIElements/Card.js';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

// Business Logic
import { VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import { AuthContext } from '../../shared/context/auth-context';

// Styles
import './ReportForm.css';

// Hooks
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useForm } from '../../shared/hooks/form-hook.js';

//Begin React functional component
function ReportForm(props) {

  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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

  const history = useHistory();

  // Handles submission of report information;
  const reportSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest('http://localhost:4000/api/data/new',
        'POST',
        JSON.stringify({
          title: formState.inputs.title.value,
          reportText: formState.inputs.reportText.value,
          address: formState.inputs.address.value,
          authorId: auth.userId
        }),
        { 'Content-Type' : 'application/json' }
      );
      history.push('/');
    } catch (err) {
      console.log(err.message);
    }

  };

  // Render the component and consituent components;
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="report-info_">
        <form onSubmit={reportSubmitHandler}>
          {isLoading && <LoadingSpinner asOverlay />}
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
            Make New Report!
          </Button>
        </form>
      </Card>
    </React.Fragment>
  );
}

export default ReportForm;
