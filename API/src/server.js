const express = require('express');
const user = require('./routes/UserRoutes');
const todo = require('./routes/TodoRoutes');
const cors = require('cors');

require('./database');

const app = express();


app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE,PATCH');
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    app.use(cors());
    next();
});

app.use(user);
app.use(todo);

app.listen(3030, function () {
    console.log('API online!');
});