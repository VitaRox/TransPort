import React from 'react';
import Map from '../shared/components/UIElements/Map';

// Styles
import './OutputMap.css';

/**
 * OutputMap is the view container for a Map
 * which will be used to visualize data;
 */
function OutputMap(props) {

  props = {
    defaultClass: "__output",
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

export default OutputMap;
