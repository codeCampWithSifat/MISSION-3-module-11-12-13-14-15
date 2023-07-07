/* eslint-disable no-console */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { Secret } from 'jsonwebtoken';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  // access to our method
  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Does Not Exit');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password Not Matched');
  }

  // create access token and refresh token
  //   const accessToken = jwt.sign({
  //     id: isUserExist?.id,
  //     role: isUserExist?.role
  //   },config.jwt.secret as Secret,{
  //     expiresIn: config.jwt.expires_in
  //   })

  const { id: userId, role, needsPasswordChange } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  //   const refreshToken = jwt.sign({
  //     id: isUserExist?.id,
  //     role: isUserExist?.role
  //   },config.jwt.refresh_secret as Secret, {
  //     expiresIn:config.jwt.refresh_expires_in
  //   })

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  //   console.log(accessToken, refreshToken, needsPasswordChange);

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // verify token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    ); //jwt.verify(token, config.jwt.refresh_secret);
    // console.log(verifiedToken);
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  // tume delete hoya gaso kinto tmr refresh token asa
  // checking deleted users refresh token
  const { userId } = verifiedToken;

  const isUserExist = await User.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Users Does Not Exit');
  }

  // generate new Token

  const newAccessToken = jwtHelpers.createToken(
    { id: isUserExist?.id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};

// match Password
//   const isPasswordMatched = await bcrypt.compare(
//     password,
//     isUserExist?.password
//   );

// creating instance method

// check user exit
//   const isUserExist = await User.findOne(
//     { id },
//     { id: 1, password: 1, needsPasswordChange: 1 }
//   ).lean();
