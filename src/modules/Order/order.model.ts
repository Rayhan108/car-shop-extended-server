import { model, Schema } from "mongoose";
import { Torder } from "./order.interface";

const orderSchema = new Schema<Torder>(
    {
        email: {
          type: String,
          required: true,
          unique:true,
          trim: true,
          match: [/.+@.+\..+/, "Please provide a valid email address"],
        },
        car: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity must be at least 1"], 
        },
        totalPrice: {
          type: Number,
          required: true,
          min: [0, "Total price must be a non-negative value"],
        },
      },
      {
        timestamps: true, 
      }
  );
  export const OrderModel = model<Torder>('Order',orderSchema)