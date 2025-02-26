const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Department = sequelize.define(
  'Department',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    manager_id: { type: DataTypes.INTEGER, allowNull: true },
  },
  {
    tableName: 'departments',
    timestamps: false,
  },
);

module.exports = Department;
