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
    console.error('Error fetching departments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /departments/{id}:
 *   get:
 *     summary: Get a department by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Department found
 *       404:
 *         description: Department not found
 */
router.get('/:id', async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id);
    if (!department) return res.status(404).json({ error: 'Department not found' });
    res.status(200).json(department);
  } catch (error) {
    console.error('Error fetching department:', error);
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
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Department created successfully
 */
router.post('/', async (req, res) => {
  const { name, manager_id } = req.body;

  // Check for required fields
  if (!name || !manager_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const department = await Department.create(req.body);
    res.status(201).json(department);
  } catch (error) {
    console.error('Error creating department:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /departments/{id}:
 *   put:
 *     summary: Update a department by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Department updated successfully
 *       404:
 *         description: Department not found
 */
router.put('/:id', async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id);
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }

    await department.update(req.body);

    // Return the updated department
    res.status(200).json(department);
  } catch (error) {
    console.error('Error updating department:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /departments/{id}:
 *   delete:
 *     summary: Delete a department by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Department deleted successfully
 *       404:
 *         description: Department not found
 */
router.delete('/:id', async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id);
    if (!department) return res.status(404).json({ error: 'Department not found' });

    await department.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting department:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
