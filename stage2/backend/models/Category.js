// models/Category.js
const { DataTypes } = require('sequelize');
const db = require('../config/db'); // adjust if your DB config path is different

const Category = db.define('Category', {
  category_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'Categories',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

module.exports = Category;
