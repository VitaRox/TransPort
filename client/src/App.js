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

// Stylings:
// import logo from './kitten_blog.jpg';
import './App.css';


function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <HomeScreen />
          </Route>
          <Route path='/data/view' exact>
            <OutputMap />
          </Route>
          <Route path="/data/new" exact>
            <InputMap />
          </Route>
          {/* <Route path="/auth" exact>
            component to log in with
          </Route> */}
          {/* <Redirect to="/" /> */}
        </Switch>
      </main>
    </Router>
  );
}

export default App;
