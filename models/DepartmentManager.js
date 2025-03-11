const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const DepartmentManager = sequelize.define(
  'DepartmentManager',
  {
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    department_name: { type: DataTypes.STRING, allowNull: false },
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    department_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: 'department_managers',
    timestamps: false,
  },
);

module.exports = DepartmentManager;