const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Store = db.define('Store', {
  store_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  store_name: { type: DataTypes.STRING, allowNull: false, unique: true },
  location: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  hash_password: { type: DataTypes.STRING, allowNull: false },
}, {
  tableName: 'Stores',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

module.exports = Store;
