import React, { useState, useEffect } from 'react';
import { getProductById } from '../../api';

import './product.scss';

const Product = props => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);

  const loadProduct = productId => {
    getProductById(productId).then(data => {
      if (data.error) {
        setError(error);
      } else {
        setProduct(data);
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.id;
    loadProduct(productId);
  }, []);

  return (
    <div className='container'>
      <section className='product'>
        <h1>Product Page</h1>
      </section>
    </div>
  );
};

export default Product;
