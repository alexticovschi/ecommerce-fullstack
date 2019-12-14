import { API } from './config';

export const getProducts = async sortBy => {
  const response = await fetch(
    `${API}/products?sortBy=${sortBy}&order=desc&limit=9`,
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
