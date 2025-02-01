
import AppError from "../../errors/AppError";
import { TUser } from "../User/user.interface";
import { UserModel } from "../User/user.model";
import httpStatus from "http-status";
import { TLoginUser } from "./auth.interface";

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
    return user;
  
}
export const AuthServices={
    registeredUserIntoDB,loginUser
 }