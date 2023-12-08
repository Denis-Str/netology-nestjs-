import express from 'express';
const axios = require('axios').default;
import bodyParser from 'body-parser';
const router = express.Router();
import fileMulter = require('../../middleware/books/upload');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

import BookModel from '../../models/bookSchema';

// список всех книг
router.get('/api/books', async (req: any, res:any) => {
  try {
    const books = await BookModel.find().sort({ createdAt: -1 });
    res.render('books/index', { title: 'Books', books });
  } catch (e) {
    console.log(e);
  }
});

// создание книги
router.post('/api/books/create', urlencodedParser, async (req: any, res:any) => {
  const book = req.body
  const newBook = new BookModel(book);
  await newBook.save();
  res.status(201);
  res.redirect('/api/books');
})

// форма создания книги
router.get('/api/books/create', (req: any, res:any) => {
  res.render('books/create', { title: 'Create', book: {} });
})

// получение книги
router.get('/api/books/detailed/:id', urlencodedParser, async (req: any, res:any) => {
  const { id } = req.params;

  if (id) {
    const { title, author, description } = await BookModel.findById(id);
    const { data: { count: counter } } = await axios.post(`http://counter:3001/counter/${id}/incr`);
    res.render('books/detailed', { title: 'Detailed', book: { title, author, description, counter, id } });
  }
  else {
    res.status(404)
    res.json('404 - книга не найдена')
  }
});

router.get('/api/books/update/:id', async (req: any, res:any) => {
  const { id } = req.params;

  if (id) {
    const { title, author, description } = await BookModel.findById(id);
    res.status(201);
    res.render('books/update', { title: 'Update', book: { title, author, description } });
  } else {
    res.status(404)
    res.json('404 - книга не найдена')
  }
})
// редактирование книги
router.post('/api/books/update/:id', urlencodedParser, async (req: any, res:any) => {
  const { id } = req.params;

  if (id) {
    const { title, author, description } = req.body;
    const book = await BookModel.findByIdAndUpdate(id, { title, author, description });
    await book.save();
    res.status(201);
    res.redirect('/api/books');
  } else {
    res.status(404)
    res.json('404 - книга не найдена')
  }
});

// удаление книги
router.post('/api/books/delete/:id', async (req: any, res:any) => {
  const { id } = req.params;

  if (id) {
    await BookModel.findByIdAndDelete(id);
    res.status(201);
    res.redirect('/api/books');
  } else {
    res.status(503);
    res.json('503 | книга не удалена');
  }
});

// загрузка файла - откл
router.post('/api/books/:id/upload', fileMulter.single('book'), (req: any, res:any) => {
  const { id } = req.params;
  const bookIndex = books.findIndex(({id: bookID}) => bookID === id);

  if (req.file && bookIndex !== -1) {
    const { path } = req.file;
    books[bookIndex] = { ...books[bookIndex], fileName: req.file.filename, fileBook: path };

    res.json(books[bookIndex]);
  } else {
    res.status(503)
    res.json('503 - не удалось загрузить файл');
  }
});

// скачивание файла - откл
router.get('/api/books/:id/download', (req: any, res:any) => {
  const { id } = req.params;
  const book = books.find(({id: bookID}) => bookID === id);
  if (!book.id) res.status(404).json('404 - книга не найдена');
  res.download(`${book.fileBook}`, `${book.fileName}`, err=> {
    if (err) res.status(503).json(`Ошибка сервера - ${err}`);
  });
});

export default router;