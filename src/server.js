const express = require('express');
const user = require('./routes/UserRoutes');

const app = express();

app.use(express.json());
app.use(user);

app.listen(3030, function () {
    console.log('API online!');
});