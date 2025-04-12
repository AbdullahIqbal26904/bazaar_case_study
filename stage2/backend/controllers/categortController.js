// controllers/categoryController.js
const Category = require('../models/Category');

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    console.log('response to aya hai bhai.');
    const { category_name } = req.body;
    if (!category_name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    const newCategory = await Category.create({ category_name });
    res.status(201).json({ message: 'Category created successfully', category: newCategory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({ order: [['created_at', 'DESC']] });
    res.status(200).json({
      message: 'Categories retrieved successfully',
      categories
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE a category by ID
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    await category.destroy();
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

