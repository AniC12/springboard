import React from "react";

function Box({ id, backgroundColor, width, height, removeBox }) {
    const style = {
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: `${backgroundColor}`
    }

    const handleRemove = () => {
        removeBox(id);
    }
    return (
        <div data-testid="box">
            <div style={style}></div>
            <button onClick={handleRemove}>X</button>
        </div>
    );
}

export default Box;