import { Tcar } from "./car.interface";
import { CarModel } from "./car.model";

const createCarIntoDB = async (carData: Tcar) => {
  
  const car = new CarModel(carData); //create an instance
  const result = await car.save(); //built in instance method
  return result;
};
const getAllCarFromDB = async()=>{
    const result = await CarModel.find();
    return result;
}
const getSingleCarFromDB = async(id:string)=>{
    const result = await CarModel.findById(id);
    return result;
}
const updateCarFromDB = async(id:string,data:Tcar)=>{
    const result = await CarModel.findByIdAndUpdate(id,data,{
        new:true,
    })
    return result;
}
const deleteCarFromDB=async (id:string)=>{
    const result = await CarModel.findByIdAndDelete(id);
    return result;
}
export const carServices={
    createCarIntoDB,
    getAllCarFromDB,
    getSingleCarFromDB,
    updateCarFromDB,
    deleteCarFromDB
}