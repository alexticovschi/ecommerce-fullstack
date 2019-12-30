import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductImage from '../ProductImage/ProductImage';
import { addItem } from '../../cartHelpers';

import { toast } from 'react-toastify';
import './card.scss';

const Card = ({ product }) => {
  const { _id, name, price } = product;
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

  return (
    <div className='card'>
      <Link to={`/product/${_id}`}>
        <ProductImage id={_id} url='product' productName={name} />
      </Link>
      <h5 className='card__name'>{name}</h5>
      <p>&pound;{price}</p>

      <button onClick={addToCart} className='btn card__btn'>
        Add to cart
      </button>
    </div>
  );
};

export default Card;
