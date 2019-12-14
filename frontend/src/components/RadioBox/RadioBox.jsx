import React, { useState } from 'react';
import { prices } from './fixedPrices';
import './radiobox.scss';

const RadioBox = () => {
  const [values, setValues] = useState([]);

  const handleChange = () => {};

  return prices.map(price => (
    <div className='radiobox'>
      <input
        type='radio'
        className='radio-input'
        onChange={handleChange}
        value={price._id}
      />
      <label className='price'>{price.name}</label>
    </div>
  ));
};

export default RadioBox;
