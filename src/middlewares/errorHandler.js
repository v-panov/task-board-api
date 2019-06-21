import Boom from 'boom';
import { parseErrors } from '../utils/CommonUtils';

function normalizeStatusCode(statusCode) {
  return statusCode >= 100 && statusCode < 600 ? statusCode : 500;
}

export default (err, req, res, next) => {
  // here we can have custom handlers for different type of errors if needed
  let statusCode;
  let error;

  switch (true) {
    case (err.isBoom):
      statusCode = err.output.statusCode;
      error = err;
      break;
    case (err.name === 'JsonWebTokenError'):
      statusCode = 401;
      error = Boom.unauthorized(err.name, 'local');
      break;
    case (err.name === 'ValidationError'):
      statusCode = 400;
      error = Boom.badRequest(err.name, parseErrors(err.errors));
      break;
    default:
      statusCode = 500;
      console.error(err);
      error = Boom.boomify(err);
      error.message = 'Something went wrong';
      break;
  }

  const errorResponse = {
    statusCode: normalizeStatusCode(statusCode),
    message: error.output.payload.message,
    payload: (error.data || { _error: error.message }),
  };
  res.status(errorResponse.statusCode).json(errorResponse);
};
