
import AppError from "../../errors/AppError";
import { TUser } from "../User/user.interface";
import { UserModel } from "../User/user.model";
import httpStatus from "http-status";

const registeredUserIntoDB=async(payload:TUser)=>{
    console.log(payload);
    const user = await UserModel.isUserExistsByEmail(payload.email);
    console.log(user);
    if(user){
        throw new AppError(httpStatus.CONFLICT, 'This user is already exists!')
    }
   const result = await UserModel.create(payload);
   return result;

}
export const AuthServices={
    registeredUserIntoDB
 }