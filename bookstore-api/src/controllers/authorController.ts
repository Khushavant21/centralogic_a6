import { Request, Response } from 'express';
import Author from '../models/author';

const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await Author.findAll();
    res.status(200).json(authors);
  } catch (error: any) { // Define the type of 'error' as 'any'
    res.status(500).json({ error: error.message });
  }
};

const getAuthorById = async (req: Request, res: Response) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (!author) return res.status(404).json({ message: 'Author not found' });

    res.status(200).json(author);
  } catch (error: any) { // Define the type of 'error' as 'any'
    res.status(500).json({ error: error.message });
  }
};

const createAuthor = async (req: Request, res: Response) => {
  const { name, bio, birthdate, isSystemUser } = req.body;

  try {
    const author = await Author.create({ name, bio, birthdate, isSystemUser });
    res.status(201).json(author);
  } catch (error: any) { // Define the type of 'error' as 'any'
    res.status(500).json({ error: error.message });
  }
};

const updateAuthor = async (req: Request, res: Response) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (!author) return res.status(404).json({ message: 'Author not found' });

    await author.update(req.body);
    res.status(200).json(author);
  } catch (error: any) { // Define the type of 'error' as 'any'
    res.status(500).json({ error: error.message });
  }
};

const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (!author) return res.status(404).json({ message: 'Author not found' });

    await author.destroy();
    res.status(200).json({ message: 'Author deleted successfully' });
  } catch (error: any) { // Define the type of 'error' as 'any'
    res.status(500).json({ error: error.message });
  }
};

export { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor };
