import React, { useState, useEffect } from 'react';
import { getProductById, getRelatedProducts } from '../../api';
import ProductImage from '../ProductImage/ProductImage';
import Card from '../Card/Card';

import './product.scss';

const Product = props => {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadProduct = productId => {
    getProductById(productId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);

        // Fetch related products
        getRelatedProducts(productId).then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProducts(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.id;
    loadProduct(productId);
  }, [props]);

  return (
    <div className='container'>
      <section className='product'>
        <ProductImage
          className='product__image'
          id={product._id}
          url='product'
          productName={product.name}
        />

        <div className='product__info'>
          <h1 className='product__name'>{product.name}</h1>
          <p className='product__price'>Price &pound;{product.price}</p>
          <div className='product__description'>
            <h2 className='product__description-title'>About this book</h2>
            <p className='product__description-text'>{product.description}</p>
          </div>

          <button className='btn product__btn'>Add to cart</button>
        </div>
      </section>

      <section className='related'>
        <h2 className='related__title'>Related Products</h2>

        <div className='related__products'>
          {relatedProducts &&
            relatedProducts.map(product => (
              <Card
                id={product._id}
                key={product._id}
                productName={product.name}
                description={product.description}
                price={product.price}
              />
            ))}
        </div>
      </section>
    </div>
  );
};

export default Product;
