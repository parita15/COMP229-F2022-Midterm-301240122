// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const books = require('../models/books');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find((err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      console.log("====get else")
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });
});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  console.log("===Display add function called")
  res.render('books/details', { title: 'Add Book' })

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  console.log("====processAddPage")
  let newBook = book({
    "Title": req.body.title,
    "Description": req.body.description,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
  });
  console.log("=====add contact===", req.body)
  book.create(newBook, (err, Book) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      // refresh the book list
      res.redirect('/books');
      console.log("====else section")
    }
  });

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

  let id = req.params.id;
  console.log("=====id", req.params)
  book.findById(id, (err, bookToEdit) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      //show the edit view
      console.log("====book edit", bookToEdit)
      res.render('books/editDetails', { title: 'Edit Book', books: bookToEdit })
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
  let id = req.params.id

  let updatedBook = book({
    "_id": id,
    "Title": req.body.title,
    "Description": req.body.description,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
  });
  console.log("===updated contact list====", updatedBook)
  book.updateOne({ _id: id }, updatedBook, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      // refresh the book list
      console.log("====update edit record", updatedBook)
      res.redirect('/books');
    }
  });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  let id = req.params.id;

  book.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      // refresh the book list
      res.redirect('/books');
    }
  });
});


module.exports = router;
