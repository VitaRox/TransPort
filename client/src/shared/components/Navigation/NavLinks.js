import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';

import './NavLinks.css';


function NavLinks() {

  // This component will re-render whenever the value of AuthContext is changed;
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>HOME</NavLink>
      </li>
      <li>
        <NavLink to="/data/view" exact>VIEW OUTPUT MAP</NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/data/new">VIEW INPUT MAP</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">LOG IN</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/users/:userId" exact>YOUR ACCOUNT</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>SIGN OUT</button>
        </li>
      )}
    </ul>
  );
}

export default NavLinks;
