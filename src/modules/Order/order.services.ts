
import AppError from "../../errors/AppError";
import { CarModel } from "../Car/car.model";
import { Torder } from "./order.interface";
import httpStatus from "http-status";
import { OrderModel } from "./order.model";
import catchAsync from "../../app/utils/catchAsync";
//create an order
const createOrderIntoDB = async (orderData: Torder) => {
//   const order = new OrderModel(orderData);
  const order = await OrderModel.create(orderData);
  const car = await CarModel.findById(orderData.car);

  if (!car) {
    throw new AppError(httpStatus.NOT_FOUND,"Car not found.");
    
  }
  if (car.quantity < orderData.quantity) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE,"Insufficient Stock!");
  }
  car.quantity -= orderData.quantity;

  if (car.quantity === 0) {
    car.inStock = false;
  }

  await car.save();
  
  const result = await order.save();
  return result;
};
// get all orders
const getAllOrderFromDB=async()=>{
    const result = await OrderModel.find().populate('car');
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
  getAllOrderFromDB
};
