import { API } from '../config';

export const addProduct = async (userId, token, product) => {
  const response = await fetch(`${API}/product/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: product
  });

  const data = response.json();

  try {
    if (data) return data;
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

export const createCategory = async (userId, token, category) => {
  const response = await fetch(`${API}/category/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
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
