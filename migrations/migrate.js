const { sequelize, initModels } = require('../models');

const migrate = async () => {
  try {
    await initModels();
    console.log('Database migration completed successfully.');
  } catch (error) {
    console.error(' Migration error:', error);
  } finally {
    await sequelize.close();
  }
};

migrate();
