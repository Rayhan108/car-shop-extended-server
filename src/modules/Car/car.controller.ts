/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import carValidationSchema from "./car.validation";
import { carServices } from "./car.services";

const createCar = async (req: Request, res: Response) => {
  try {
    

    const zodparsedData = carValidationSchema.parse(req.body);
    const result = await carServices.createCarIntoDB(zodparsedData);
    res.send({
      message: "Car created successfully",
      status: true,
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.json({
      message: err.name || "Something went wrong",
      status: false,
      error: err,
      stack: err.stack,
    });
  }
};

//get all car
const getAllCar = async(req:Request,res:Response)=>{
try{
    const result = await carServices.getAllCarFromDB();
res.status(200).json({
    message:"Cars retrived succesfully",
    status:true,
    data:result
})
}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (err: any) {
        res.json({
          message: err.name || "Something went wrong",
          status: false,
          error: err,
          stack: err.stack,
        });
      }
}

//get single car 
const getSingleCar = async(req:Request,res:Response)=>{
 try{
    const {carId}=req.params;
    const result = await carServices.getSingleCarFromDB(carId);
    res.status(200).json({
        message:"Car is retrived succesfully",
        status:true,
        data:result
    })
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 }catch(err:any){
    res.json({
        message: err.name || "Something went wrong",
        status: false,
        error: err,
        stack: err.stack,
      });
 }
}
//update car
const updateCar = async(req:Request,res:Response)=>{
  try{
    const {carId} = req.params;
    const newData = req.body;
    const result = await carServices.updateCarFromDB(carId,newData);
    res.status(200).json({
      message:"Car is updated succesfully",
      status:true,
      data:result 
  })
  }catch(err:any){
    res.json({
        message: err.name || "Something went wrong",
        status: false,
        error: err,
        stack: err.stack,
      });
 }
}
// delete car 
const deleteCar =async (req:Request,res:Response)=>{
  try{
    const {carId} = req.params;
    const result = await carServices.deleteCarFromDB(carId);
    res.status(200).json({
      message:"Car is deleted succesfully",
      status:true,
      data:result || {}
  })
  }catch(err:any){
    res.json({
        message: err.name || "Something went wrong",
        status: false,
        error: err,
        stack: err.stack,
      });
 }
}


export const CarController = {
  createCar,
  getAllCar,
  getSingleCar,
  updateCar,
  deleteCar
};
