import React, { useState, useEffect } from 'react';
import { getProductById, getRelatedProducts } from '../../api';
import ProductImage from '../ProductImage/ProductImage';
import Card from '../Card/Card';
import { addItem } from '../../cartHelpers';
import { toast } from 'react-toastify';

import './product.scss';

const Product = props => {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(false);

  const notify = () =>
    toast(<h3 className='card__toast'>Added to Cart</h3>, {
      type: toast.TYPE.SUCCESS,
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
      closeButton: false,
      hideProgressBar: true
    });

  const addToCart = () => {
    addItem(product);
    notify();
  };

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

          <button onClick={addToCart} className='btn product__btn'>
            Add to cart
          </button>
        </div>
      </section>

      <section className='related'>
        <h2 className='related__title'>Related Products</h2>

        <div className='related__products'>
          {relatedProducts &&
            relatedProducts.map(product => (
              <Card key={product._id} product={product} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default Product;
