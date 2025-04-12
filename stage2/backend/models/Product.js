const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Category = require('./Category');

const Product = sequelize.define('Product', {
  product_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT,
  category_id: { type: DataTypes.INTEGER },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
}, {
  tableName: 'Products',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'SET NULL',
});

module.exports = Product;
