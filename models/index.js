const { sequelize } = require('../config/db');
const User = require('./User');
const Department = require('./Department');
const DepartmentManager = require('./DepartmentManager');


User.belongsTo(Department, { foreignKey: 'department_id', as: 'department' });
Department.hasMany(User, { foreignKey: 'department_id', as: 'users' });

DepartmentManager.belongsTo(User, { foreignKey: 'user_id', as: 'manager' });
DepartmentManager.belongsTo(Department, { foreignKey: 'department_id', as: 'department' });

const initModels = async () => {
    await sequelize.sync();
    console.log(' All models synchronized successfully.');
};

module.exports = { sequelize, User, Department, DepartmentManager, initModels };
