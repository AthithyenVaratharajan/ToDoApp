import "./styles.css";
import { useState } from "react";
import { useEffect } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newToDo, setNewToDo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching Todos", error);
    }
  };

  const handleInputChange = (e) => {
    setNewToDo(e.target.value);
  };

  const handleAddTodo = () => {
    const newToDoItem = {
      id: Date.now(),
      title: newToDo,
      completed: false
    };

    setTodos([...todos, newToDoItem]);
    setNewToDo("");
  };

  const handleToggleComplete = (id) => {
    const updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        };
      }
      return todo;
    });

    setTodos(updateTodos);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };
  return (
    <div className="App">
      <h1>ToDo App</h1>
      <div className="add-todo">
        <input type="text" value={newToDo} onChange={handleInputChange} />
        <button onClick={handleAddTodo}>Add To Do</button>
      </div>
      <ul className="toDo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            <span>{todo.title}</span>
            <button onClick={() => handleToggleComplete(todo.id)}>
              {todo.completed ? "Undo" : "Completed"}
            </button>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
