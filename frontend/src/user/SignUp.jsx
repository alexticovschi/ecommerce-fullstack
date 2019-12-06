import React, { useState } from 'react';
import { API } from '../config';

import './signup.scss';

const SignUp = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
  });

  const { name, email, password } = values;

  const handleInputChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const signUpUser = user => {
    // console.log(user);
    return fetch(`${API}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .catch(error => console.error(error));
  };

  const handleSubmit = event => {
    event.preventDefault();
    signUpUser({ name, email, password });
  };

  return (
    <section className='signup-section'>
      <h2 className='signup-title'>Create Account</h2>

      <div className='container'>
        <form className='signup-form'>
          <p>
            <label htmlFor='name'>Name</label>
            <input onChange={handleInputChange('name')} type='text' />
          </p>
          <p>
            <label htmlFor='email'>Email</label>
            <input onChange={handleInputChange('email')} type='email' />
          </p>
          <p>
            <label htmlFor='password'>Password</label>
            <input onChange={handleInputChange('password')} type='password' />
          </p>
          <button onClick={handleSubmit}>Submit</button>
        </form>
      </div>
      <p>{JSON.stringify(values)}</p>
    </section>
  );
};

export default SignUp;
