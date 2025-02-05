/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { OrderServices } from "./order.services";
import sendResponse from "../../app/utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import { IUser } from "../User/user.interface";


//create an order
const createOrder =  async (req: Request, res: Response,next:NextFunction) =>{
 try{
  const user = req.user as IUser

    const result = await OrderServices.createOrderIntoDB(user, req.body, req.ip!);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Order Created succesfully!',
        data: result,
      });
 }catch (err: any) {
    
  next(err)
  }

}
// verify order 

const verifyPayment = catchAsync(async (req, res) => {
  const order = await OrderServices.verifyPayment(req.query.order_id as string);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order Created succesfully!',
    data: order,
  });
});


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
//get Single orders
const getSingleOrders=catchAsync(async(req:Request,res:Response)=>{
  const {id }= req.params;
    const result = await OrderServices.getSingleOrder(id);
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
    getTotalRevenue,getAllOrders,
    verifyPayment,
    getSingleOrders
}