const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {
    const { name, description, category_id, price } = req.body;
    console.log('request came...', req.body);
    if (!name || !price) {
      return res.status(400).json({ error: 'Product name and price are required.' });
    }

    const newProduct = await Product.create({
      name,
      description,
      category_id,
      price,
    });

    res.status(201).json({
      message: 'Product created successfully.',
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
