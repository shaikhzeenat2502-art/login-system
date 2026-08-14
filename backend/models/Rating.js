const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const Store = require('./Store');

const Rating = sequelize.define('Rating', {
  rating: { type: DataTypes.INTEGER, allowNull: false }
}, {
  timestamps: false
});

User.hasMany(Rating);
Store.hasMany(Rating);
Rating.belongsTo(User);
Rating.belongsTo(Store);

module.exports = Rating;