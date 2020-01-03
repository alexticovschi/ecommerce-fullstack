export const addItem = item => {
  let cart = [];
  // access the local storage
  if (typeof window !== undefined) {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    // add items to cart
    cart.push({
      ...item,
      count: 1
    });

    // remove duplicate from cart array
    // build an object with unique values using new Set and turn it into an array
    // map over it and pass the ids of each object/product
    // prevent adding the same object to local storage
    // var data = new Set(cart.map(p => p._id));
    // console.log(data);
    cart = Array.from(new Set(cart.map(p => p._id))).map(id => {
      return cart.find(p => p._id === id);
    });

    localStorage.setItem('cart', JSON.stringify(cart));
  }
};

export const totalItems = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem('cart')) {
      return JSON.parse(localStorage.getItem('cart')).length;
    }
  }
};

export const getCartItems = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem('cart')) {
      return JSON.parse(localStorage.getItem('cart'));
    }
  }

  return [];
};

export const updateProductQuantity = (productId, count) => {
  let cart = [];

  if (typeof window !== undefined) {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }

    cart.map((product, index) => {
      if (product._id === productId) {
        cart[index].count = count;
      }
    });

    localStorage.setItem('cart', JSON.stringify(cart));
  }
};

export const removeProduct = productId => {
  let cart = [];

  if (typeof window !== undefined) {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }

    cart.map((product, index) => {
      if (product._id === productId) {
        cart.splice(index, 1);
      }
    });

    localStorage.setItem('cart', JSON.stringify(cart));
  }

  return cart;
};

export const emptyCart = next => {
  if (typeof window !== undefined) {
    localStorage.removeItem('cart');
    next();
  }
};
