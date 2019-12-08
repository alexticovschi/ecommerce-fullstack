import React, { useState } from 'react';
import { isAuthenticated } from '../../auth';
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
    console.log(name);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    setError('');
    setSuccess('false');

    // make request to the api to create the category
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
            />
          </p>
          <button>Add Category</button>
        </form>
      </div>
    </section>
  );
};

export default AddCategory;
