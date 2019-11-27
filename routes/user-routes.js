const express = require('express');
const router = express.Router();

const { sayHi } = require('../controllers/user-controllers');

router.get('/', sayHi);

module.exports = router;
