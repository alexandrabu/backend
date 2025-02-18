const { sequelize } = require('../config/db');
const User = require('./User');
const Department = require('./Department');
const DepartmentManager = require('./DepartmentManager');

// Ensure all models are initialized
const initModels = async () => {
  await sequelize.sync({ force: true });
  console.log(' All models synchronized successfully.');
};

module.exports = { sequelize, User, Department, DepartmentManager, initModels };
