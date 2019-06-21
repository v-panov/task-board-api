import request from 'supertest';

import db from '../db';
import app from '../server';

describe('REST /api/user', () => {
  const userData = {
    email: 'test@email.com',
    password: 'password',
    firstName: 'John',
    lastName: 'Smitt',
  };

  let token = null;
  let userId = null;

  beforeEach(async () => {
    await db.sync({ force: true });

    const { body } = await request(app)
      .post('/api/auth/sign-up')
      .send(userData);

    token = body.token;
    userId = body.id;
  });

  it('POST /api/user/me it should return user', async () => {
    const response = await request(app)
      .get('/api/user/me')
      .set('Cookie', [`access_token=${token}`]);

    expect.assertions(7);
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(userId);
    expect(response.body.token).toBe(token);
    expect(response.body.email).toBe(userData.email);
    expect(response.body.firstName).toBe(userData.firstName);
    expect(response.body.lastName).toBe(userData.lastName);
    expect(response.body.password).toBeUndefined();
  });

  afterEach(() => db.close());
});
