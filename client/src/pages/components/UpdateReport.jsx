import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// UI elements, styles
import Input from '../shared/components/UIElements/Input';
import Card from '../../shared/components/UIElements/Card';
import Button from '../shared/components/UIElements/Button';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import './ReportForm.css';

// Helpers and hooks
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';

// Begin React component
function UpdateReport(props) {

  // Provide user feedback about errors that take place
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [loadedReport, setLoadedReport] = useState();
  const reportId = useParams().reportId;

  // Initialize form state;
  const [formState, inputHandler, setFormData] = useForm({
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

  // Fetch report to be updated/edited
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:4000/api/data/view/reports/${reportId}`
        );
        setLoadedReport(responseData.report);
        setFormData(
          {
            title: {
              value: responseData.report.title,
              isValid: true
            },
            reportText: {
              value: responseData.report.reportText,
              isValid: true
            },
            address: {
              value: responseData.report.address,
              isValid: true
            }
          },
          true
        );
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchReport();
  }, [sendRequest, reportId, setFormData]);

  const reportUpdateSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  // Provide user feedback if Report cannot be located
  if (!loadedReport && !error) {
    return (
      <div className="center">
        <Card>
          <h2>
            Report not found!
          </h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {
        !isLoading && loadedReport && <Card className="report-form">
        <form onSubmit={reportUpdateSubmitHandler}>
          {isLoading && <LoadingSpinner asOverlay className="center" />}
          <Input
            id="title"
            element="input"
            type="text"
            placeholder="Enter a descriptive title"
            label="Title"
            validators={[VALIDATOR_REQUIRE]}
            errorText="Please enter a valid string."
            onInput={inputHandler}
            initialValue={formState.inputs.title.value}
            initialValidity={formState.inputs.title.isValid}
          >
          </Input>
          <Input
            id="reportText"
            placeholder="Enter your remarks"
            element="textarea"
            type="text"
            label="Report"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Something is not right"
            onInput={inputHandler}
            initialValue={formState.inputs.reportText.value}
            initialValidity={formState.inputs.reportText.isValid}
          >
          </Input>
          <Input
            id="address"
            placeholder="Enter address of locale"
            element="input"
            type="text"
            label="Address"
            validators={[VALIDATOR_REQUIRE]}
            errorText="That is not a valid address"
            onInput={inputHandler}
            initialValue={formState.inputs.address.value}
            initialValidity={formState.inputs.address.isValid}
          >
          </Input>
          <Button type="submit" disabled={!formState.isValid} size={'report'}>
            Make New Report!
          </Button>
        </form>
      </Card>
      }
    </React.Fragment>
  );


}

export default UpdateReport;
