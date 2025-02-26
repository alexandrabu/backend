const express = require('express');
const { body, param, validationResult } = require('express-validator');
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
    console.error('Error fetching managers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /managers/{id}:
 *   get:
 *     summary: Get a manager by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Manager found
 *       404:
 *         description: Manager not found
 */
router.get('/:id', param('id').isInt().withMessage('ID must be an integer'), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  try {
    const manager = await DepartmentManager.findByPk(req.params.id);
    if (!manager) return res.status(404).json({ error: 'Manager not found' });
    res.status(200).json(manager);
  } catch (error) {
    console.error('Error fetching manager by ID:', error);
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
 *     responses:
 *       201:
 *         description: Manager assigned successfully
 */
router.post(
  '/',
  body('user_id').isInt().withMessage('user_id is required and must be an integer'),
  body('department_id').isInt().withMessage('department_id is required and must be an integer'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const manager = await DepartmentManager.create(req.body);
      res.status(201).json(manager);
    } catch (error) {
      console.error('Error assigning manager:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
);

/**
 * @swagger
 * /managers/{id}:
 *   delete:
 *     summary: Remove a manager from a department
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Manager removed successfully
 *       404:
 *         description: Manager not found
 */
router.delete(
  '/:id',
  param('id').isInt().withMessage('ID must be an integer'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    try {
      const manager = await DepartmentManager.findByPk(req.params.id);
      if (!manager) return res.status(404).json({ error: 'Manager not found' });
      await manager.destroy();
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting manager:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
);

module.exports = router;
