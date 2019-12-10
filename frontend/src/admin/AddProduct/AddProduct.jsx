import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../../auth';
import { addProduct } from '../adminApi';

import './addProduct.scss';

const AddProduct = () => {
  //  destructure user info & token from local storage
  const { user, token } = isAuthenticated();

  // set the default state
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    shipping: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createProduct: ' ',
    redirect: false,
    formData: ''
  });

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    photo,
    quantity,
    loading,
    error,
    createProduct,
    redirect,
    formData
  } = values;

  useEffect(() => setValues({ ...values, formData: new FormData() }), []);

  const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
    // console.log(values);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    console.log(createProduct);

    setValues({ ...values, error: '', loading: true });

    addProduct(user._id, token, formData).then(data => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: '',
          description: '',
          photo: '',
          price: '',
          quantity: '',
          loading: false,
          createProduct: data.name
        });
      }
    });
  };

  return (
    <section className='product-section'>
      <h2 className='product-title'>Add New Product</h2>

      <div className='container'>
        <form className='product-form' onSubmit={handleFormSubmit}>
          <p>
            <label>Photo</label>
            <input
              type='file'
              name='photo'
              onChange={handleChange('photo')}
              accept='image/*'
            />
          </p>
          <p>
            <label>Name</label>
            <input
              type='text'
              name='name'
              onChange={handleChange('name')}
              value={name}
            />
          </p>
          <p>
            <label>Description</label>
            <textarea
              rows='6'
              type='text'
              name='description'
              onChange={handleChange('description')}
              value={description}
            />
          </p>
          <p>
            <label>Price</label>
            <input
              type='number'
              name='price'
              onChange={handleChange('price')}
              value={price}
            />
          </p>
          <p>
            <label>Category</label>
            <select onChange={handleChange('category')}>
              <option value='5decf21179d36d381cbb7f00'>Philosophy</option>
              <option value='5decf21179d36d381cbb7f00'>Science</option>
            </select>
          </p>
          <p>
            <label>Shipping</label>
            <select onChange={handleChange('shipping')}>
              <option value='0'>No</option>
              <option value='1'>Yes</option>
            </select>
          </p>
          <p>
            <label>Quantity</label>
            <input
              type='number'
              name='quantity'
              onChange={handleChange('quantity')}
              value={quantity}
            />
          </p>
          <button type='submit'>Add Product</button>
        </form>
      </div>

      <div className='form-messages'></div>
    </section>
  );
};

export default AddProduct;
