import { API } from '../config';

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
