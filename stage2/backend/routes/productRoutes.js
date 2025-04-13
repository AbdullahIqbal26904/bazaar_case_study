const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenticateStore = require('../middlewares/authMiddleware');
// Route to create a product
router.post('/',authenticateStore, productController.createProduct);

// Route to get all products
router.get('/',authenticateStore, productController.getAllProducts);

module.exports = router;
