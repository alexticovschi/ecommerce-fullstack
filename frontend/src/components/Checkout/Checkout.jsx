import React from 'react';
import { isAuthenticated } from '../../auth';
import { Link } from 'react-router-dom';
import './Checkout.scss';

const Checkout = ({ products }) => {
  const calculateTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  return (
    <section className='checkout'>
      <div className='checkout__total-wrapper'>
        <h2 className='checkout__total'>
          Total:
          <span className='checkout__total-value'>
            &pound;{calculateTotal()}
          </span>
        </h2>
        {isAuthenticated() ? (
          <button className='checkout__btn'>Checkout</button>
        ) : (
          <Link to='/signin'>
            <button className='checkout__btn'>Sign In To Checkout</button>
          </Link>
        )}
      </div>
    </section>
  );
};

export default Checkout;
