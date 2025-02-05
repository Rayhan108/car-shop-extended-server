import QueryBuilder from "../../app/builder/QueryBuilder";
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

   // Apply search to multiple fields
   if (query?.search) {
    const searchRegex = { $regex: query.search, $options: "i" };
    filterQuery.$or = [
        { brand: searchRegex },
        { model: searchRegex },
        { category: searchRegex }
    ];
}

    if(query?.brand){
        filterQuery.brand={$regex:query?.brand,$options:"i"}
    }

    if(query?.model){
        filterQuery.model={$regex:query?.model,$options:"i"}
    }
    if(query?.category){
        filterQuery.category={$regex:query?.category,$options:"i"}
    }
   
// price range filtering

if (query?.minPrice || query?.maxPrice) {
    filterQuery.price = {} as { $gte?: number; $lte?: number };

    if (query?.minPrice) {
        (filterQuery.price as { $gte?: number }).$gte = Number(query.minPrice);
    }
    if (query?.maxPrice) {
        (filterQuery.price as { $lte?: number }).$lte = Number(query.maxPrice);
    }
}
 // availability based on quantity
 if (query?.availability) {
    const availabilityValue = String(query.availability).toLowerCase();

    if (availabilityValue === "in-stock") {
        filterQuery.quantity = { $gt: 0 }; // More than 0 units available
    } else if (availabilityValue === "out-of-stock") {
        filterQuery.quantity = { $lte: 0 }; // 0 or less means out of stock
    }
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
    // console.log(data,id);
    const result= await CarModel.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
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