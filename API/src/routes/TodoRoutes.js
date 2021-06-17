const express = require('express');
const TodoController = require('../controllers/TodoController');

const routes = express.Router();

routes.post('/todos', TodoController.store);
routes.put('/todos/:id', TodoController.update);
routes.patch('/todos', TodoController.checkAll);
routes.delete('/todos/:id', TodoController.delete);
routes.delete('/todosCompleted', TodoController.deleteCompleted);

module.exports = routes;