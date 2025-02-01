import { Model } from "mongoose";

export interface TUser{
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