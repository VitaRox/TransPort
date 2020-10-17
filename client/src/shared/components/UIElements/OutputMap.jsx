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

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  props = {
    defaultZoom: 12,
    defaultCenter: {
      lat: 39.833, lng: -98.583
    },
  };

  // const defaultCenter =  {
  //   lat : 39.833, lng : -98.583
  // };

  // const defaultZoom = 12;


  return (
    <div id="map-container">
      <Map center={props.defaultCenter} zoom={props.defaultZoom} />
    </div>
    // <React.Fragment>
    //   <Modal
    //     show={showMap}
    //     onCancel={closeMapHandler}
    //     // header={props.address}
    //     contentClass="modal-content"
    //     footerClass="modal-actions"
    //     footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
    //   >
    //     <Map center={props.defaultCenter} zoom={props.defaultZoom} />
    //   </Modal>
    // </React.Fragment>
  );
}

export default OutputMap;
