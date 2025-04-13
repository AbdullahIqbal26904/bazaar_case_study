// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categortController');
const authenticateStore = require('../middlewares/authMiddleware');
// POST /api/categories/createCategory - Create category
router.post('/createCategory',authenticateStore, categoryController.createCategory);

// GET /api/categories - Get all categories
router.get('/',authenticateStore, categoryController.getAllCategories);

// DELETE /api/categories/:id - Delete category by ID
router.delete('/:id',authenticateStore, categoryController.deleteCategory);

module.exports = router;
