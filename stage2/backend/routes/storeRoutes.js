const router = require('express').Router();
const storeController = require('../controllers/storeController');

// POST /api/stores/createStore - Create store
router.post('/createStore', storeController.createStore);
// GET /api/stores - Get all stores
router.get('/', storeController.getAllStores);
// DELETE /api/stores/:id - Delete store by ID
router.delete('/:id', storeController.deleteStore);

module.exports = router;
