import React from 'react';
import { Link } from 'react-router-dom';
import ProductImage from '../ProductImage/ProductImage';
import './card.scss';

const Card = ({ id, productName, price }) => {
  return (
    <Link to={`/product/${id}`} className='card'>
      <ProductImage id={id} url='product' productName={productName} />
      <h5 className='card__name'>{productName}</h5>
      <p>&pound;{price}</p>
      <button className='btn card__btn'>Add to cart</button>
    </Link>
  );
};

export default Card;
