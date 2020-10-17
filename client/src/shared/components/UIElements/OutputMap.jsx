import React, {useState} from 'react';
// import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import GoogleMapReact from 'google-map-react';
// import { GoogleMap, LoadScript } from '@react-google-maps/api';
import Map from './Map';
import Modal from './Modal';
import Button from '../FormElements/Button';
import Card from './Card';

import './OutputMap.css';

/**
 * OutputMap is the view container for a Map
 * which will be used to visualize data;
 */
function OutputMap(props) {

  // State management;
  const [showMap, setShowMap] = useState(true);

  //
  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  props = {
    class: "__output",
    defaultZoom: 12,
    defaultCenter: {
      lat: 39.833, lng: -98.583
    },
  };

  return (
    <div id="map-container">
      <Map class={props.class} center={props.defaultCenter} zoom={props.defaultZoom} />
    </div>
  );
}

export default OutputMap;
