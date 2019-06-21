import request from 'supertest';

import app from '../server';
import db from '../db';

describe('REST /api/auth', () => {
  const userData = {
    email: 'test@email.com',
    password: 'password',
    firstName: 'John',
    lastName: 'Smitt',
  };

  let token = null;

  beforeEach(async () => {
    await db.sync({ force: true });

    const { body } = await request(app)
      .post('/api/auth/sign-up')
      .send(userData);

    token = body.token;
  });

  test('POST /api/auth/sign-up it should create and return user', async () => {
    const response = await request(app)
      .post('/api/test')
      .set('Cookie', [`access_token=${token}`]);

    expect.assertions(1);
    expect(response.statusCode).toBe(200);
  });

});
