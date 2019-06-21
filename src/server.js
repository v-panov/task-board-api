import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import routes from './routes';

const app = express();

// secure Express app by setting various HTTP headers
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(routes);

export default app;
