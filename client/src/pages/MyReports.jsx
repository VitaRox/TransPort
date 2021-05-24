import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Page components
import ReportList from './components/ReportList';
import ErrorModal from '../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';

// Custom hooks
import { useHttpClient } from '../shared/hooks/http-hook';

// Page from which to view your Reports (Reports of currently logged-in User)
function MyReports() {

  const [loadedReports, setLoadedReports] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const userId = useParams().userId;

  useEffect(() => {
    const getMyReports = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:4000/api/data/view/reports/user/${userId}`
        );
        setLoadedReports(responseData.reports);
      } catch (error) {
        console.log(error.message);
      }
    };
    getMyReports();
  }, [sendRequest, userId]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading &&
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>}
      {!isLoading && loadedReports && <ReportList items={loadedReports} />}
    </React.Fragment>
  );

}
export default MyReports;
