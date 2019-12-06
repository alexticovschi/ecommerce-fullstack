import React from 'react';
import { Link } from 'react-router-dom';
import './SideDrawer.scss';

const SideDrawer = ({ show }) => {
  return (
    <nav className={show ? 'side-drawer open' : 'side-drawer'}>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/signin'>Sign In</Link>
        </li>
        <li>
          <Link to='/signup'>Sign Up</Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideDrawer;
