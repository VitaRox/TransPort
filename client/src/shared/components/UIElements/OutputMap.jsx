import React, { useState } from 'react';

import Map from './Map';
import Button from '../FormElements/Button';

import './OutputMap.css';

/**
 * OutputMap is the view container for a Map
 * which will be used to visualize data;
 */
function OutputMap(props) {

  // // State management;
  // const [showMap, setShowMap] = useState(true);

  // //
  // const openMapHandler = () => setShowMap(true);
  // const closeMapHandler = () => setShowMap(false);

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
