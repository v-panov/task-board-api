import request from 'supertest';

import db from '../db';
import app from '../server';

describe('REST /api/lanes', () => {
  const userData = {
    email: 'test@email.com',
    password: 'password',
    firstName: 'John',
    lastName: 'Smitt',
  };
  const boardData = {
    title: 'board title',
  };

  let token;
  let board;

  beforeEach(async () => {
    await db.sync({ force: true });

    const response = await request(app)
      .post('/api/auth/sign-up')
      .send(userData);

    token = response.body.token;

    const boardResponse = await request(app)
      .post('/api/boards')
      .set('Cookie', [`access_token=${token}`])
      .send(boardData);

    board = boardResponse.body;
  });

  it('POST /api/lanes it should create and return lane', async () => {
    const laneData = {
      title: 'lane title',
      description: 'lane description',
      boardId: board.id,
    };

    const response = await request(app)
      .post('/api/lanes')
      .set('Cookie', [`access_token=${token}`])
      .send(laneData);

    expect.assertions(4);
    expect(response.statusCode).toBe(200);
    expect(response.body.boardId).toBe(board.id);
    expect(response.body.title).toBe(laneData.title);
    expect(response.body.description).toBe(laneData.description);
  });

  it('PUT /api/lanes it should update and return lane', async () => {
    const laneData = {
      title: 'lane title',
      description: 'lane description',
      priority: 1,
      boardId: board.id,
    };

    const { body: lane } = await request(app)
      .post('/api/lanes')
      .set('Cookie', [`access_token=${token}`])
      .send(laneData);

    const updateLaneData = {
      ...lane,
      title: 'new lane title',
      description: 'new lane description',
    };

    const response = await request(app)
      .put('/api/lanes')
      .set('Cookie', [`access_token=${token}`])
      .send(updateLaneData);

    expect.assertions(4);
    expect(response.statusCode).toBe(200);
    expect(response.body.boardId).toBe(board.id);
    expect(response.body.title).toBe(updateLaneData.title);
    expect(response.body.description).toBe(updateLaneData.description);
  });

  it('DELETE /api/lanes it should delete and return ok status', async () => {
    const laneData = {
      title: 'lane title',
      description: 'lane description',
      boardId: board.id,
    };

    const { body: lane } = await request(app)
      .post('/api/lanes')
      .set('Cookie', [`access_token=${token}`])
      .send(laneData);

    const response = await request(app)
      .delete(`/api/lanes/${lane.id}`)
      .set('Cookie', [`access_token=${token}`]);

    expect.assertions(2);
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBeUndefined();
  });

  afterAll(() => db.close());
});
