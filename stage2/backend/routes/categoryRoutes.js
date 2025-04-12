// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categortController');

// POST /api/categories/createCategory - Create category
router.post('/createCategory', categoryController.createCategory);

// GET /api/categories - Get all categories
router.get('/', categoryController.getAllCategories);

// DELETE /api/categories/:id - Delete category by ID
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
