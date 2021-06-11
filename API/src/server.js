const express = require('express');
const user = require('./routes/UserRoutes');
const todo = require('./routes/TodoRoutes');

require('./database');

const app = express();

app.use(express.json());
app.use(user);
app.use(todo);

app.listen(3030, function () {
    console.log('API online!');
});