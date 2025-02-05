import express from 'express';
import { OrderController } from './order.controller';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../app/middleware/auth';
const router = express.Router();

// router.post('/', OrderController.createOrder);
router.post('/',auth(USER_ROLE.user), OrderController.createOrder)
//   router.get(auth(UserRole.user), orderController.getOrders);
router.get('/orders', auth(USER_ROLE.admin), OrderController.getAllOrders);
router.get('/revenue', auth(USER_ROLE.admin), OrderController.getTotalRevenue);
router.get("/verify", auth(USER_ROLE.user), OrderController.verifyPayment);
router.get("/:id", auth(USER_ROLE.user), OrderController.getSingleOrders);
export const OrderRoute = router;
