import http from 'http';

import db from './db';
import app from './server';
import config from '../config/config';
import WS from './WS';

const server = http.Server(app);
WS.init(server);

db.sync().then(() => {
  server.listen(config.PORT, () => {
    console.log(`Running on http://localhost:${config.PORT}`);
  });
});
