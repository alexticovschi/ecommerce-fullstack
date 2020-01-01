import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductImage from '../ProductImage/ProductImage';

import './cartItem.scss';

const CartItem = ({
  item,
  updateProductQuantity,
  removeProductAndUpdateState,
  handleItemCountChange
}) => {
  const [count, setCount] = useState(item.count);
  const { _id, name, description, price } = item;

  const shorten = (str, maxLen, separator = ' ') => {
    if (str.length <= maxLen) return str;
    return str.substr(0, str.lastIndexOf(separator, maxLen));
  };

  const handleChange = productId => event => {
    setCount(event.target.value < 1 ? 1 : event.target.value);

    if (event.target.value >= 1) {
      updateProductQuantity(productId, event.target.value);
    }

    handleItemCountChange();
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
      <div className='cart-item__quantity'>
        <input type='number' value={count} onChange={handleChange(item._id)} />
      </div>
      <button
        onClick={() => removeProductAndUpdateState(item._id)}
        className='cart-item__btn'
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
