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

  const handleInputChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  return (
    <section className='signup-section'>
      <h2 className='signup-title'>Create Account</h2>

      <div className='container'>
        <form className='signup-form'>
          <p>
            <label for='name'>Name</label>
            <input onChange={handleInputChange('name')} type='text' />
          </p>
          <p>
            <label for='email'>Email</label>
            <input onChange={handleInputChange('email')} type='email' />
          </p>
          <p>
            <label for='password'>Password</label>
            <input onChange={handleInputChange('password')} type='password' />
          </p>
          <p>
            <button>Submit</button>
          </p>
        </form>
      </div>
      <p>{JSON.stringify(values)}</p>
    </section>
  );
};

export default SignUp;
