import React from 'react';
import { Link } from 'react-router-dom';

import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './Toolbar.scss';

const Toolbar = ({ isOpen, drawerClickHandler }) => (
  <header className='toolbar'>
    <div className='toolbar-wrapper'>
      <nav className='toolbar__navigation'>
        <div className='toolbar__logo'>
          <Link to='/' className='logo'>
            LOGO
          </Link>
        </div>
        <div className='spacer' />
        <div className='toolbar_navigation-items'>
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
        </div>
        <div className='toolbar__toggle-button'>
          <DrawerToggleButton isOpen={isOpen} click={drawerClickHandler} />
        </div>
      </nav>
    </div>
  </header>
);

export default Toolbar;
