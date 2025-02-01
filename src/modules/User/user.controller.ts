import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { UserServices } from './user.services';
import httpStatus from 'http-status';
const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await UserServices.changeStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status is updated succesfully',
    data: result,
  });
});
export const UserControllers = {
  changeStatus,
};
