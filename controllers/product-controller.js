const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require('../models/product-model');
const { errorHandler } = require('../helpers/dbErrorHandler');

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
