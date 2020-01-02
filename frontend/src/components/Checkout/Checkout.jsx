import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../../auth';
import { getBraintreeClientToken } from '../../api';
import { Link } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';
import './Checkout.scss';

const Checkout = ({ products }) => {
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: ''
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then(data => {
      console.log(data);
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({ ...data, clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const calculateTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  return (
    <>
      <section className='checkout'>
        <div className='checkout__total-wrapper'>
          <h2 className='checkout__total'>
            Total:
            <span className='checkout__total-value'>
              &pound;{calculateTotal()}
            </span>
          </h2>
          {isAuthenticated() ? (
            <>
              {data.clientToken !== null && products.length > 0 ? (
                <div className='checkout__braintree'>
                  <DropIn
                    options={{ authorization: data.clientToken }}
                    onInstance={instance => (data.instance = instance)}
                  />
                  <button className='checkout__btn'>Checkout</button>
                </div>
              ) : null}
            </>
          ) : (
            <Link to='/signin'>
              <button className='checkout__btn'>Sign In To Checkout</button>
            </Link>
          )}
        </div>
      </section>
    </>
  );
};

export default Checkout;
