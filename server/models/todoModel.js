const pool = require('../db');

exports.getTodos = async () => {
  const res = await pool.query('SELECT * FROM todos ORDER BY id DESC');
  return res.rows;
};

exports.createTodo = async (text) => {
  const res = await pool.query('INSERT INTO todos (text, completed) VALUES ($1, false) RETURNING *', [text]);
  return res.rows[0];
};

exports.updateTodoStatus = async (id, completed) => {
  const res = await pool.query('UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *', [completed, id]);
  return res.rows[0];
};

exports.deleteTodo = async (id) => {
  await pool.query('DELETE FROM todos WHERE id = $1', [id]);
};