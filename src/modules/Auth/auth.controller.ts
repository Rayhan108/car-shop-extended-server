import sendResponse from '../../app/utils/sendResponse';
import httpStatus from 'http-status';
import { AuthServices } from './auth.services';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import config from '../../app/config';
const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // console.log(req);
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
const userLogin=catchAsync(async(req,res)=>{
    const result = await AuthServices.loginUser(req.body);
    const { refreshToken, accessToken } = result;
//set refress token on cookies
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
    sendResponse(res, {
        success: true,
        message: 'User Logged in Successfully',
        statusCode: httpStatus.OK,
        data: {accessToken},
      });
})

const changePassword = catchAsync(async (req, res) => {
    const { ...passwordData } = req.body;
  
    const result = await AuthServices.changePassword(req.user, passwordData);
    
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Password is updated succesfully!',
      data: result,
    });
  });
  const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    // console.log('refreshToken',req);
    const result = await AuthServices.refreshToken(refreshToken);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Access token is retrieved succesfully!',
      data: result,
    });
  });

export const AuthControllers = {
  registerUser,userLogin,changePassword,refreshToken
};
