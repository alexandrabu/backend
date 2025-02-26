import api from './api';

// Read (GET): Get all items
export const getAllItems = async () => {
    try {
        const response = await api.get('/items');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch items:', error);
        throw error;
    }
};

// Create (POST): Create a new item
export const createItem = async (newItem) => {
    try {
        const response = await api.post('/items', newItem);
        return response.data;
    } catch (error) {
        console.error('Failed to create item:', error);
        throw error;
    }
};

// Delete (DELETE): Delete an item by ID
export const deleteItem = async (id) => {
    try {
        await api.delete(`/items/${id}`);
    } catch (error) {
        console.error('Failed to delete item:', error);
        throw error;
    }
};
