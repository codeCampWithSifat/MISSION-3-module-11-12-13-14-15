import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
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

export default app;
