import { Request, Response } from 'express';
import { Review } from '../models/review.model';

class ReviewController {
  static async getReviewsByBookId(req: Request, res: Response) {
    try {
      const reviews = await Review.findAll({ where: { bookId: req.params.bookId } });
      res.json(reviews);
    } catch (error) {
      res.status(500).send('Error retrieving reviews');
    }
  }

  static async addReview(req: Request, res: Response) {
    try {
      const review = await Review.create({
        ...req.body,
        bookId: req.params.bookId,
        userId: req.user.id,
      });
      res.json(review);
    } catch (error) {
      res.status(500).send('Error adding review');
    }
  }

  static async deleteReview(req: Request, res: Response) {
    try {
      const review = await Review.findByPk(req.params.id);
      if (review) {
        await review.destroy();
        res.sendStatus(204);
      } else {
        res.status(404).send('Review not found');
      }
    } catch (error) {
      res.status(500).send('Error deleting review');
    }
  }
}

export default ReviewController;
