const express = require('express');
const router = express.Router();
const storeStockController = require('../controllers/storeStockController');

// POST /api/storeStocks/createStoreStock - Create store stock
router.post('/createStoreStock', storeStockController.createStoreStock);
// GET /api/storeStocks/:id - Get store stock by ID
router.get('/:id', storeStockController.getStoreStockById);
// PUT /api/storeStocks/:id - Update store stock by ID
router.put('/:id', storeStockController.updateStoreStock);
// DELETE /api/storeStocks/:id - Delete store stock by ID
router.delete('/:id', storeStockController.deleteStoreStock);

module.exports = router;