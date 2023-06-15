import express from 'express';
import { UserRouter } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

// same code as above
// router.use('/users', UserRouter);
// router.use('/academic-semesters', AcademicSemesterRoutes);

export default router;
