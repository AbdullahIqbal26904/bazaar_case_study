const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Store = require('../models/Store');

exports.registerStore = async (req, res) => {
  const { store_name, location, email, hash_password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(hash_password, 10);
    const newStore = await Store.create({
      store_name,
      location,
      email,
      hash_password: hashedPassword,
    });
    res.status(201).json({ message: 'Store registered successfully!', store: newStore });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.loginStore = async (req, res) => {
  const { email, hash_password } = req.body;
  try {
    const store = await Store.findOne({ where: { email } });
    if (!store) return res.status(404).json({ error: 'Store not found' });

    const valid = await bcrypt.compare(hash_password, store.hash_password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ store_id: store.store_id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
