const express = require('express');
const router = express.Router();
const { registerStore, loginStore } = require('../controllers/authController');

router.post('/register', registerStore);
router.post('/login', loginStore);

module.exports = router;
