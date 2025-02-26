import React, { useEffect, useState } from 'react';
import { getAllItems, createItem, deleteItem } from '../services/itemService';

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');

    useEffect(() => {
        // Read: Get all items on component mount
        getAllItems().then(setItems);
    }, []);

    const handleCreate = () => {
        createItem({ name: newItem }).then(item => {
            setItems([...items, item]);
            setNewItem('');
        });
    };

    const handleDelete = (id) => {
        deleteItem(id).then(() => {
            setItems(items.filter(item => item.id !== id));
        });
    };

    return (
        <div>
            <h1>Items</h1>
            <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="New Item"
            />
            <button onClick={handleCreate}>Create</button>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.name}
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;
