import { Types } from "mongoose";

export type Torder={
    email: string;
    car: Types.ObjectId;
    quantity: number; 
    totalPrice: number;
   
}