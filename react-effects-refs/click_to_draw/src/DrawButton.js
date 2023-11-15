import React from "react";

function DrawButton({ onClick }) {
    return (
        <button onClick={onClick}>Draw a Card</button>
    );
}

export default DrawButton;