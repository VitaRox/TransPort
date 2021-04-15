// The basics;
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

// Containers/high-level interfaces
import HomeScreen from './Views/HomeScreen';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import InputMap from './shared/components/UIElements/InputMap';
import OutputMap from './shared/components/UIElements/OutputMap';
import ReportForm from './/shared/components/UIElements/ReportForm'

// Stylings:
// import logo from './kitten_blog.jpg';
import './App.css';
import Login from './Views/Login';


function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path='/' exact>
            <HomeScreen />
          </Route>
          <Route path='/data/view' exact>
            Display a map component for viewing data.
             Will include filters and a Submit button for filtering map data results.
            <OutputMap />
          </Route>
          <Route path='/data/new' exact>
            Display a map for entering data, as well as text inputs.
            Clicking the map creates a Google Maps Marker to be attached to the post
            for associating the data with location.
            <InputMap />
          </Route>
          <Route path='/auth' exact>
            <Login />
          </Route>
          <Redirect to='/' />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
