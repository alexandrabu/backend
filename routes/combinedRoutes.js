const express = require('express');
const { User, Department } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        console.log("Fetching structured combined data...");

        // Fetch all departments with their associated users
        const departments = await Department.findAll({
            include: [{
                model: User,
                as: 'users',
                attributes: ['id', 'name', 'email'],
            }],
            attributes: ['id', 'name', 'manager_id'], // Include manager_id
        });

        console.log("Sending structured combined data:", departments);
        res.status(200).json(departments);
    } catch (error) {
        console.error('Error fetching combined data:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
