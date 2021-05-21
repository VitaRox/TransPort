import React from 'react';

// UI elements
import ReportForm from './components/ReportForm.jsx';
import Map from '../shared/components/UIElements/Map.js';
import Input from '../shared/components/FormElements/Input';
import Button from '../shared/components/FormElements/Button';

// Helpers
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../shared/util/validators';
import { useForm } from '../shared/hooks/form-hook';

// Styles
import './MakeReport.css';

/**
 * InputMap is the visual interface thru which the apps takes in Reviews
 * and all of the data which will eventually be the lifeblood of the project;
 * This represents the parent-container of a Map to be used for input,
 * as well input fields for user input (eventually);
 */
function MakeReport(props) {

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
