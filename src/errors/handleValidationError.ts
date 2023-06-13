import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';
import { IGenericErrorResponse } from '../interfaces/common';

const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.CastError | mongoose.Error.ValidatorError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );

  // rest of the code
  const statusCode = 400;
  return {
    statusCode,
    message: 'ValidatationError',
    errorMessages: errors,
  };
};

export default handleValidationError;
