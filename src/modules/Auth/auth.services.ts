
import AppError from "../../errors/AppError";
import { TUser } from "../User/user.interface";
import { UserModel } from "../User/user.model";
import httpStatus from "http-status";
import { TLoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";
import config from "../../app/config";
import { JwtPayload } from "jsonwebtoken";
import bcrypt from 'bcrypt';
const registeredUserIntoDB=async(payload:TUser)=>{
    console.log(payload);
    const user = await UserModel.isUserExistsByEmail(payload.email);
    // console.log(user);
    if(user){
        throw new AppError(httpStatus.CONFLICT, 'This user is already exists!')
    }
   const result = await UserModel.create(payload);
   return result;

}

const loginUser  = async(payload:TLoginUser)=>{
    const user = await UserModel.isUserExistsByEmail(payload.email);
    // console.log('login user',user);
    if(!user){
        throw new AppError(httpStatus.NOT_FOUND,'This user is not found!')
    }
    if(!(await UserModel.isPasswordMatched(payload?.password,user?.password))){
        throw new AppError(httpStatus.UNAUTHORIZED,'Invalid Credentials!');
    }
const jwtPayload = {
    userId:user?._id,
    role:user?.role,
}

const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
)
const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

    return {
        accessToken,
        refreshToken,
    };
  
}

const changePassword = async (
    userData: JwtPayload,
    payload: { oldPassword: string; newPassword: string },
  ) => {
    // checking if the user is exist
    const user = await UserModel.isUserExistsById(userData.userId);
//   console.log('change pass user',user);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
 
 
  
    //checking if the password is correct
  
    if (!(await UserModel.isPasswordMatched(payload.oldPassword, user?.password)))
      throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  
    //hash new password
    const newHashedPassword = await bcrypt.hash(
      payload.newPassword,
      Number(config.bcrypt_salt_rounds),
    );
//   console.log('user data chnge pass 78 line',userData);
   await UserModel.findOneAndUpdate(
      {
        _id: userData.userId,
        role: userData.role,
      },
      {
        password: newHashedPassword,
        passwordChangedAt: new Date(),
      },
    );
//   console.log('pass change 89 line',result);
    return null;
  };

export const AuthServices={
    registeredUserIntoDB,loginUser,changePassword
 }