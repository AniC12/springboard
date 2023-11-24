import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function AddNewColor({ addColor }) {
    const [colorName, setColorName] = useState("");
    const [colorValue, setColorValue] = useState("#ffffff"); // Default color value
    const navigate = useNavigate();

    function handleNameChange(evt) {
        setColorName(evt.target.value);
    }

    function handleValueChange(evt) {
        setColorValue(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        addColor({ name: colorName, value: colorValue });
        navigate("/colors");
    }

    return (
        <div>
            <h1>Add color.</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="colorName">Color Name:</label>
                    <input
                        type="text"
                        name="colorName"
                        id="colorName"
                        value={colorName}
                        onChange={handleNameChange}
                        required />
                </div>
                <div>
                    <label htmlFor="colorValue">Color Value:</label>
                    <input
                        type="color"
                        name="colorValue"
                        id="colorValue"
                        value={colorValue}
                        onChange={handleValueChange} />
                </div>
                <button>Add this color</button>
            </form>
        </div>
    );
}

export default AddNewColor;
