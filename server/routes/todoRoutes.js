const express = require('express');
const router = express.Router();
const model = require('../models/todoModel');

router.get('/', async (req, res) => {
  res.json(await model.getTodos());
});

router.post('/', async (req, res) => {
  const todo = await model.createTodo(req.body.text);
  res.status(201).json(todo);
});

router.put('/:id', async (req, res) => {
  const todo = await model.updateTodoStatus(req.params.id, req.body.completed);
  res.json(todo);
});

router.delete('/:id', async (req, res) => {
  await model.deleteTodo(req.params.id);
  res.sendStatus(204);
});

module.exports = router;