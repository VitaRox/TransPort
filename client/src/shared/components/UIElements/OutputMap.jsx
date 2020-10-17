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
  const [showMap, setShowMap] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  props = {
    className: "__output",
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
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="modal-content"
        footerClass="modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <li>
          <Card className="item__content">
            <div id="map-container">
              <Map center={props.defaultCenter} zoom={props.defaultZoom}/>
            </div>
            <div className="item__actions">
              <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
              <Button to={`/places/${props.id}`}>EDIT</Button>
              <Button danger>DELETE</Button>
            </div>
          </Card>
        </li>
      </Modal>
    </React.Fragment>
  );
}

export default OutputMap;
