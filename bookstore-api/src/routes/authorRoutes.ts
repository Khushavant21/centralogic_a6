import { Router } from 'express';
import { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } from '../controllers/authorController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.get('/', getAllAuthors);
router.get('/:id', getAuthorById);
router.post('/', authMiddleware, createAuthor);
router.put('/:id', authMiddleware, updateAuthor);
router.delete('/:id', authMiddleware, deleteAuthor);

export default router;
