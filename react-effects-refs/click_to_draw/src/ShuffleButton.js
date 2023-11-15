import React from "react";

function ShuffleButton({ onClick, disabled }) {
    return (
        <button onClick={onClick} disabled={disabled}>
            Shuffle Deck
        </button>);
}

export default ShuffleButton;