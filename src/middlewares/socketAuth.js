import jwt from 'jsonwebtoken';

import appConfig from '../../config/config';

export default async (socket, next) => {
  const token = socket.request.headers.access_token || socket.request.cookies.access_token;

  if (token) {
    jwt.verify(token, appConfig.JWT_SECRET, (err, decoded) => {
      if (err) {
        next(new Error('Invalid Token'));
      } else {
        socket.user = decoded;
        next();
      }
    });
  } else {
    next(new Error('No token'));
  }
};
