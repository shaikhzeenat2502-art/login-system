const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Store = sequelize.define('Store', {
  name: { type: DataTypes.STRING(100), allowNull: false },
  address: { type: DataTypes.STRING(400), allowNull: false }
}, {
  timestamps: false
});

module.exports = Store;
