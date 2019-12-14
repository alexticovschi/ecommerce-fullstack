import React, { useState, useEffect } from 'react';
import './checkbox.scss';

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const toggleCheckbox = catId => () => {
    const currentCategoryId = checked.indexOf(catId);
    const categoryIdsArray = [...checked];
    if (currentCategoryId === -1) {
      categoryIdsArray.push(catId);
    } else {
      categoryIdsArray.splice(currentCategoryId, 1);
    }

    setChecked(categoryIdsArray);
    handleFilters(categoryIdsArray);
  };

  return categories.map(category => (
    <li key={category._id}>
      <input
        type='checkbox'
        value={checked.indexOf(category._id) === -1}
        onChange={toggleCheckbox(category._id)}
        className='checkbox-input'
      />
      <label className='category-name'>{category.name}</label>
    </li>
  ));
};

export default Checkbox;
