const express = require('express');
const UserController = require('../controllers/UserController');

const routes = express.Router();

routes.get('/users/todos/:id', UserController.getTodos);
routes.post('/users', UserController.store);

module.exports = routes;