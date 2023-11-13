import React, { useState } from "react";
import { v4 as uuid } from 'uuid';

function NewBoxForm({ addBox }) {
    const [formData, setFormData] = useState({
        width: '',
        height: '',
        backgroundColor: ''
    });

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        addBox({ ...formData, id: uuid() });
        setFormData({ width: '', height: '', backgroundColor: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="width">Width:</label>
            <input 
                type="text"
                id="width"
                name="width"
                value={formData.width}
                onChange={handleChange}/>

            <label htmlFor="height">Height:</label>
            <input 
                type="text"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleChange}/>

            <label htmlFor="backgroundColor">BackgroundColor:</label>
            <input 
                type="text"
                id="backgroundColor"
                name="backgroundColor"
                value={formData.backgroundColor}
                onChange={handleChange}/>

            <button>Add a new box</button>
        </form>
    );
}

export default NewBoxForm;