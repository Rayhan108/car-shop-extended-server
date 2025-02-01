
import { CarModel } from "../Car/car.model";
import { Torder } from "./order.interface";
import { OrderModel } from "./order.model";
//create an order
const createOrderIntoDB = async (orderData: Torder) => {
  const order = new OrderModel(orderData);
  const car = await CarModel.findById(orderData.car);

  if (!car) {
    throw new Error("Car not found.");
    
  }
  if (car.quantity < orderData.quantity) {
    throw new Error("Insufficient Stock");
  }
  car.quantity -= orderData.quantity;

  if (car.quantity === 0) {
    car.inStock = false;
  }

  await car.save();
  
  const result = await order.save();
  return result;
};
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
};
