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
