import express from 'express';
import { OrderController } from './order.controller';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../app/middleware/auth';
const router = express.Router();

router.post('/', OrderController.createOrder);
router.get('/revenue', auth(USER_ROLE.admin), OrderController.getTotalRevenue);
router.get('/orders', auth(USER_ROLE.admin), OrderController.getAllOrders);

export const OrderRoute = router;
