import React from 'react';
import { Navigate, Link, useParams } from 'react-router-dom';

function ColorDetails({colors}) {
    const { name } = useParams();
    const color = colors.find(c => c.name.toLowerCase() === name);
    if (!color) return <Navigate to="/colors" />;

    return (
        <div style={{ backgroundColor: color.value}}>
            <h2>{`This is ${color.name}`}</h2>
            <h3>Isn't it beautiful?</h3>
            <Link to="/colors">Go Back</Link>
        </div>
    )
}

export default ColorDetails;