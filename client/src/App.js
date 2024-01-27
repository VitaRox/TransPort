// The basics
import React, { useCallback, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

// Linked pages
import HomeScreen from './pages/HomeScreen';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import MakeReport from './pages/MakeReport';
import ViewReports from './pages/ViewReports';
import Login from './pages/Login';
import UserAccount from './pages/UserAccount';
import MyReports from './pages/MyReports';
import UpdateReport from './pages/components/UpdateReport';

// Helpers
import { AuthContext } from './shared/context/auth-context';

let logoutTimer;

// Root-level React component
const App = () => {

  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({ 
        userId: uid, 
        token: token, 
        expiration: tokenExpirationDate.toISOString()})
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime(); // in milliseconds
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout();
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && 
      storedData.token && 
      new Date(storedData.expiration) > new Date()) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);
  
  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path='/' exact>
          <HomeScreen />
        </Route>
        <Route path='/data/new' exact>
          <MakeReport />
        </Route>
        <Route path='/data/view' exact>
          <ViewReports />
        </Route>
        <Route path='/users/:userId/reports'>
          <MyReports />
        </Route>
        <Route path='/users/:userId'>
          <UserAccount />
        </Route>
        <Route path={`/data/view/reports/:reportId`}>
          <UpdateReport />
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
          <ViewReports />
        </Route>
        <Route path='/auth'>
          <Login />
        </Route>
        <Redirect to='/auth' />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
