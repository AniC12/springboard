import React, { useState } from "react";
import { v4 as uuid } from 'uuid';
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";

function TodoList() {
    const [todos, setTodods] = useState([]);

    const addTodo = newTodo => {
        setTodods(todos => [...todos, {...newTodo, id: uuid()}]);
    };

    const removeTodo = id => {
        setTodods(todos => todos.filter(todo => todo.id !== id));
    }

    return (
        <div>
            {todos.map(todo => (
                <Todo key={todo.id}
                    id={todo.id}
                    task={todo.task}
                    removeTodo={removeTodo} />
            ))}
            <NewTodoForm addTodo={addTodo} />
        </div>
    )
}

export default TodoList;