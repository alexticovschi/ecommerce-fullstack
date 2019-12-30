import React, { useState, useEffect } from 'react';
import {
  getCartItems,
  updateProductQuantity,
  removeProduct
} from '../../cartHelpers';
import CartItem from '../CartItem/CartItem';

import './cart.scss';

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCartItems());
  }, []);

  const handleQuantityChange = productId => {
    // remove the product and update `localStorage`,
    removeProduct(productId);

    // get new cart state from `localStorage`
    const currentCart = getCartItems();

    // update the current state
    setItems(currentCart);
  };

  return (
    <div className='container'>
      <h1 className='cart__title'>Shopping Cart</h1>

      <section className='cart'>
        {items &&
          items.map(item => (
            <CartItem
              updateProductQuantity={updateProductQuantity}
              removeProductAndUpdateState={handleQuantityChange}
              key={item._id}
              item={item}
            />
          ))}
      </section>
    </div>
  );
};

export default Cart;
