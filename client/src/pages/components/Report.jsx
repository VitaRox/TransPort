import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import './Report.css';

// Represents the frontend view of a Report
const Report = props => {

  return (
    <Card className="report-item__">
      <div className="report-item__info">
        <h1>{props.imageUrl}</h1>
        <h2>{props.title}</h2>
        <h3>{props.address}</h3>
        <p>{props.reportText}</p>
      </div>
    </Card>
  );

};

export default Report;
