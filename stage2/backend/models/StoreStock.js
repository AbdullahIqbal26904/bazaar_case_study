const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Store = require('./Store');
const Product = require('./Product');

const StoreStock = db.define('StoreStock', {
  stock_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  store_id: { type: DataTypes.INTEGER, allowNull: false },
  product_id: { type: DataTypes.INTEGER, allowNull: false },
  quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
  last_updated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: 'Store_Stock',
  timestamps: false,
});

StoreStock.belongsTo(Store, {
  foreignKey: 'store_id',
  onDelete: 'CASCADE',
});

StoreStock.belongsTo(Product, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
});

module.exports = StoreStock;
