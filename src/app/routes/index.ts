import { Router } from 'express';
import { AuthRoutes } from '../../modules/Auth/auth.routes';
import { carRoute } from '../../modules/Car/car.routes';
import { OrderRoute } from '../../modules/Order/order.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/car',
    route: carRoute,
  },
  {
    path: '/order',
    route: OrderRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
