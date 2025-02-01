import { UserModel } from './user.model';

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await UserModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
export const UserServices = {
  changeStatus,
};
