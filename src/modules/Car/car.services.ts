import QueryBuilder from "../../app/builder/QueryBuilder";
import { CarSearchableFields } from "./car.constant";
import { Tcar } from "./car.interface";
import { CarModel } from "./car.model";

const createCarIntoDB = async (carData: Tcar) => {
  
  const result = await CarModel.create(carData)
//   const result = await car.save(); //built in instance method
  return result;
};
const getAllCarFromDB = async(  query: Record<string, unknown>,)=>{
    // const car = await CarModel.find();
    const getAllCarQuery=new QueryBuilder(CarModel.find(),query)
    .search(CarSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
    const result = await getAllCarQuery.modelQuery;
    const meta = await getAllCarQuery.countTotal();
    return{ result,meta};
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