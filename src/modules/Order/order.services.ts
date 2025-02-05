
import AppError from "../../errors/AppError";
import { CarModel } from "../Car/car.model";

import httpStatus from "http-status";
import { OrderModel } from "./order.model";
import { IUser } from "../User/user.interface";
import { orderUtils } from "./order.utils";
import { UserModel } from "../User/user.model";

//create an order

const createOrderIntoDB = async (
  user: IUser,
  payload: { products: { product: string; quantity: number }[] },
  client_ip: string
) => {
  if (!payload?.products?.length)
    throw new AppError(httpStatus.NOT_ACCEPTABLE, "Order is not specified");

  const products = payload.products;

  let totalPrice = 0;
  const productDetails = await Promise.all(
    products.map(async (item) => {
      const product = await CarModel.findById(item.product);
      if (product?.quantity === 0 ) {
        throw new AppError(httpStatus.NOT_ACCEPTABLE,"Insufficient Stock!");
      }
  
      if (product) {
        const subtotal = product ? (product.price || 0) * item.quantity : 0;
        totalPrice += subtotal;
        product.quantity -= item.quantity;
        await product.save();
        return item;
      }
    })
  );
  const userData = await UserModel.findById(user.userId);


  let order = await OrderModel.create({
    user,
    products: productDetails,
    totalPrice,
  });

  // payment integration
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: "BDT",
    customer_name: userData?.name || 'N/A',
    customer_address: user.address || 'N/A',
    customer_email: userData?.email || 'N/A',
    customer_phone: user.phone || 'N/A',
    customer_city: user.city || 'N/A',
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;
};

// verify order 

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await OrderModel.findOneAndUpdate(
      {
        "transaction.id": order_id,
      },
      {
        "transaction.bank_status": verifiedPayment[0].bank_status,
        "transaction.sp_code": verifiedPayment[0].sp_code,
        "transaction.sp_message": verifiedPayment[0].sp_message,
        "transaction.transactionStatus": verifiedPayment[0].transaction_status,
        "transaction.method": verifiedPayment[0].method,
        "transaction.date_time": verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == "Success"
            ? "Paid"
            : verifiedPayment[0].bank_status == "Failed"
            ? "Pending"
            : verifiedPayment[0].bank_status == "Cancel"
            ? "Cancelled"
            : "",
      }
    );
  }

  return verifiedPayment;
};


// get all orders
const getAllOrderFromDB=async()=>{
    const result = await OrderModel.find();
    return result;
}
//get total revenue
const getTotalReveneuFromCarModel = async () => {
  const revenueResult = await OrderModel.aggregate([
    {
      $lookup: {
        from: "cars",
        localField: "car",
        foreignField: "_id",
        as: "carDetails",
      },
    },

    {
      $unwind: "$carDetails",
    },

    {
      $project: {
        revenue: {
          $multiply: ["$quantity", "$carDetails.price"],
        },
      },
    },

    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$revenue" },
      },
    },
  ]);

  const totalRevenue =revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;
  return totalRevenue;
};
export const OrderServices = {
  createOrderIntoDB,
  getTotalReveneuFromCarModel,
  getAllOrderFromDB,
  verifyPayment
};
