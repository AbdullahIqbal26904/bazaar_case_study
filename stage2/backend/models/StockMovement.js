const { DataTypes } = require('sequelize');
const db = require('../config/db');
const StoreStock = require('./StoreStock');

const StockMovement = db.define('StockMovement', {
  movement_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  stock_id: { type: DataTypes.INTEGER, allowNull: false },
  action_type: {
    type: DataTypes.ENUM('Stock In', 'Stock Out', 'Manual Removal'),
    allowNull: false,
  },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  action_time: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: 'Stock_Movements',
  timestamps: false,
});

StockMovement.belongsTo(StoreStock, {
  foreignKey: 'stock_id',
  onDelete: 'CASCADE',
});

module.exports = StockMovement;
