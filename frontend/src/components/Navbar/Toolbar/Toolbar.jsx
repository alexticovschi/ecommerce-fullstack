import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signOutUser } from '../../../auth';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './Toolbar.scss';

const Toolbar = ({ isOpen, drawerClickHandler, history }) => (
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
            <li>
              <Link
                to=''
                onClick={() =>
                  signOutUser(() => {
                    history.push('/');
                  })
                }
              >
                Sign Out
              </Link>
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

export default withRouter(Toolbar);
