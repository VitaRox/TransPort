// The basics
import React, { useCallback, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

// Containers/high-level interfaces
import HomeScreen from './pages/HomeScreen';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import MakeReport from './pages/MakeReport';
import ViewReports from './pages/ViewReports';
import Login from './pages/Login';
import UserAccount from './pages/UserAccount';

// Helpers
import { AuthContext } from './shared/context/auth-context';

// Stylings
import './App.css';

// Root-level React component, App
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path='/' exact>
          <HomeScreen />
        </Route>
        <Route path='/data/new' exact>
          Display a map for entering data, as well as text inputs.
          Clicking the map creates a Google Maps Marker to be attached to the post
          for associating the data with location.
          <MakeReport />
        </Route>
        <Route path='/data/view' exact>
          Display a map component for viewing data.
          Will include filters and a Submit button for filtering map data results.
          <ViewReports />
        </Route>
        <Route path='/users/:userId'>
          <UserAccount />
          {/* This will render the user account component */}
        </Route>
      <Redirect to='/' />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path='/' exact>
          <HomeScreen />
        </Route>
        <Route path='/data/view' exact>
          Display a map component for viewing data.
          Will include filters and a Submit button for filtering map data results.
          <ViewReports />
        </Route>
        <Route path='/auth' exact>
          <Login />
        </Route>
        <Redirect to='/auth' />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          {routes}
        </main>
        </Router>
      </AuthContext.Provider>
  );
}

export default App;
