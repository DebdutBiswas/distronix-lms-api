// router.get('/', booksController.getAllBooks);
// router.post('/', booksController.addNewBook);
// router.get('/:id', booksController.getBookById);
// router.put('/:id', booksController.updateBookById);
// router.delete('/:id', booksController.deleteBookById);

const { DataTypes, Op } = require('sequelize');
const db = require('../configs/database');
const _booksModel = require('../models/books');

const booksModel = _booksModel(db, DataTypes);

exports.getAllBooks = async (req, res) => {
    await booksModel.findAll({order: [['id', 'DESC']]})
    .then(books => {
        if (books === null || books.length === 0) {
            res.status(500).send({
                message: 'No books exist!'
            });
        } else {
            res.send({'data': books});
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong while getting list of books!'
        });
    });
};

exports.addNewBook = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Please fill all required field'
        });
    }

    await booksModel.create({
        isbn: req.body.isbn,
        name: req.body.name,
        author: req.body.author,
        publisher: req.body.publisher,
        available: req.body.available,
        lent: req.body.lent,
        active: req.body.active,
        subject: req.body.subject
    }, { fields: ['isbn', 'name', 'author', 'publisher', 'available', 'lent', 'active', 'subject'] })
    .then(async queryResult => {
        await booksModel.findOne({where: {id: queryResult.id}})
        .then(book => {
            if (book !== null) res.send({'data': book});
            else {
                res.status(500).send({
                    message: 'The book does not exist!'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Something went wrong while getting the newly created book!'
            });
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong while creating new book!'
        });
    });
};

exports.getBookById = async (req, res) => {
    await booksModel.findOne({where: {id: req.params.id}})
    .then(book => {
        if (book !== null) res.send({'data': book});
        else {
            res.status(500).send({
                message: 'The book does not exist!'
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong while getting the book!'
        });
    });
};

exports.updateBookById = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Please fill all required field'
        });
    }

    await booksModel.update({
        isbn: req.body.isbn,
        name: req.body.name,
        author: req.body.author,
        publisher: req.body.publisher,
        available: req.body.available,
        lent: req.body.lent,
        active: req.body.active,
        subject: req.body.subject
    }, {where: {id: req.params.id}}, { fields: ['isbn', 'name', 'author', 'publisher', 'available', 'lent', 'active', 'subject'] })
    .then(async queryResult => {
        [ updateResult ] = queryResult;
        await booksModel.findOne({where: {id: req.params.id}})
        .then(book => {
            if (book !== null) res.send({'data': {...book.dataValues, 'updated': updateResult}});
            else {
                res.status(500).send({
                    message: 'The book does not exist!'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Something went wrong while getting the updated book!'
            });
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong while updating the book!'
        });
    });
};

exports.deleteBookById = async (req, res) => {
    await booksModel.findOne({where: {id: req.params.id}})
    .then(async book => {
        await booksModel.destroy({where: {id: req.params.id}})
        .then(async queryResult => {
            if (queryResult) res.send({'data': {...book.dataValues, 'deleted': queryResult}});
            else {
                res.status(500).send({
                    message: 'The book does not exist!'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Something went wrong while deleting the book!'
            });
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong while getting the deleted book!'
        });
    });
};