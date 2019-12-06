import { API } from '../config';

export const signUpUser = user => {
  return fetch(`${API}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .catch(error => console.error(error));
};

export const signInUser = user => {
  return fetch(`${API}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .catch(error => console.error(error));
};

export const authenticateUser = (data, callback) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data));
  }

  callback();
};

export const signOutUser = callback => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt');
    callback();
    return fetch(`${API}/signout`, {
      method: 'GET'
    })
      .then(response => console.log('signout', response))
      .catch(error => console.error(error));
  }
};
