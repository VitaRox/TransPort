// The basics
import React, { useCallback, useState } from 'react';
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

// Root-level React component
const App = () => {

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
        isLoggedIn: isLoggedIn,
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
