// Error Handler Route
class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, messge: string | undefined, stack = '') {
    super(messge);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
