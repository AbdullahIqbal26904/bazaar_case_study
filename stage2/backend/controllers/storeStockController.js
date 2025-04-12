const StoreStock = require('../models/StoreStock');


// Create a new store stock
exports.createStoreStock = async (req, res) => {
  try {
    const { store_id, product_id, quantity } = req.body;
    if (!store_id || !product_id || quantity === undefined) {
      return res.status(400).json({ error: 'Store ID, Product ID, and quantity are required' });
    }

    const newStoreStock = await StoreStock.create({ store_id, product_id, quantity });
    res.status(201).json({ message: 'Store stock created successfully', storeStock: newStoreStock });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get store stock by ID
exports.getStoreStockById = async (req, res) => {
  try {
    const { id } = req.params;

    const storeStock = await StoreStock.findByPk(id);
    if (!storeStock) {
      return res.status(404).json({ error: 'Store stock not found' });
    }

    res.status(200).json({ message: 'Store stock retrieved successfully', storeStock });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Update store stock by ID
exports.updateStoreStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const storeStock = await StoreStock.findByPk(id);
    if (!storeStock) {
      return res.status(404).json({ error: 'Store stock not found' });
    }

    storeStock.quantity = quantity;
    await storeStock.save();

    res.status(200).json({ message: 'Store stock updated successfully', storeStock });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Delete store stock by ID
exports.deleteStoreStock = async (req, res) => {
  try {
    const { id } = req.params;

    const storeStock = await StoreStock.findByPk(id);
    if (!storeStock) {
      return res.status(404).json({ error: 'Store stock not found' });
    }

    await storeStock.destroy();
    res.status(200).json({ message: 'Store stock deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
