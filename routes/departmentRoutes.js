
const express = require('express');
const { body, param, validationResult } = require('express-validator');
const { Department } = require('../models');

const router = express.Router();

/**
 * @swagger
 * /departments:
 *   get:
 *     summary: Get all departments
 *     responses:
 *       200:
 *         description: A list of departments
 */
router.get('/', async (req, res) => {
    try {
        const departments = await Department.findAll();
        res.status(200).json(departments);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /departments:
 *   post:
 *     summary: Create a new department
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - manager_id
 *             properties:
 *               name:
 *                 type: string
 *               manager_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Department created successfully
 */
router.post('/', async (req, res) => {
    try {
        const department = await Department.create(req.body);
        res.status(201).json(department);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /departments/{id}:
 *   get:
 *     summary: Get a department by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The department ID
 *     responses:
 *       200:
 *         description: Returns the department details
 *       404:
 *         description: Department not found
 */
router.get('/:id', async (req, res) => {
    try {
        const department = await Department.findByPk(req.params.id);

        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }

        res.status(200).json(department);
    } catch (error) {
        console.error(' Error fetching department:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
