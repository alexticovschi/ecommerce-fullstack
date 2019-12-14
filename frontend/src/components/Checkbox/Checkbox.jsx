import React from 'react';
import './checkbox.scss';

const Checkbox = ({ categories }) => {
  return categories.map(category => (
    <li key={category._id}>
      <input type='checkbox' className='checkbox-input' />
      <label className='category-name'>{category.name}</label>
    </li>
  ));
};

export default Checkbox;
