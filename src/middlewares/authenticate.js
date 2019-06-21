import jwt from 'jsonwebtoken';
import boom from 'boom';

import appConfig from '../../config/config';

export default async (req, res, next) => {
  const token = req.headers.access_token || req.cookies.access_token;

  if (token) {
    jwt.verify(token, appConfig.JWT_SECRET, (err, decoded) => {
      if (err) {
        throw boom.unauthorized('Invalid Token', 'local');
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    throw boom.unauthorized('No token', 'local');
  }
};
