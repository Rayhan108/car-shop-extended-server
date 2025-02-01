import { Router } from 'express';
import { AuthRoutes } from '../../modules/Auth/auth.routes';
import { carRoute } from '../../modules/Car/car.routes';
import { OrderRoute } from '../../modules/Order/order.routes';
import { UserRoutes } from '../../modules/User/user.routes';

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
  {
    path: '/user',
    route: UserRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
