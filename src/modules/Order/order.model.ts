import { model, Schema } from "mongoose";
import { IOrder} from "./order.interface";

// const orderSchema = new Schema<Torder>(
//     {
//         email: {
//           type: String,
//           required: true,
//           unique:true,
//           trim: true,
//           match: [/.+@.+\..+/, "Please provide a valid email address"],
//         },
//         car: {
//           type: Schema.Types.ObjectId,
//           required: true,
//           ref: 'Car',
//         },
//         quantity: {
//           type: Number,
//           required: true,
//           min: [1, "Quantity must be at least 1"], 
//         },
//         totalPrice: {
//           type: Number,
//           required: true,
//           min: [0, "Total price must be a non-negative value"],
//         },
//       },
//       {
//         timestamps: true, 
//       }
//   );

  const orderSchema = new Schema<IOrder>(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      products: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: "Car",
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
      totalPrice: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        enum: ["Pending", "Paid", "Shipped", "Completed", "Cancelled"],
        default: "Pending",
      },
      transaction: {
        id: String,
        transactionStatus: String,
        bank_status: String,
        sp_code: String,
        sp_message: String,
        method: String,
        date_time: String,
      },
    },
    {
      timestamps: true,
    }
  );







  export const OrderModel = model<IOrder>('Order',orderSchema)