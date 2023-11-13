import React from "react";

function Todo({id, task, removeTodo}) {
    return (
        <div>
            {task}
            <button onClick={() => removeTodo(id)}>X</button>
        </div>
    );
}

export default Todo;