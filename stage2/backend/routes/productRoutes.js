const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route to create a product
router.post('/', productController.createProduct);

module.exports = router;
