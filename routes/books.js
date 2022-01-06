const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');

router.get('/', booksController.getAllBooks);
router.post('/', booksController.addNewBook);
router.get('/:id', booksController.getBookById);
router.put('/:id', booksController.updateBookById);
router.delete('/:id', booksController.deleteBookById);

module.exports = router;