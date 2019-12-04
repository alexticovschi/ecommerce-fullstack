const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require('../models/product-model');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.getProductById = (req, res, next, id) => {
  Product.findById(id).exec((error, product) => {
    if (error || !product) {
      return res.status(400).json({
        error: 'Product not found'
      });
    }
    // make the found product available in the request
    // object with the name product
    req.product = product;
    next();
  });
};

exports.readProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.createProduct = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (error, fields, files) => {
    if (error) {
      return res.status(400).json({
        error: 'Image could not be uploaded'
      });
    }

    // check for all fields
    const { name, description, price, category, quantity, shipping } = fields;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: 'All fields are required'
      });
    }
    const product = new Product(fields);

    console.log('FIELDS:', fields);

    // 1KB = 1000
    // 1MB = 1000000
    if (files.photo) {
      //  check if the image is less than 1MB
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: 'Image should be less than 1MB in size'
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((error, result) => {
      if (error) {
        return res.status(400).json({
          error: errorHandler(error)
        });
      }

      res.json(result);
    });
  });
};

exports.updateProduct = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (error, fields, files) => {
    if (error) {
      return res.status(400).json({
        error: 'Image could not be uploaded'
      });
    }

    // check for all fields
    const { name, description, price, category, quantity, shipping } = fields;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: 'All fields are required'
      });
    }

    let product = req.product;
    product = _.extend(product, fields);

    // 1KB = 1000
    // 1MB = 1000000
    if (files.photo) {
      //  check if the image is less than 1MB
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: 'Image should be less than 1MB in size'
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((error, result) => {
      if (error) {
        return res.status(400).json({
          error: errorHandler(error)
        });
      }

      res.json(result);
    });
  });
};

exports.deleteProduct = (req, res) => {
  const product = req.product;

  product.remove((error, deletedProduct) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error)
      });
    }
    res.json({ message: 'Product deleted successfully' });
  });
};

/*** urls with query params ***/
/* by product arival date  = ./products?sortBy=createdAt&order=desc&limit=9 */
/* by products sold        = ./products?sortBy=sold&order=desc&limit=9 */
/* all products are returned if no params are sent */

exports.getAllProducts = (req, res) => {
  const order = req.query.order ? req.query.order : 'asc';
  const sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  const limit = req.query.limit ? parseInt(req.query.limit) : 9;

  Product.find()
    .select('-photo')
    .populate('category')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((error, data) => {
      if (error) {
        return res.status(400).json({
          error: 'Products not found'
        });
      }
      res.json(data);
    });
};

/* find products based on category name */

exports.getRelatedProducts = (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 6;

  // find products based on the category that matches req product category
  // and filter out the current product
  Product.find({ _id: { $ne: req.product }, category: req.product.category })
    .limit(limit)
    .populate('category', '_id name')
    .exec((error, products) => {
      if (error) {
        return res.status(400).json({
          error: 'Related products not found'
        });
      }
      res.json(products);
    });
};

exports.getAllCategories = (req, res) => {
  Product.distinct('category', {}, (error, categories) => {
    if (error) {
      return res.status(400).json({
        error: 'Categories not found'
      });
    }
    res.json(categories);
  });
};

/*** fetch product list by search ***/
/* implement product search in React Frontend */
exports.getProductsBySearch = (req, res) => {
  const order = req.body.order ? req.body.order : 'desc';
  const sortBy = req.body.sortBy ? req.body.sortBy : '_id';
  const limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log('findArgs', findArgs);

  for (let key in req.body.filters) {
    // console.log('KEY:', key);
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        // gte - greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    .select('-photo')
    .populate('category')
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((error, data) => {
      if (error) {
        return res.status(400).json({
          error: 'Products not found'
        });
      }
      res.json({
        size: data.length,
        data
      });
    });
};

exports.getProductPhoto = (req, res, next) => {
  if (req.product.photo.data) {
    res.set('Content-Type', req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};
