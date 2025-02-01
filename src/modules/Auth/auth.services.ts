
import AppError from "../../errors/AppError";
import { TUser } from "../User/user.interface";
import { UserModel } from "../User/user.model";
import httpStatus from "http-status";
import { TLoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";
import config from "../../app/config";

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
export const AuthServices={
    registeredUserIntoDB,loginUser
 }