import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

import catchAsync from '../utils/catchAsync';
import { TUserRole } from '../../modules/User/user.interface';
import AppError from '../../errors/AppError';
import { UserModel } from '../../modules/User/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

// console.log('auth.ts 25 line');
    // console.log('email',decoded);

    const { role, userId, iat } = decoded;
    // console.log('userID',userId);
    // checking if the user is exist
    const user = await UserModel.isUserExistsById(userId);
    // console.log('Found user:', user);
    if (!user) {
        // console.log('User not found in database!');
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }


    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized !',
      );
    }

    if (
        user.passwordChangedAt &&
        UserModel.isJWTIssuedBeforePasswordChanged(
          user.passwordChangedAt,
          iat as number,
        )
      ) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
      }

    req.user = decoded as JwtPayload & { role: string };
    next();
  });
};

export default auth;
