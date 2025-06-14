import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/todos`);
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!text.trim()) return;
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/todos`, { text });
    setTodos([res.data, ...todos]);
    setText('');
  };

  const toggleTodo = async (id, completed) => {
    const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/todos/${id}`, {
      completed: !completed,
    });
    setTodos(todos.map(t => (t.id === id ? res.data : t)));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/todos/${id}`);
    setTodos(todos.filter(t => t.id !== id));
  };

  const startEditing = (id, currentText) => {
    setEditId(id);
    setEditText(currentText);
  };

  const saveEdit = async (id) => {
    if (!editText.trim()) return;
    const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/todos/${id}`, { text: editText });
    setTodos(todos.map(t => (t.id === id ? res.data : t)));
    setEditId(null);
    setEditText('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl">
        <h1 className="text-3xl font-semibold text-center text-indigo-600 mb-6">📝 My Todo List</h1>
        
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="form-control px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-400"
            placeholder="What do you need to do?"
          />
          <button onClick={addTodo} className="btn btn-primary shadow-sm w-full sm:w-auto">Add Task</button>
        </div>

        <ul className="space-y-4">
          {todos.map(todo => (
            <li
              key={todo.id}
              className={`rounded-xl p-4 border-l-4 bg-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                todo.completed ? 'border-green-500' : 'border-red-500'
              }`}
            >
              <div className="flex-1">
                {editId === todo.id ? (
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="form-control rounded"
                    />
                    <div className="flex gap-2">
                      <button onClick={() => saveEdit(todo.id)} className="btn btn-success btn-sm">Save</button>
                      <button onClick={() => setEditId(null)} className="btn btn-secondary btn-sm">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => toggleTodo(todo.id, todo.completed)}
                    className={`cursor-pointer text-lg ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}
                  >
                    {todo.text}
                  </div>
                )}

                <div className="mt-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-white text-sm font-medium ${
                    todo.completed ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {todo.completed ? 'Completed' : 'Uncompleted'}
                  </span>
                </div>
              </div>

              {editId !== todo.id && (
                <div className="flex gap-2">
                  <button className="btn btn-warning btn-sm" onClick={() => startEditing(todo.id, todo.text)}>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteTodo(todo.id)}>
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <p className="text-center text-gray-500 mt-6">🎉 No tasks yet. Start by adding one!</p>
        )}
      </div>
    </div>
  );
}