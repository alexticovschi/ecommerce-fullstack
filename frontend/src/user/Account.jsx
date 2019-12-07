import React from 'react';
import { isAuthenticated } from '../auth';

import './account.scss';

const Account = () => {
  const {
    user: { _id, name, email, role }
  } = isAuthenticated();

  return (
    <section className='account-section'>
      <div className='container'>
        <div className='account-content user-info'>
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

        <div className='account-content purchase-history'>
          <h3 className='account-content__title'>Purchase History</h3>

          <ul className='account-content__list-group'>
            <li className='account-content__list-group-item'>History </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Account;
