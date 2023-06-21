import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcdemicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentController } from './acdemicDepartment.controller';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(
    AcdemicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.createDepartment
);

router.get('/:id', AcademicDepartmentController.getSingleDepartment);

router.patch(
  '/:id',
  validateRequest(
    AcdemicDepartmentValidation.updateAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.updateDepartment
);

router.delete('/:id', AcademicDepartmentController.deleteDepartment);

router.get('/', AcademicDepartmentController.getAllDepartments);

export const AcademicDepartmentRoutes = router;
