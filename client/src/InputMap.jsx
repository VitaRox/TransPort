import React from 'react';
// import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

import './InputMap.css';



/**
 * InputMap is the visual interface thru which the apps takes in Reviews
 * and all of the data which will eventually be the lifeblood of the project;
 * @param {*} props
 */
function InputMap() {
  const containerStyle = {
    width: '600px',
    height: '400px'
  };

  const center = {
    lat: 39.833,
    lng: -98.583
  };

  // eslint-disable-next-line
  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return (
    <LoadScript googleMapsApiKey="AIzaSyAG-wDA41dtiwMYQ8yYn8vrxlxAaO7ACLc">
      <GoogleMap
        id="input-map"
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(InputMap);
