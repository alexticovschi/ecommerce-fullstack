import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';

import './adminDashboard.scss';

const AdminDashboard = () => {
  const {
    user: { _id, name, email, role }
  } = isAuthenticated();

  return (
    <section className='account-section'>
      <div className='container'>
        <div className='account-wrapper'>
          <div className='account-links'>
            <h3 className='account-links__title'>Admin Links</h3>
            <ul className='account-links__list-group'>
              <li className='account-links__list-group-item'>
                <Link to='/create/category'>Create Category</Link>
              </li>
              <li className='account-links__list-group-item'>
                <Link to='/create/product'>Create Product</Link>
              </li>
            </ul>
          </div>
          <div className='account-content'>
            <div className='account-content__admin-info'>
              <h3 className='account-content__title'>Admin Information</h3>

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
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
