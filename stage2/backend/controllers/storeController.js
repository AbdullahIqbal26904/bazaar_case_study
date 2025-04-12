const store = require('../models/Store');

// Create a new store
exports.createStore = async (req, res) => {
  try {
    const { store_name, location } = req.body;
    if (!store_name || !location) {
      return res.status(400).json({ error: 'Store name and location are required' });
    }

    const newStore = await store.create({ store_name, location });
    res.status(201).json({ message: 'Store created successfully', store: newStore });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get all stores
exports.getAllStores = async (req, res) => {
  try {
    const stores = await store.findAll({ order: [['created_at', 'DESC']] });
    res.status(200).json({
      message: 'Stores retrieved successfully',
      stores
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// DELETE a store by ID
exports.deleteStore = async (req, res) => {
  try {
    const { id } = req.params;

    const storeToDelete = await store.findByPk(id);
    if (!storeToDelete) {
      return res.status(404).json({ error: 'Store not found' });
    }

    await storeToDelete.destroy();
    res.status(200).json({ message: 'Store deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};