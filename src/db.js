import { Sequelize } from 'sequelize';

import appConfig from '../config/config';
import * as models from './models';

const { DATABASE } = appConfig;

const sequelize = new Sequelize({
  database: DATABASE.NAME,
  username: DATABASE.USER,
  password: DATABASE.PASSWORD,
  dialect: DATABASE.DIALECT,
  host: DATABASE.HOST,
  port: DATABASE.PORT,
});

// init models and associations
const modelNames = Object.keys(models);

modelNames
  .forEach(name => models[name].initModel(sequelize));

modelNames
  .filter(name => 'initAssociations' in models[name])
  .forEach(name => models[name].initAssociations(sequelize));

export default sequelize;
