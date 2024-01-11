import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

// UI elements, styles
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import './ReportForm.css';

// Helpers and hooks
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

// Begin React component
const UpdateReport = () => {

  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedReport, setLoadedReport] = useState();
  const reportId = useParams().reportId;
  const history = useHistory();

  // Initialize form state;
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      reportText: {
        value: '',
        isValid: false
      }
    },
    false
  );

  useEffect(() => {
    // Fetch report to be updated/edited, populate the ReportForm with values
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
            }
          },
          true
        );
      } catch (err) { }
    };
    fetchReport();
  }, [sendRequest, reportId, setFormData]);

  // Handle submission of PATCH request to update this Report
  const reportUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:4000/api/data/view/reports/${reportId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          reportText: formState.inputs.reportText.value
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        }
      );
      history.push('/users/' + auth.userId + '/reports');
    } catch (err) { }
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  // Provide user feedback if Report cannot be located
  if (!loadedReport && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Report not found!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="report-form">
        {!isLoading && loadedReport && (
          <form onSubmit={reportUpdateSubmitHandler}>
            <Input
              id="title"
              element="input"
              type="text"
              label="Title"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid title."
              onInput={inputHandler}
              initialValue={loadedReport.title}
              initialValid={true}
            />
            <Input
              id="reportText"
              element="textarea"
              label="Report"
              validators={[VALIDATOR_MINLENGTH(6)]}
              errorText="Must be at least 6 chars in length."
              onInput={inputHandler}
              initialValue={loadedReport.reportText}
              initialValid={true}
            />
            <Button type="submit" disabled={!formState.isValid} size={'report'}>
              Update this Report!
            </Button>
          </form>
        )}
      </Card>
    </React.Fragment>
  );
};

export default UpdateReport;
