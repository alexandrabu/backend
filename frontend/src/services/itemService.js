import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from './api';


// Read
export const getAllItems = async () => {
    try {
        // Temporarily force an error to check if toast is working
        throw new Error('Forced Error for Testing');
    } catch (error) {
        console.error('Failed to fetch items:', error.message);
        toast.error('Failed to fetch items. Please try again.');
        throw error;
    }
};


// Create 
export const createItem = async (newItem) => {
    try {
        const response = await api.post('/items', newItem);
        toast.success('Item created successfully!');
        return response.data;
    } catch (error) {
        console.error('Failed to create item:', error);
        toast.error('Failed to create item. Please try again.');
        throw error;
    }
};

// Delete 
export const deleteItem = async (id) => {
    try {
        await api.delete(`/items/${id}`);
        toast.success('Item deleted successfully!');
    } catch (error) {
        console.error('Failed to delete item:', error);
        toast.error('Failed to delete item. Please try again.');
        throw error;
    }
};
