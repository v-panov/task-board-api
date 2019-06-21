import request from 'supertest';

import db from '../db';
import app from '../server';

describe('REST /api/auth', () => {
  beforeEach(async () => {
    await db.sync({ force: true });
  });

  test('POST /api/auth/sign-up it should create and return user', async () => {
    const userData = {
      email: 'test@email.com',
      password: 'password',
      firstName: 'John',
      lastName: 'Smitt',
    };

    const response = await request(app).post('/api/auth/sign-up').send(userData);

    expect.assertions(5);
    expect(response.statusCode).toBe(200);
    expect(response.body.email).toBe(userData.email);
    expect(response.body.firstName).toBe(userData.firstName);
    expect(response.body.lastName).toBe(userData.lastName);
    expect(response.body.password).toBeUndefined();
  });

  test('POST /api/auth/sign-in it should successfully sign in', async () => {
    const userData = {
      email: 'test@email.com',
      password: 'password',
      firstName: 'John',
      lastName: 'Smitt',
    };

    await request(app).post('/api/auth/sign-up').send(userData);
    const response = await request(app).post('/api/auth/sign-in').send(userData);

    expect.assertions(5);
    expect(response.statusCode).toBe(200);
    expect(response.body.email).toBe(userData.email);
    expect(response.body.firstName).toBe(userData.firstName);
    expect(response.body.lastName).toBe(userData.lastName);
    expect(response.body.password).toBeUndefined();
  });

  afterAll(() => db.close());
});
