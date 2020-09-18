import React from 'react';
// import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import Map from './Map';

import './InputMap.css';

// const containerStyle = {
//   width: '700px',
//   height: '700px'
// };

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

  // const mapStyle = {
  //   height: "100vh",
  //   width: "100%"
  // };

  const defaultCenter = {
    lat: 39.833, lng: -98.583
  };



  // eslint-disable-next-line
  const [map, setMap] = React.useState(Map(defaultCenter));

  // const onLoad = React.useCallback(function callback(Map) {
  //   const bounds = new window.google.maps.LatLngBounds();
  //   Map.fitBounds(bounds);
  //   setMap(Map)
  // }, []);

  // const onUnmount = React.useCallback(function callback(Map) {
  //   setMap(null)
  // }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyAG-wDA41dtiwMYQ8yYn8vrxlxAaO7ACLc">
      <GoogleMap
        id="input-map"
        // mapContainerStyle={containerStyle}
        center={center}
        zoom={8}
        // onLoad={onLoad}
        // onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */}
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(InputMap);
