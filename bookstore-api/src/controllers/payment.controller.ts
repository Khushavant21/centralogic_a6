import { Request, Response } from 'express';
import PaymentService from '../services/payment.service';

class PaymentController {
  static async createOrder(req: Request, res: Response) {
    try {
      const { userId, bookId, amount } = req.body;
      const payment = await PaymentService.createPayment(userId, bookId, amount);
      res.json(payment);
    } catch (error) {
      res.status(500).send('Error creating order');
    }
  }

  static async getOrderById(req: Request, res: Response) {
    try {
      const order = await PaymentService.getOrderById(req.params.id);
      res.json(order);
    } catch (error) {
      res.status(500).send('Error retrieving order');
    }
  }
}

export default PaymentController;
