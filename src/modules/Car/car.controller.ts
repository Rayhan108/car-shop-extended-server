/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";

import httpStatus from 'http-status';
import { carServices } from "./car.services";
import sendResponse from "../../app/utils/sendResponse";
import catchAsync from "../../app/utils/catchAsync";

const createCar = async (  req: Request,
  res: Response,
  next: NextFunction) => {
  try {
  
    const result = await carServices.createCarIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Car successfully Created',
        data: result,
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    next(err);
  }
};

//get all car
const getAllCarFromDB =catchAsync(async(req:Request,res:Response)=>{

        const result = await carServices.getAllCarFromDB(req.query);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Cars retrived succesfully!',
            data: result,
          });


          
    }) 

//get single car 
const getSingleCar = catchAsync(async(req:Request,res:Response)=>{

    const {carId}=req.params;
    const result = await carServices.getSingleCarFromDB(carId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Car retrived succesfully!',
        data: result,
      });

})
//update car
const updateCar = async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const {carId} = req.params;
    const newData = req.body;
    const result = await carServices.updateCarFromDB(carId,newData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Cars Updated succesfully!',
        data: result,
      });
  }catch(err:any){
next(err)
 }
}
// delete car 
const deleteCar =async (req:Request,res:Response,next:NextFunction)=>{
  try{
    const {carId} = req.params;
    const result = await carServices.deleteCarFromDB(carId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Cars Deleted succesfully!',
        data: result,
      });
  }catch(err:any){
 next(err)
 }
}


export const CarController = {
  createCar,
  getAllCarFromDB,
  getSingleCar,
  updateCar,
  deleteCar
};
