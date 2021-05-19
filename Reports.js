import React, {useEffect, useState} from 'react';
import ReportsList from '../user/components/ReportsList';



// Goal: output a list of Reports, viewable by anyone;
function Reports() {

  // Provide user feedback about errors that take place
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // Get all Reports; only rerenders if new Report added
  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch('http://localhost:4000/api/data/view/reports');
      const responseData = await response.json();
    };
    sendRequest();
  }, []);

  return ("A list of Reports!");
}

export default Reports;
