import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser{
    _id:string;
    name:string;
    email:string;
    password:string;
    role:'user'|'admin';
    createdAt: Date;
    updatedAt: Date;
}

export interface User extends Model<TUser>{
    //instance methods for checking if the user exist
    isUserExistsByEmail(email:string):Promise<TUser>
    //instance methods for checking password
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

}
export type TUserRole = keyof typeof USER_ROLE;