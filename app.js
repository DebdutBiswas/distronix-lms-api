const express = require('express');
const bodyParser = require('body-parser');

const db = require('./configs/database');

const authMiddleware = require('./middlewares/auth');

const authRouter = require('./routes/auth');
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

// Auth route
app.use('/auth', authRouter);

// Auth middlewares
// app.use(authMiddleware);

// App routes
app.use('/users', authMiddleware, usersRouter);
app.use('/books', authMiddleware, booksRouter);
app.use('/records', authMiddleware, recordsRouter);
app.use('/payments', authMiddleware, paymentsRouter);
app.use('/statistics', authMiddleware, statisticsRouter);

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