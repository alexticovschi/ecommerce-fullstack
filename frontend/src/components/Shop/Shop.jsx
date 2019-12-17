import React, { useState, useEffect } from 'react';
import { getAllCategories, getFilteredProducts } from '../../api';
import Checkbox from '../Checkbox/Checkbox';
import RadioBox from '../RadioBox/RadioBox';
import Card from '../Card/Card';

import { prices } from '../../fixedPrices';
import './shop.scss';

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] }
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredData, setFilteredData] = useState([]);

  const init = async () => {
    const data = await getAllCategories();
    try {
      if (data) {
        setCategories(data);
      }
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  useEffect(() => {
    init();
    loadFilteredData(skip, limit, myFilters.filters);
  }, []);

  // loop through prices and return the price range array ...
  // that has an id equal to input value
  const handlePrice = value => {
    const pricesArray = prices;
    let priceRange = [];

    for (let key in pricesArray) {
      if (pricesArray[key]._id === parseInt(value)) {
        priceRange = pricesArray[key].array;
      }
    }

    return priceRange;
  };

  const loadFilteredData = async newFilters => {
    const response = await getFilteredProducts(skip, limit, newFilters);

    try {
      if (response) {
        setFilteredData(response.data);
        setSize(response.size);
        setSkip(0);
      }
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    // 1# check if we filter by price
    if (filterBy === 'price') {
      // 2# store the return value of handlePrice function
      const priceRange = handlePrice(filters);

      // 3# add price range to newFilters array
      newFilters.filters[filterBy] = priceRange;
    }

    loadFilteredData(myFilters.filters);
    // set state with new filter values
    setMyFilters(newFilters);
  };

  const loadMore = async () => {
    let toSkip = skip + limit;
    const response = await getFilteredProducts(
      toSkip,
      limit,
      myFilters.filters
    );

    try {
      if (response) {
        setFilteredData([...filteredData, ...response.data]);
        setSize(response.size);
        setSkip(toSkip);
      }
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };
  return (
    <div className='container'>
      <div className='shop'>
        <aside className='sidebar'>
          <h2 className='title'>Filter by</h2>
          <div className='categories'>
            <h3>Categories</h3>
            <ul>
              <Checkbox
                categories={categories}
                handleFilters={filters => handleFilters(filters, 'category')}
              />
            </ul>
          </div>

          <div className='prices'>
            <h3>Prices</h3>
            <div>
              <RadioBox
                prices={prices}
                handleFilters={filters => handleFilters(filters, 'price')}
              />
            </div>
          </div>
        </aside>
        <section className='shop-section'>
          {filteredData &&
            filteredData.map(product => (
              <Card
                id={product._id}
                key={product._id}
                productName={product.name}
                price={product.price}
              />
            ))}
          {size > 0 && size >= limit && (
            <button onClick={loadMore} className='btn shop__btn'>
              Load more
            </button>
          )}
        </section>
      </div>
    </div>
  );
};

export default Shop;
