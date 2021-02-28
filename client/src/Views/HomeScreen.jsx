// The basics:
import React from 'react';

// Resources:
import TempLogo from '../images/Pride_Library_Logo.png';
import Card from '../shared/components/UIElements/Card.js';

// Styles:
import './HomeScreen.css';


function HomeScreen() {
  const Logo = () => {
    return (
      <img src={TempLogo}  alt="A silhouette in trans pride colors of a person reading"/>
    );
  };
  return (
    <div className="home-screen">
      <Card>
        {Logo()}
      </Card>
    </div>
    );
}
export default HomeScreen;
