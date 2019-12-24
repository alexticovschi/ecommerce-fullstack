import { API } from './config';
import queryString from 'query-string';

export const getProductById = productId => {
  return fetch(`${API}/product/${productId}`, {
    method: 'GET'
  })
    .then(response => response.json())
    .catch(error => console.error(error));
};

export const getProducts = async sortBy => {
  const response = await fetch(
    `${API}/products?sortBy=${sortBy}&order=desc&limit=12`,
    {
      method: 'GET'
    }
  );

  const products = await response.json();

  try {
    if (products) return products;
  } catch (error) {
    console.error(error);
  }
};

export const getAllCategories = async () => {
  const response = await fetch(`${API}/categories`, {
    method: 'GET'
  });

  const categories = await response.json();

  try {
    if (categories) return categories;
  } catch (error) {
    console.error(error);
  }
};

// make a POST request to get data based on skip, limit and filters
export const getFilteredProducts = async (skip, limit, filters = {}) => {
  const response = await fetch(`${API}/products/search`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ skip, limit, filters })
  });

  const data = await response.json();

  try {
    if (data) {
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const list = async params => {
  const query = queryString.stringify(params);

  const response = await fetch(`${API}/products/search?${query}`, {
    method: 'GET'
  });

  const data = await response.json();

  try {
    if (data) return data;
  } catch (error) {
    console.error(error);
  }
};
