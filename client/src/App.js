import React from 'react';
// import logo from './kitten_blog.jpg';
import './App.css';

import InputMap from './components/UIElements/InputMap';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <div id="map-container">
          <InputMap />
          </div>
      </header>
    </div>
  );
}

export default App;
