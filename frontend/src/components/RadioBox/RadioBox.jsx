import React, { useState } from 'react';
import './radiobox.scss';

const RadioBox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);

  const handleChange = event => {
    handleFilters(event.target.value);
    setValue(event.target.value);
  };

  return prices.map(price => (
    <div className='radiobox' key={price._id}>
      <input
        className='radio-input'
        type='radio'
        onChange={handleChange}
        value={price._id}
        name={price}
      />
      <label className='price'>{price.name}</label>
    </div>
  ));
};

export default RadioBox;
