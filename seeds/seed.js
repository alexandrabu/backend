const { sequelize } = require('../config/db');
const { User, Department, DepartmentManager } = require('../models');

const seedData = async () => {
  try {
    await sequelize.sync({ force: true }); // ⚠️ Deletes and recreates tables

    // Insert departments
    const department1 = await Department.create({ name: 'Engineering', manager_id: 1 });
    const department2 = await Department.create({ name: 'Marketing', manager_id: 2 });
    const department3 = await Department.create({ name: 'HR', manager_id: 3 });
    const department4 = await Department.create({ name: 'Sales', manager_id: 4 });

    // Insert users (employees)
    const user1 = await User.create({
      name: 'Alice',
      email: 'alice@example.com',
      department_id: department1.id,
    });
    const user2 = await User.create({
      name: 'Bob',
      email: 'bob@example.com',
      department_id: department2.id,
    });
    const user3 = await User.create({
      name: 'Charlie',
      email: 'charlie@example.com',
      department_id: department3.id,
    });
    const user4 = await User.create({
      name: 'David',
      email: 'david@example.com',
      department_id: department4.id,
    });
    const user5 = await User.create({
      name: 'Emma',
      email: 'emma@example.com',
      department_id: department1.id,
    });
    const user6 = await User.create({
      name: 'Frank',
      email: 'frank@example.com',
      department_id: department2.id,
    });

    // Insert department managers
    await DepartmentManager.create({
      user_id: user1.id,
      department_name: department1.name,
      id: user1.id,
      name: user1.name,
      email: user1.email,
      department_id: department1.id,
    });

    await DepartmentManager.create({
      user_id: user2.id,
      department_name: department2.name,
      id: user2.id,
      name: user2.name,
      email: user2.email,
      department_id: department2.id,
    });

    await DepartmentManager.create({
      user_id: user3.id,
      department_name: department3.name,
      id: user3.id,
      name: user3.name,
      email: user3.email,
      department_id: department3.id,
    });

    await DepartmentManager.create({
      user_id: user4.id,
      department_name: department4.name,
      id: user4.id,
      name: user4.name,
      email: user4.email,
      department_id: department4.id,
    });

    console.log('Database seeded successfully with more data.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await sequelize.close();
  }
};

seedData();
