// router.get('/', statisticsController.getStatistics);

const { DataTypes, Op, fn, col, where, query, QueryTypes } = require('sequelize');
const db = require('../configs/database');
const _recordsModel = require('../models/records');
const _usersModel = require('../models/users');
const _booksModel = require('../models/books');

const recordsModel = _recordsModel(db, DataTypes);
const usersModel = _usersModel(db, DataTypes);
const booksModel = _booksModel(db, DataTypes);

exports.getStatistics = async (req, res) => {
    let highest_lent_books = '';
    let most_active_user = '';
    let oldest_book = '';
    let newest_book = '';
    let most_available_books = '';
    let total_users = '';
    let total_books = '';
    let total_lent_books = '';

    // all books related stats
    await booksModel.findOne({attributes: [
        [fn('max', col('available')), 'maxAvailable'],
        [fn('max', col('lent')), 'maxLent'],
        [fn('count', col('id')), 'totalCount'],
        [fn('sum', col('lent')), 'totalLent'],
        [fn('min', col('reg_date')), 'oldestRegistered'],
        [fn('max', col('reg_date')), 'newestRegistered']
    ]})
    .then(books => {
        if (books === null || books.length === 0) {
            most_available_books = 0;
        } else {
            // total_books
            total_books = books.dataValues.totalCount;

            // total_lent_books
            total_lent_books = +(books.dataValues.totalLent);

            // oldest_book
            (async () => {
                await booksModel.findOne({where: {reg_date: books.dataValues.oldestRegistered} , order: [['id', 'DESC']]})
                .then(books => {
                    if (books === null || books.length === 0) {
                        oldest_book = 0;
                    } else {
                        oldest_book = books;
                    }
                })
                .catch(err => {
                    oldest_book = { message: err.message || 'Something went wrong while getting list of books!' };
                });
            })();

            // newest_book
            (async () => {
                await booksModel.findOne({where: {reg_date: books.dataValues.newestRegistered} , order: [['id', 'DESC']]})
                .then(books => {
                    if (books === null || books.length === 0) {
                        newest_book = 0;
                    } else {
                        newest_book = books;
                    }
                })
                .catch(err => {
                    newest_book = { message: err.message || 'Something went wrong while getting list of books!' };
                });
            })();

            // highest_lent_books
            (async () => {
                await booksModel.findAll({where: {lent: books.dataValues.maxLent} , order: [['id', 'DESC']]})
                .then(books => {
                    if (books === null || books.length === 0) {
                        highest_lent_books = 0;
                    } else {
                        highest_lent_books = books;
                    }
                })
                .catch(err => {
                    highest_lent_books = { message: err.message || 'Something went wrong while getting list of books!' };
                });
            })();

            // most_available_books 
            (async () => {
                await booksModel.findAll({where: {available: books.dataValues.maxAvailable} , order: [['id', 'DESC']]})
                .then(books => {
                    if (books === null || books.length === 0) {
                        most_available_books = 0;
                    } else {
                        most_available_books = books;
                    }
                })
                .catch(err => {
                    most_available_books = { message: err.message || 'Something went wrong while getting list of books!' };
                });
            })();
        }
    })
    .catch(err => {
        most_available_books = { message: err.message || 'Something went wrong while getting list of books!' };
    });

    // total_users
    await usersModel.count()
    .then(users => {
        if (users === null || users.length === 0) {
            total_users = 0;
        } else {
            total_users = users;
        }
    })
    .catch(err => {
        total_users = { message: err.message || 'Something went wrong while getting list of users!' };
    });

    res.send({
        'stats': {
            highest_lent_books,
            most_active_user,
            oldest_book,
            newest_book,
            most_available_books,
            total_users,
            total_books,
            total_lent_books
        }
    });
};