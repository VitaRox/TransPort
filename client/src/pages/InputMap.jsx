import React from 'react';
import Map from '../shared/components/UIElements/Map';

// Styles
import './InputMap.css';

/**
 * InputMap is the visual interface thru which the apps takes in Reviews
 * and all of the data which will eventually be the lifeblood of the project;
 * This represents the parent-container of a Map to be used for input,
 * as well input fields for user input (eventually);
 */
function InputMap(props) {

  props = {
    defaultClass: "__input",

    defaultCenter: {
      lat: 39.833, lng: -98.583
    },
    defaultZoom: 12,
  };

  return (
    <div id="map-container">
      <Map class={props.defaultClass} center={props.defaultCenter} zoom={props.defaultZoom} />
    </div>
  );
}

export default InputMap;