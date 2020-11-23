import React from 'react';

import './NavLinks.css';
import { NavLink } from 'react-router-dom';

function NavLinks(props) {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>HOME</NavLink>
      </li>
      <li>
        <NavLink to="/data/view" exact>VIEW OUTPUT MAP</NavLink>
      </li>
      <li>
        <NavLink to="/data/new">VIEW INPUT MAP</NavLink>
      </li>
      <li>
        <NavLink to="/auth">LOG IN</NavLink>
      </li>
      <li>
        <NavLink to="/users/create" exact>CREATE ACCOUNT</NavLink>
      </li>
    </ul>
  );
}

export default NavLinks;
