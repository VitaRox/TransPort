// Basic imports:
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

// Resources
// import Card from '../../shared/components/UIElements/Card.js';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

// Business Logic
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { AuthContext } from '../../shared/context/auth-context';

// Hooks
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useForm } from '../../shared/hooks/form-hook.js';

// Styles
import './ReportForm.css';

//Begin React functional component
function ReportForm() {

  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // Initialize form state;
  const [formState, inputHandler] = useForm({
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
    },
    image: {
      value: null,
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
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('reportText', formState.inputs.reportText.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('authorId', auth.userId);
      formData.append('image', formState.inputs.image.value);
      await sendRequest('http://localhost:4000/api/data/new', 'POST', formData);
      history.push('/');
    } catch (err) {
      console.log(err.message);
    }
  };

  // Render the component and consituent components;
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
        <form className="report-form" onSubmit={reportSubmitHandler}>
          {isLoading && <LoadingSpinner asOverlay />}
          <Input
            id="title"
            element="input"
            type="text"
            placeholder="Enter a descriptive title"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid string."
            onInput={inputHandler}
          />
          <Input
            id="reportText"
            placeholder="Enter your remarks"
            element="textarea"
            type="text"
            label="Report"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Something is not right"
            onInput={inputHandler}
          />
          <Input
            id="address"
            placeholder="Enter address of locale"
            element="input"
            type="text"
            label="Address"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="That is not a valid address"
            onInput={inputHandler}
          />
          <ImageUpload
            id="image"
            onInput={inputHandler}
            errorText="Please provide an image."
          />
          <Button type="submit" disabled={!formState.isValid} size={'small'}>
            Make New Report!
          </Button>
        </form>
    </React.Fragment>
  );
}

export default ReportForm;
