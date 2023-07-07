/* eslint-disable no-console */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
import httpStatus from 'http-status';
const app: Application = express();
import cookieParser from 'cookie-parser';

// use all the middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router);

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

export default app;

// const testId = async () => {
//   const testId = await generateFacultyId();
//   console.log(testId);
// };
// testId();
