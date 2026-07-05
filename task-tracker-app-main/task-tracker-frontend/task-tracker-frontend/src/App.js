import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

  /* ADD */
  const handleSubmit = async () => {
    if (!task.trim()) return;

    const res = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: task }),
    });

    const data = await res.json();
    setTasks(data);
    setTask("");
  };

  /* DELETE */
  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    setTasks(data);
  };

  /* EDIT CLICK */
  const handleEdit = (taskItem) => {
    setEditingId(taskItem.id);
    setEditText(taskItem.text);
  };

  /* SAVE */
  const handleSave = async (id) => {
    if (editText.trim() === "") return;

    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: editText }),
    });

    // instant UI update
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, text: editText } : t
      )
    );

    setEditingId(null);
  };

  return (
    <div className="container">
      <h1>Task Tracker 🚀</h1>

      <div className="input-group">
        <input
          type="text"
          placeholder="Enter task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleSubmit}>Add</button>
      </div>

      <ul>
        {tasks.length === 0 ? (
          <p className="empty">No tasks yet</p>
        ) : (
          tasks.map((t) => (
            <li key={t.id} className="task-item">
  <div className="task-left">
    {editingId === t.id ? (
      <input
        className="edit-input"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
      />
    ) : (
      <span className="task-text">{t.text}</span>
    )}
  </div>

  <div className="task-right">
    {editingId === t.id ? (
      <>
        <button className="save-btn" onClick={() => handleSave(t.id)}>
          Save
        </button>
        <button className="cancel-btn" onClick={() => setEditingId(null)}>
          Cancel
        </button>
      </>
    ) : (
      <>
        <button className="edit-btn" onClick={() => handleEdit(t)}>
          Edit
        </button>
        <button className="delete-btn" onClick={() => handleDelete(t.id)}>
          Delete
        </button>
      </>
    )}
  </div>
</li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;