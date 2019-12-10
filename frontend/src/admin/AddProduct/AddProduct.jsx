import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../../auth';
import { addProduct, getAllCategories } from '../adminApi';

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
    createdProduct: '',
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
    createdProduct,
    redirect,
    formData
  } = values;

  useEffect(() => {
    const init = async () => {
      const data = await getAllCategories();
      if (data) {
        setValues({ ...values, categories: data, formData: new FormData() });
      } else {
        setValues({ ...values, error: data.error });
      }
    };
    init();
  }, []);

  const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    console.log(createdProduct);

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
          createdProduct: data.name
        });
      }
    });
  };

  const showError = () => {
    if (error) {
      return <h3 className='product-error'>{error}</h3>;
    }
  };

  const showSuccess = () => {
    if (createdProduct) {
      return (
        <h3 className='product-success'>
          Product {createdProduct} was created
        </h3>
      );
    }
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
              <option>Select Category</option>
              {categories &&
                categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </p>
          <p>
            <label>Shipping</label>
            <select onChange={handleChange('shipping')}>
              <option>Select</option>
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

      <div className='form-messages'>
        {showSuccess()}
        {showError()}
      </div>
    </section>
  );
};

export default AddProduct;
