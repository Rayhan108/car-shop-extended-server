import { UserModel } from './user.model';

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await UserModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const getSingleUserFromDB = async(id:string)=>{
    const result = await UserModel.findById(id);
    return result;
}
const getAllUserFromDB = async()=>{
    const result = await UserModel.find();
    return result;
}


export const UserServices = {
  changeStatus,getSingleUserFromDB,getAllUserFromDB
};
