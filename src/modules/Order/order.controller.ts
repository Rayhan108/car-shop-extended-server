/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { OrderServices } from "./order.services";
import sendResponse from "../../app/utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";

//create an order
const createOrder =  async (req: Request, res: Response,next:NextFunction) =>{
 try{
    

    const result = await OrderServices.createOrderIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order Created succesfully!',
        data: result,
      });
 }catch (err: any) {
    
  next(err)
  }

}
//get all orders
const getAllOrders=catchAsync(async(req:Request,res:Response)=>{
    const result = await OrderServices.getAllOrderFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order are retrived succesfully!',
        data: result,
      });
})
//get total revenue
 const getTotalRevenue = catchAsync(async (req: Request, res: Response) => {

    const result = await OrderServices.getTotalReveneuFromCarModel();
       // Respond with total revenue
       sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Revenue Generated succesfully!',
        data: result,
      });
 
   })
export const OrderController={
    createOrder,
    getTotalRevenue,getAllOrders
}