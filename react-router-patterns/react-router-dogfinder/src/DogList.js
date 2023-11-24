import React from "react";
import { Link } from "react-router-dom";

function DogList({ dogs }) {
    return (
        <div>
            {dogs.map(dog => (
                <div key={dog.name}>
                    <Link to={`/dogs/${dog.name.toLowerCase()}`}>{dog.name}</Link>
                </div>
            ))}
        </div>
    )
}

export default DogList;