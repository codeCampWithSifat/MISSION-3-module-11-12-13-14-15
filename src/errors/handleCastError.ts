import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';

const handleCastError = (error: mongoose.Error.CastError) => {
  //   console.log(error);
  const errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: 'Invalid Object Id',
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Cast Error Is Occured',
    errorMessages: errors,
  };
};

export default handleCastError;
