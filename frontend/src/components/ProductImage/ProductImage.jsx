import React from 'react';
import { API } from '../../config';

const ProductImage = ({ id, url, productName }) => {
  return (
    <figure>
      <img
        src={`${API}/${url}/photo/${id}`}
        alt={productName}
        className='card__img'
      />
    </figure>
  );
};

export default ProductImage;
