import React, { useEffect, useState } from 'react';
import Sticky from 'react-sticky-el';

// Page components
import ReportList from './components/ReportList';
import Map from '../shared/components/UIElements/Map';
import ErrorModal from '../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../shared/hooks/http-hook';

// Styles
import '../shared/components/UIElements/PageContainers.css';

// The page from which we can view Reports made by all Users
function ViewReports(props) {

  // Map default settings
  props = {
    defaultClass: "__output",
    defaultCenter: {
      lat: 39.833, lng: -98.583
    },
    defaultZoom: 12,
  };

  // Hooks, state management
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedReports, setLoadedReports] = useState();

  // Fetch all Reports by all Users
  useEffect(() => {
    const fetchAllReports = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:4000/api/data/view/reports'
        );
        setLoadedReports(responseData.reports);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchAllReports();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <div className="map-container">
        <Map center={props.defaultCenter} zoom={props.defaultZoom} />
      </div>
      <div className="list-container">
        {!isLoading && loadedReports && <ReportList items={loadedReports} />}
      </div>
    </React.Fragment>
  );
}

export default ViewReports;
