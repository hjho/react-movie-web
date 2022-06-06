import { useState } from "react";

export default function Todos() {
    const TODOS_KEY = "todos";
    let todoItems = JSON.parse(localStorage.getItem(TODOS_KEY));
    if(todoItems === null) {
        todoItems = [];
    }

    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState(todoItems);

    function timeString() {
        const date = new Date();
        const yyyy = String(date.getFullYear()).padStart(2, "0");
        const mm = String(date.getMonth()+1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        return ` [${yyyy}-${mm}-${dd} ${hours}:${minutes}:${seconds}] `;
    }

    function saveTodos(newTodos) {
        localStorage.setItem(TODOS_KEY, JSON.stringify(newTodos));
        setTodos(newTodos);
    }
    
    function deleteTodo(event) {
        const li = event.target.parentElement;
        let newTodos = todos;
        newTodos = newTodos.filter(toDo => toDo.id !== parseInt(li.id));

        saveTodos(newTodos);
    }
    
    function addTodo(event) {
        event.preventDefault();

        const newTodos = todos;
        newTodos.push({
            text: todo,
            id: Date.now(),
            date: timeString()
        });

        setTodo("");
        saveTodos(newTodos);
    }

    return (
        <div>
            <form id="todo-form" onSubmit={addTodo}>
                <input type="text" placeholder="Write a To Do" required value={todo} onChange={(event) => setTodo(event.target.value)}/>
            </form>
            <ul id="todo-list">
                {
                    (todos.length === 0)
                    ? null
                    : todos.map((todo, index) => (
                        <li key={todo.id} id={todo.id}>
                            <button onClick={deleteTodo}>❌</button>
                            <span>{todo.date}</span>
                            <span>{todo.text}</span>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}