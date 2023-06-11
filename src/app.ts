import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRouter } from './app/modules/user/user.route';
// import { userController } from './app/modules/user/user.service';
const app: Application = express();

// use all the middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Users Route
app.use('/api/v1/users', UserRouter);

app.get('/', async (req: Request, res: Response) => {
  // await userController.createUser({
  //   id: '9999',
  //   password: '1234656',
  //   role: 'student',
  // });
  res.send('Hello World!');
});

export default app;
