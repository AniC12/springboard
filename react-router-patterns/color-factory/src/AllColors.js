import React from "react";
import { Link } from "react-router-dom";

function AllColors({ colors }) {
    return (
        <div>
            <h2>Please select a color.</h2>
            <Link to="/colors/new">
                <button>Add New Color</button>
            </Link>
            <div>
                {colors.map(color => (
                    <h3>
                        <Link to={`/colors/${color.name}`}>{color.name}</Link>
                    </h3>
                ))}
            </div>
        </div>
    );
}

export default AllColors;