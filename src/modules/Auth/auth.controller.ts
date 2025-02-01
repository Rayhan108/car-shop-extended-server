import sendResponse from '../../app/utils/sendResponse';
import httpStatus from 'http-status';
import { AuthServices } from './auth.services';
import { NextFunction, Request, Response } from 'express';
const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(req);
  try {
    const result = await AuthServices.registeredUserIntoDB(req.body);

    sendResponse(res, {
      success: true,
      message: 'User registered successfully',
      statusCode: httpStatus.CREATED,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
export const AuthControllers = {
  registerUser,
};
