import express from 'express';
import { Book } from './models/book.ts';
import { Author } from './models/author.ts';
import { Review } from './models/review.model';
import { Rating } from './models/rating.model';
import { PaymentService } from './services/payment.service';

const router = express.Router();

// Books Routes
router.get('/books', async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
});

router.get('/books/:id', async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  res.json(book);
});

router.post('/books', async (req, res) => {
  const book = await Book.create(req.body);
  res.json(book);
});

// Authors Routes
router.get('/authors', async (req, res) => {
  const authors = await Author.findAll();
  res.json(authors);
});

router.get('/authors/:id', async (req, res) => {
  const author = await Author.findByPk(req.params.id);
  res.json(author);
});

// Users Routes
router.post('/register', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({ where: { username: req.body.username } });
  if (user && user.password === req.body.password) {
    res.json(user);
  } else {
    res.status(401).send('Unauthorized');
  }
});

router.get('/users/me', async (req, res) => {
  const user = await User.findByPk(req.user.id);
  res.json(user);
});

// Reviews Routes
router.get('/books/:bookId/reviews', async (req, res) => {
  const reviews = await Review.findAll({ where: { bookId: req.params.bookId } });
  res.json(reviews);
});

router.post('/books/:bookId/reviews', async (req, res) => {
  const review = await Review.create({
    ...req.body,
    bookId: req.params.bookId,
    userId: req.user.id,
  });
  res.json(review);
});

// Ratings Routes
router.get('/books/:bookId/ratings', async (req, res) => {
  const ratings = await Rating.findAll({ where: { bookId: req.params.bookId } });
  res.json(ratings);
});

router.post('/books/:bookId/ratings', async (req, res) => {
  const rating = await Rating.create({
    ...req.body,
    bookId: req.params.bookId,
    userId: req.user.id,
  });
  res.json(rating);
});

// Payments Routes
router.post('/orders', async (req, res) => {
  const { userId, bookId, amount } = req.body;
  const payment = await PaymentService.createPayment(userId, bookId, amount);
  res.json(payment);
});

router.get('/orders/:id', async (req, res) => {
  const order = await PaymentService.getOrderById(req.params.id);
  res.json(order);
});

export default router;
