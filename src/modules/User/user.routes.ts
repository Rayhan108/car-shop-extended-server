/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import { USER_ROLE } from './user.constant';
import auth from '../../app/middleware/auth';
import validateRequest from '../../app/middleware/validateRequest';
import { changeStatusValidationSchema } from './user.validation';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post(
  '/change-status/:id',
  auth(USER_ROLE.admin),
  validateRequest(changeStatusValidationSchema),
  UserControllers.changeStatus,
);
router.get('/:userId',UserControllers.getSingleUser)

export const UserRoutes = router;
