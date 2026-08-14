const { DataTypes } = require('sequelize');
const sequelize = require('../db');   // 👈 ye db.js se aa raha hai

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING(60), allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  address: { type: DataTypes.STRING(400) },
  password: { type: DataTypes.STRING(255), allowNull: false },
  role: { type: DataTypes.ENUM('Admin', 'Normal User', 'Store Owner'), allowNull: false }
}, {
  timestamps: false
});

module.exports = User;
