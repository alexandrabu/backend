

const express = require('express');
const { DepartmentManager } = require('../models');

const router = express.Router();

/**
 * @swagger
 * /managers:
 *   get:
 *     summary: Get all department managers
 *     responses:
 *       200:
 *         description: A list of managers
 */
router.get('/', async (req, res) => {
    try {
        const managers = await DepartmentManager.findAll();
        res.status(200).json(managers);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /managers:
 *   post:
 *     summary: Assign a manager to a department
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - department_id
 *             properties:
 *               user_id:
 *                 type: integer
 *               department_id:
 *                 type: integer
 *               department_name:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Manager assigned successfully
 */
router.post('/', async (req, res) => {
    try {
        const manager = await DepartmentManager.create(req.body);
        res.status(201).json(manager);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

