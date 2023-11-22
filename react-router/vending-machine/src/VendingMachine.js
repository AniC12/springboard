import React from "react";
import { Link } from "react-router-dom";

function VendingMachine() {
    return (
        <div>
            <h1>Vending Machine</h1>
            <ul>
                <li><Link to="/candy">Candy</Link></li>
                <li><Link to="/water">Water</Link></li>
                <li><Link to="/stringcheese">String cheese</Link></li>
            </ul>
        </div>
    );
}

export default VendingMachine;
