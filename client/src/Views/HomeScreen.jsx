import React from 'react';
import TempLogo from './Pride_Library_Logo.png';
import Link from 'react-dom';
import Card from '../shared/components/UIElements/Card.js';

import './HomeScreen.css';


function HomeScreen() {
  const Logo = () => {
    return (
      <img src={TempLogo}  alt="A silhouette in trans pride colors of a person reading"/>
    );
  };
  return (
    <div className="greeting-screen">
      <Card>
        {Logo()}
      </Card>
    </div>
    );
}
export default HomeScreen;
