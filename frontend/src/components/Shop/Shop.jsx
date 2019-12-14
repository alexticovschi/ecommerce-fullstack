import React, { useState, useEffect } from 'react';
import { getAllCategories } from '../../api';

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

  console.log(categories);
  return (
    <div className='container'>
      <div className='shop'>
        <aside className='sidebar'>
          <ul>
            {categories &&
              categories.map(cat => <li key={cat._id}>{cat.name}</li>)}
          </ul>
        </aside>
        <section className='shop-section'>shop section</section>
      </div>
    </div>
  );
};

export default Shop;
