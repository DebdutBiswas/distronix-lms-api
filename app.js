const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const dbConfig = require('./configs/db.config.js');

const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');
const recordsRouter = require('./routes/records');
const paymentsRouter = require('./routes/payments');
const statisticsRouter = require('./routes/statistics');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database.', err);
    process.exit();
});

const port = process.env.PORT || 3000;
const app = express();

// Mddlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Default routes
app.get('/', (req, res) => {
    res.json({"message": "Welcome to LMS API"});
});

// App routes
app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/records', recordsRouter);
app.use('/payments', paymentsRouter);
app.use('/statistics', statisticsRouter);

// Invalid routes
app.use('/*', (req, res)=>{
    return res.status(404).json({
        error : true,
        message : "404 Not found!"
    })
});

app.listen(port, () => {
    console.log(`LMS server is listening on port ${port}`);
});