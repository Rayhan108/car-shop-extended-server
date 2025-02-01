import express from 'express';
import validateRequest from '../../app/middleware/validateRequest';
import { AuthValidation } from './auth.validations';
import { AuthControllers } from './auth.controller';

const router = express.Router();

router.post(
  '/register',
  validateRequest(AuthValidation.registerUserValidationSchema),
  AuthControllers.registerUser,
);


export const AuthRoutes = router;
