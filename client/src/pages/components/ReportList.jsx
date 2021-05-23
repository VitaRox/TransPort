import React from 'react';

// UI elements
import Card from '../../shared/components/UIElements/Card';
import Report from './Report';
import Button from '../../shared/components/FormElements/Button';

// Styles
import './ReportList.css';

// List of Reports
const ReportList = props => {
  if (props.items.length === 0) {
    return (
      <div className="report-list center">
        <Card>
          <h2>No Reports found.</h2>
          <Button to="/data/new">Make a Report</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="report-list">
      {props.items.map(report => (
        <Report
          key={report.id}
          id={report.id}
          image={report.imageUrl}
          title={report.title}
          reportText={report.reportText}
          address={report.address}
          authorId={report.authorId}
          location={report.location}
        />
      ))}
    </ul>
  );
};

export default ReportList;
