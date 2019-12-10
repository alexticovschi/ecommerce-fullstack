import React, { useState } from 'react';
import { isAuthenticated } from '../../auth';
import { createCategory } from '../adminApi';
import './addCategory.scss';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  //  destructure user info & token from local storage
  const { user, token } = isAuthenticated();

  const handleInputChange = event => {
    setError('');
    setName(event.target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    setError('');
    setSuccess(false);

    // make request to the api to create the category
    createCategory(user._id, token, { name }).then(data => {
      // console.log(data);
      if (data.error) {
        setError(true);
      } else {
        setError('');
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      }
    });
  };

  const showError = () => {
    if (error) {
      return <h3 className='category-error'>Category name should be unique</h3>;
    }
  };

  const showSuccess = () => {
    if (success) {
      return <h3 className='category-success'>Category {name} was created</h3>;
    }
  };

  return (
    <section className='category-section'>
      <h2 className='category-title'>Add New Category</h2>

      <div className='container'>
        <form onSubmit={handleFormSubmit} className='category-form'>
          <p>
            <input
              onChange={handleInputChange}
              type='text'
              value={name}
              autoFocus
              required
            />
          </p>
          <button type='submit'>Add Category</button>
        </form>
      </div>

      <div className='form-messages'>
        {showSuccess()}
        {showError()}
      </div>
    </section>
  );
};

export default AddCategory;
