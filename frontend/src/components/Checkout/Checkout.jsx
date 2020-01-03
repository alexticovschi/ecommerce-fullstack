import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../../auth';
import { getBraintreeClientToken, processPayment } from '../../api';
import { Link } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';

import './Checkout.scss';

const Checkout = ({ products }) => {
  const [payment, setPayment] = useState({
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
      // console.log(data);
      if (data.error) {
        setPayment({ ...payment, error: data.error });
      } else {
        setPayment({ ...payment, clientToken: data.clientToken });
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

  const buy = () => {
    let nonce;
    let getNonce = payment.instance
      .requestPaymentMethod()
      .then(data => {
        // console.log(data);
        nonce = data.nonce;

        // once you have data (card type, card number) send nonce as 'paymentMethodNonce'
        // and also the total to be charged
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: calculateTotal(products)
        };

        processPayment(userId, token, paymentData)
          .then(response => {
            setPayment({ ...payment, success: response.success });
            // empty cart
            // create order
          })
          .catch(error => console.error(error));
      })
      .catch(error => {
        console.error('Dropin error: ', error);
        setPayment({ ...payment, error: error.message });
      });
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
          {payment.error ? (
            <div className='checkout__error'>{payment.error}</div>
          ) : null}

          {isAuthenticated() ? (
            <>
              {payment.clientToken !== null && products.length > 0 ? (
                <div
                  onBlur={() => setPayment({ ...payment, error: '' })}
                  className='checkout__braintree'
                >
                  <DropIn
                    options={{ authorization: payment.clientToken }}
                    onInstance={instance => (payment.instance = instance)}
                  />
                  <button onClick={buy} className='checkout__btn'>
                    Pay
                  </button>
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
