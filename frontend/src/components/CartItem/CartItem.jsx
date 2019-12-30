import React from 'react';
import { Link } from 'react-router-dom';
import ProductImage from '../ProductImage/ProductImage';

import './cartItem.scss';

const CartItem = ({ item }) => {
  const { _id, name, description, price } = item;

  const shorten = (str, maxLen, separator = ' ') => {
    if (str.length <= maxLen) return str;
    return str.substr(0, str.lastIndexOf(separator, maxLen));
  };
  return (
    <div className='cart-item'>
      <Link to={`/product/${_id}`}>
        <ProductImage
          id={_id}
          url='product'
          productName={name}
          className='cart-item__img'
        />
      </Link>
      <div className='cart-item__name-and-description'>
        <h3 className='cart-item__name'>{name}</h3>
        <p className='cart-item__description'>
          {shorten(description, 400)} ...
        </p>
      </div>
      <div className='cart-item__price'>&pound;{price}</div>
      <div class='cart-item__quantity'>
        <input type='number' value={1} min='1' />
      </div>
      <button className='cart-item__btn'>Remove</button>
    </div>
  );
};

export default CartItem;
