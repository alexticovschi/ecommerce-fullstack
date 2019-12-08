import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';

import './account.scss';

const Account = () => {
  const {
    user: { _id, name, email, role }
  } = isAuthenticated();

  const userLinks = () => {
    return (
      <ul className='account-links__list-group'>
        <li className='account-links__list-group-item'>
          <Link to='/cart'>My Cart</Link>
        </li>
        <li className='account-links__list-group-item'>
          <Link to='/profile/update'>Update Profile</Link>
        </li>
      </ul>
    );
  };

  return (
    <section className='account-section'>
      <div className='container'>
        <div className='account-wrapper'>
          <div className='account-links'>
            <h3 className='account-links__title'>User Links</h3>
            <ul className='account-links__list-group'>
              <li className='account-links__list-group-item'>
                <Link to='/cart'>My Cart</Link>
              </li>
              <li className='account-links__list-group-item'>
                <Link to='/profile/update'>Update Profile</Link>
              </li>
            </ul>
          </div>
          <div className='account-content'>
            <div className='account-content__user-info'>
              <h3 className='account-content__title'>User Information</h3>

              <ul className='account-content__list-group'>
                <li className='account-content__list-group-item'>
                  Name: <span>{name}</span>
                </li>
                <li className='account-content__list-group-item'>
                  Email: <span>{email}</span>
                </li>
                <li className='account-content__list-group-item'>
                  Role: <span>{role === 0 ? 'Registered User' : 'Admin'}</span>
                </li>
              </ul>
            </div>

            <div className='account-content__purchase-history'>
              <h3 className='account-content__title'>Purchase History</h3>

              <ul className='account-content__list-group'>
                <li className='account-content__list-group-item'>History </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Account;
