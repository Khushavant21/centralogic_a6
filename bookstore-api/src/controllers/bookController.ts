import { Request, Response } from 'express';
import Book from '../models/book';
import Author from '../models/author';
import axios from 'axios';

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.findAll({ include: Author });
    res.status(200).json(books);
  } catch (error: any) { // Define the type of 'error' as 'any'
    res.status(500).json({ error: error.message });
  }
};

const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByPk(req.params.id, { include: Author });
    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.status(200).json(book);
  } catch (error: any) { // Define the type of 'error' as 'any'
    res.status(500).json({ error: error.message });
  }
};

const createBook = async (req: Request, res: Response) => {
  const { bookCode, title, description, publishedYear, price, authors, externalId } = req.body;

  try {
    const book = await Book.create({ bookCode, title, description, publishedYear, price, externalId });
    if (authors && authors.length > 0) {
     //await book.setAuthors(authors);
    }
    res.status(201).json(book);
  } catch (error: any) { // Define the type of 'error' as 'any'
    res.status(500).json({ error: error.message });
  }
};

const updateBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    await book.update(req.body);
    
    // Check if authors are provided in the request body
    if (req.body.authors) {
      // Assuming you have an association named 'Authors' on your Book model
      //await book.setAuthors(req.body.authors);
    }

    res.status(200).json(book);
  } catch (error: any) { // Define the type of 'error' as 'any'
    res.status(500).json({ error: error.message });
  }
};

const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    await book.destroy();
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error: any) { // Define the type of 'error' as 'any'
    res.status(500).json({ error: error.message });
  }
};
  
export { getAllBooks, getBookById, createBook, updateBook, deleteBook };
