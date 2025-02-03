/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  _id: string;
  name: string;
  email: string;
  image?:string;
  password: string;
  passwordChangedAt?: Date;
  role: 'user' | 'admin';
  status: 'in-progress' | 'blocked';
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByEmail(email: string): Promise<TUser>;
  isUserExistsById(id: string): Promise<TUser>;
  //instance methods for checking password
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}
export type TUserRole = keyof typeof USER_ROLE;
