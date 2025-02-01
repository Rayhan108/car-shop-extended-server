/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { OrderServices } from "./order.services";


//create an order
const createOrder =  async (req: Request, res: Response) =>{
 try{
    

    const result = await OrderServices.createOrderIntoDB(req.body);
    res.send({
        message: "Order created successfully",
        status: true,
        data: result,
      });
 }catch (err: any) {
    
    res.json({
      message: err.name || "Something went wrong",
      status: false,
      error: err,
      stack: err.stack,
    });
  }

}

//get total revenue
 const getTotalRevenue = async (req: Request, res: Response) => {
    try {
   const result = await OrderServices.getTotalReveneuFromCarModel();
      // Respond with total revenue
      res.json({
        message: "Revenue calculated successfully",
        status: true,
        data:  result ,
      });
    } catch (err: any) {
     
        res.json({
            message: err.name || "Something went wrong",
            status: false,
            error: err,
            stack: err.stack,
          });
    }
  };
export const OrderController={
    createOrder,
    getTotalRevenue
}