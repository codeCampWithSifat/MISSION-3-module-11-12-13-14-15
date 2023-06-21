import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
// import { generateStudentId } from './user.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental id
  // const academicSemester = {
  //   code: '01',
  //   year: '2026',
  // };
  // const id = await generateStudentId();
  // user.id = id;

  // a default password
  if (!user.password) {
    user.password = config.default_user_password as string;
  }
  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(400, 'Failed To Create User');
  }
  return createdUser;
};

export const UserService = {
  createUser,
};
