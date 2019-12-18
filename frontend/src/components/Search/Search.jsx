import React, { useState, useEffect } from 'react';
import { getAllCategories } from '../../api';
import './search.scss';

const Search = () => {
  const [data, setData] = useState({
    categories: []
  });
  const [error, setError] = useState([]);

  const { categories } = data;

  const loadCategories = async () => {
    const categories = await getAllCategories();

    console.log(categories);
    if (categories) {
      setData({ ...data, categories: categories });
    } else {
      setError(categories.error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleChange = () => {};

  console.log(data);

  return (
    <form>
      <div>
        <select onChange={handleChange('category')}>
          <option value='All'>Select Category</option>
          {categories &&
            categories.map(category => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
      <div>
        <input type='text' placeholder='What are you looking for?' />
        <button className='btn'>Search</button>
      </div>
    </form>
  );
};

export default Search;
