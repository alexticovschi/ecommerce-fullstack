import React, { useState, useEffect } from 'react';
import { getAllCategories, list } from '../../api';
import Card from '../Card/Card';

import './search.scss';

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: '',
    search: '',
    results: [],
    searched: false
  });
  const [error, setError] = useState([]);

  const { categories, category, search, results, searched } = data;

  const loadCategories = async () => {
    const categories = await getAllCategories();

    if (categories) {
      setData({ ...data, categories: categories });
    } else {
      setError(categories.error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const fetchData = () => {
    // console.log(category, search);
    if (search) {
      list({ search: search || undefined, category: category }).then(result => {
        if (result.error) {
          console.error(error);
          setError(result.error);
        } else {
          setData({ ...data, results: result, searched: true });
        }
      });
    }
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    fetchData();
  };

  const handleChange = name => event => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  console.log(results);

  return (
    <>
      <div className='container'>
        <form onSubmit={handleFormSubmit} className='search-form'>
          <div>
            <select onChange={handleChange('category')}>
              <option value='All'>Select Category</option>
              {categories &&
                categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <input
              onChange={handleChange('search')}
              type='text'
              placeholder='What are you looking for?'
            />
            <button className='btn'>Search</button>
          </div>
        </form>
      </div>
      <div className='container'>
        {results.length > 0 ? (
          <div className='search'>
            <div className='search__results'>
              {results &&
                results.map(product => (
                  <Card
                    id={product._id}
                    key={product._id}
                    productName={product.name}
                    description={product.description}
                    price={product.price}
                  />
                ))}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Search;
