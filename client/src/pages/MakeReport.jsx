import React from 'react';

// UI elements
import ReportForm from './components/ReportForm.jsx';
import Map from '../shared/components/UIElements/Map.js';

// Styles
import './MakeReport.css';

// Page from which logged-in User can post a new Report
function MakeReport(props) {

  // Map default settings
  props = {
    defaultClass: "__input",

    defaultCenter: {
      lat: 39.833, lng: -98.583
    },
    defaultZoom: 12,
  };

  return (
    <React.Fragment>
      <div id="map-container">
        <Map class={props.defaultClass} center={props.defaultCenter} zoom={props.defaultZoom} />
        <div id="report-form-container">
          <ReportForm />
        </div>
      </div>
    </React.Fragment>
  );
}

export default MakeReport;
