import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signUpUser } from '../auth';

import './signup.scss';

const SignUp = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
  });

  const { name, email, password, success, error } = values;

  const handleInputChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    signUpUser({ name, email, password }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error: '',
          success: true
        });
      }
    });
  };

  const showError = () => (
    <div className='signup-error' style={{ display: error ? '' : 'none' }}>
      <p>{error}</p>
    </div>
  );
  const showSuccess = () => (
    <div className='signup-success' style={{ display: success ? '' : 'none' }}>
      <p>
        New account was created. Please{' '}
        <Link to='/signin' className='signin'>
          Sign In
        </Link>
      </p>
    </div>
  );

  const isError = error => {
    console.log(error.includes('Name'));
    return error.includes('Name');
  };

  return (
    <section className='signup-section'>
      <h2 className='signup-title'>Create Account</h2>

      <div className='container'>
        <form className='signup-form'>
          <p>
            <label htmlFor='name'>Name</label>
            <input
              onChange={handleInputChange('name')}
              type='text'
              value={name}
            />
          </p>
          <p>
            <label htmlFor='email'>Email</label>
            <input
              onChange={handleInputChange('email')}
              type='email'
              value={email}
            />
          </p>
          <p>
            <label htmlFor='password'>Password</label>
            <input
              onChange={handleInputChange('password')}
              type='password'
              value={password}
            />
          </p>
          <button onClick={handleSubmit}>Submit</button>
        </form>
      </div>

      <div className='form-messages'>
        {showError()}
        {showSuccess()}
      </div>
    </section>
  );
};

export default SignUp;
