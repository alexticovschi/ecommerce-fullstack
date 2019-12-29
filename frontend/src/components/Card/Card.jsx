import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductImage from '../ProductImage/ProductImage';
import './card.scss';
import { addItem } from '../../cartHelpers';

const Card = ({ product }) => {
  const { _id, name, price } = product;
  const addToCart = () => {
    addItem(product);
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
