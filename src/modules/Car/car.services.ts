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

    // console.log("all car query",query);

    const filterQuery: Record<string, unknown> = {};

   
    if(query?.brand){
        filterQuery.brand={$regex:query?.brand,$options:"i"}
    }
    if(query?.model){
        filterQuery.model={$regex:query?.model,$options:"i"}
    }
    if(query?.category){
        filterQuery.category={$regex:query?.category,$options:"i"}
    }
   // Apply search to multiple fields
   if (query?.search) {
    filterQuery.$or = [
        { brand: { $regex: query.search, $options: "i" } },
        { model: { $regex: query.search, $options: "i" } },
        { category: { $regex: query.search, $options: "i" } }
    ];
}

// console.log("updated filtered query",filterQuery);

const sortOption = query?.sortBy === 'asc'?1:-1;

    const getAllCarQuery=new QueryBuilder(CarModel.find(),query)
    // .search(CarSearchableFields)
    // .filter()
    // .sort()
    .paginate()
    // .fields();
    // const result = await getAllCarQuery.modelQuery;

    const result = await CarModel.find(filterQuery).sort({price:sortOption})
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