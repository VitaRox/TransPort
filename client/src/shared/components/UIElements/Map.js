import React, { useRef, useEffect } from 'react';

import './Map.css';

function Map(props) {
  const mapRef = useRef();
  // Object destructuring: allows us to get at 'center' and 'zoom' props without
  // tracking state of the 'props' object which contains them;
  const { center, zoom } = props;


  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom
    });
    new window.google.maps.Marker({
      position: center,
      map: map
    });
  }, [center, zoom]);






  return <div ref={mapRef} className={`map ${props.className}`} style={props.style}></div>
}

export default Map;
