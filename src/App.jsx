import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState(["all"]);
  const [editId, setEditId] = useState(null);

  const filterTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "important") return todo.important;
    return true;
  });

  function handleAddTodo() {
    if (input.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
      important: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setInput("");
  }

  function handleDeleteTodo(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function toggleImp(id) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, important: !todo.important } : todo,
      ),
    );
  }

  function handleEdit(id) {
    setEditId(id);
  }

  return (
    <div className="app">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Todo</h2>
        <p onClick={() => setFilter("all")}>All Tasks</p>
        <p onClick={() => setFilter("important")}>Important</p>
        <p onClick={() => setFilter("completed")}>Completed</p>
      </div>

      {/* Main Area */}
      <div className="main">
        <h2>All Tasks</h2>

        <div className="input-container">
          <input
            type="text"
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddTodo();
            }}
          />
          <button onClick={handleAddTodo} disabled={input.trim() === ""}>
            Add
          </button>
        </div>

        {todos.length === 0 ? (
          <div className="empty">
            <h3>No tasks yet</h3>
            <p>Create your first task above</p>
          </div>
        ) : (
          <ul className="todoList">
            {filterTodos.map((todo) => (
              <li key={todo.id} className="todoItem">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />

                {editId === todo.id ? (
                  <>
                    <input
                      type="text"
                      value={todo.text}
                      onChange={(e) => {
                        const newText = e.target.value;
                        setTodos((prev) =>
                          prev.map((t) =>
                            t.id === todo.id ? { ...t, text: newText } : t,
                          ),
                        );
                      }}
                    />
                    <button onClick={() => setEditId(null)}>Save</button>
                  </>
                ) : (
                  <>
                    <span className={todo.completed ? "completed" : ""}>
                      {todo.text}
                    </span>

                    <button
                      style={{ background: todo.important ? "red" : "blue" }}
                      onClick={() => toggleImp(todo.id)}
                    >
                      ⭐
                    </button>

                    <button onClick={() => handleEdit(todo.id)}>Edit</button>
                  </>
                )}

                <button onClick={() => handleDeleteTodo(todo.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
