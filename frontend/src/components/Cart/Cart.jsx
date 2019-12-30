import React, { useState, useEffect } from 'react';
import { getCartItems } from '../../cartHelpers';
import CartItem from '../CartItem/CartItem';

import './cart.scss';

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCartItems());
  }, []);

  console.log(items);

  return (
    <div className='container'>
      <h1 className='cart__title'>Shopping Cart</h1>

      <section className='cart'>
        {items.map(item => (
          <CartItem item={item} />
        ))}
      </section>
    </div>
  );
};

export default Cart;
