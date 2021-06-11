const express = require('express');
const UserController = require('../controllers/UserController');

const routes = express.Router();

routes.get('/users/:id/todos', UserController.getTodos);
routes.post('/users', UserController.store);

module.exports = routes;