import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { signInUser, authenticateUser } from '../auth';

import './signin.scss';

const SignIn = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirect: false
  });

  const { email, password, loading, error, redirect } = values;

  const handleInputChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signInUser({ email, password }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticateUser(data, () => {
          setValues({
            ...values,
            redirect: true
          });
        });
      }
    });
  };

  const showError = () => (
    <div className='signin-error' style={{ display: error ? '' : 'none' }}>
      <p>{error}</p>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div>
        <h2>Loading</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirect) {
      return <Redirect to='/' />;
    }
  };

  return (
    <section className='signin-section'>
      <h2 className='signin-title'>Sign In</h2>

      <div className='container'>
        <form className='signin-form'>
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
        {showLoading()}
        {redirectUser()}
      </div>
    </section>
  );
};

export default SignIn;
