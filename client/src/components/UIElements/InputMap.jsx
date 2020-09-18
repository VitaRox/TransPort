import React from 'react';
// import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
// import { GoogleMap, LoadScript } from '@react-google-maps/api';
import Map from './Map';

import './Map.js';

const center = {
  lat: 39.833,
  lng: -98.583
};

/**
 * InputMap is the visual interface thru which the apps takes in Reviews
 * and all of the data which will eventually be the lifeblood of the project;
 * This represents the parent-container of a Map to be used for input,
 * as well input fields for user input (eventually);
 * @param {*} props
 */
function InputMap(props) {


  const zoom = 8;
  const defaultCenter = {
    lat: 39.833, lng: -98.583
  };
  const inputMap = new Map(defaultCenter);


  return (
    <div>
      {inputMap}
    </div>
  )
}

export default React.memo(InputMap);
