import express from 'express';
import validateRequest from '../../app/middleware/validateRequest';
import { AuthValidation } from './auth.validations';
import { AuthControllers } from './auth.controller';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../app/middleware/auth';

const router = express.Router();

router.post(
  '/register',
  validateRequest(AuthValidation.registerUserValidationSchema),
  AuthControllers.registerUser,
);
router.post('/login',
    validateRequest(AuthValidation.loginValidationSchema),
    AuthControllers.userLogin
)
router.post('/changePassword',
    auth(
        USER_ROLE.admin,
        USER_ROLE.user,
      ),
    validateRequest(AuthValidation.changePasswordValidationSchema),
    AuthControllers.changePassword
)
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);


export const AuthRoutes = router;
