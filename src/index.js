import http from 'http';

import db from './db';
import app from './server';
import config from '../config/config';

const server = http.Server(app);

db.sync().then(() => {
  server.listen(config.PORT, () => {
    console.log(`Running on http://localhost:${config.PORT}`);
  });
});
