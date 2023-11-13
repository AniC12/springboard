import React, { useState } from "react";

function NewTodoForm({ addTodo }) {
    const [task, setTask] = useState('');

    const handleChange = (e) => {
        setTask(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo({ task });
        setTask('');
    }

    return (
        <form onSubmit={handleSubmit} data-testid="todo-form">
            <input
                type="text"
                value={task}
                onChange={handleChange}
                placeholder="Enter a new task" />
            <button>Add Todo</button>
        </form>
    );
}

export default NewTodoForm;