import React from 'react';
import './card.scss';

const Card = ({ id, productName, price }) => {
  return (
    <div className='card'>
      <h5 className='card__name'>{productName}</h5>
      <p>&pound;{price}</p>
      <button className='btn card__btn'>Add to cart</button>
    </div>
  );
};

export default Card;
