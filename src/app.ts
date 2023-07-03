/* eslint-disable no-console */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
import httpStatus from 'http-status';
// import { generateFacultyId } from './app/modules/user/user.utils';
const app: Application = express();

// use all the middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Users Route
// app.use('/api/v1/users', UserRouter);

// // Academic Semesters Route
// app.use('/api/v1/academic-semesters', AcademicSemesterRoutes);

app.use('/api/v1', router);

// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   // throw new ApiError(400, 'Allah Is Almighty');
//   // next('Eato Boro Error');
//   throw new Error('Fucking Error');
// });

app.use(globalErrorHandler);

// not found handler
app.use('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

// const testId = async () => {
//   const testId = await generateFacultyId();
//   console.log(testId);
// };
// testId();

export default app;
