import React from 'react';
import { Navigate, Link, useParams } from 'react-router-dom';

function DogDetails({ dogs }) {
    const { name } = useParams();
    const dog = dogs.find(d => d.name.toLowerCase() === name);
    if (!dog) return <Navigate to="/dogs" />;

    return (
        <div>
            <img src={`/${dog.src}.jpg`} alt={dog.name} />
            <h2>{dog.name}</h2>
            <h3>{dog.age} years old</h3>
            <ul>
                {dog.facts.map((fact) => (
                    <li>{fact}</li>
                ))}
            </ul>
            <Link to="/dogs">Go Back</Link>
        </div>
    )
}

export default DogDetails;