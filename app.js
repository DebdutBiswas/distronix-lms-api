const express = require('express');
const bodyParser = require('body-parser');

const db = require('./configs/database');

const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');
const recordsRouter = require('./routes/records');
const paymentsRouter = require('./routes/payments');
const statisticsRouter = require('./routes/statistics');

db.authenticate().then(() => {
        console.log('Database connected...');
    }).catch(err => {
        console.log('Error: ' + err);
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