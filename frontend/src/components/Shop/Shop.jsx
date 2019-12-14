import React, { useState, useEffect } from 'react';
import { getAllCategories } from '../../api';
import Checkbox from '../Checkbox/Checkbox';

import './shop.scss';

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);

  const init = async () => {
    const data = await getAllCategories();
    try {
      if (data) {
        setCategories(data);
      }
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className='container'>
      <div className='shop'>
        <aside className='sidebar'>
          <h2 className='title'>Filter by</h2>
          <h3>Categories</h3>
          <ul>
            <Checkbox categories={categories} />
          </ul>
        </aside>
        <section className='shop-section'>shop section</section>
      </div>
    </div>
  );
};

export default Shop;
