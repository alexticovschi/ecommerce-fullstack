import React, { useState, useEffect } from 'react';
import { getProducts } from '../../api';

const Home = () => {
  const [soldProducts, setSoldProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadSoldProducts = async () => {
    const products = await getProducts('sold');

    try {
      if (products) {
        setSoldProducts(products);
      }
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  const loadNewProducts = async () => {
    const products = await getProducts('createdAt');

    try {
      if (products) {
        setNewProducts(products);
      }
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  useEffect(() => {
    loadSoldProducts();
    loadNewProducts();
  }, []);

  console.log('SOLD PRODUCTS:', soldProducts);
  console.log('NEW PRODUCTS:', newProducts);

  return (
    <div>
      <p>{JSON.stringify(soldProducts)}</p>
      <p>{JSON.stringify(newProducts)}</p>
    </div>
  );
};

export default Home;
