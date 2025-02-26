const express = require('express');
const router = express.Router();

// Read (GET): Get all items
router.get('/', (req, res) => {
    res.json([{ id: 1, name: 'Sample Item' }]);
});

// Create (POST): Create a new item
router.post('/', (req, res) => {
    const newItem = req.body;
    res.status(201).json({ message: 'Item created', item: newItem });
});

// Delete (DELETE): Delete an item by ID
router.delete('/:id', (req, res) => {
    const itemId = req.params.id;
    res.status(200).json({ message: `Item ${itemId} deleted` });
});

module.exports = router;
