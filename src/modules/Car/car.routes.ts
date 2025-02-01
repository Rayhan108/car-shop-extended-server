import express from 'express';
import { CarController } from './car.controller';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../app/middleware/auth';
import validateRequest from '../../app/middleware/validateRequest';
import { CarValidations } from './car.validation';


const router = express.Router();
router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(CarValidations.carValidationSchema),
  CarController.createCar,
);
router.get('/cars', CarController.getAllCarFromDB);
router.get('/:carId', CarController.getSingleCar);
router.put('/:carId', auth(USER_ROLE.admin),  validateRequest(CarValidations.updateCarValidationSchema), CarController.updateCar);
router.delete('/:carId', auth(USER_ROLE.admin), CarController.deleteCar);
export const carRoute = router;
