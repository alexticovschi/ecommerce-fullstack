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
