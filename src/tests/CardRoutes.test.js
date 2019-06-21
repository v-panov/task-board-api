import request from 'supertest';

import db from '../db';
import app from '../server';

describe('REST /api/cards', () => {
  const userData = {
    email: 'test@email.com',
    password: 'password',
    firstName: 'John',
    lastName: 'Smitt',
  };
  const boardData = {
    title: 'board title',
  };
  const laneData = {
    title: 'Lane title',
    description: 'Lane description',
  };

  let user;
  let token;
  let board;
  let lane;

  beforeEach(async () => {
    await db.sync({ force: true });

    const signUpresponse = await request(app)
      .post('/api/auth/sign-up')
      .send(userData);

    token = signUpresponse.body.token;
    user = signUpresponse.body;

    const boardResponse = await request(app)
      .post('/api/boards')
      .set('Cookie', [`access_token=${token}`])
      .send(boardData);

    board = boardResponse.body;

    const laneResponse = await request(app)
      .post('/api/lanes')
      .set('Cookie', [`access_token=${token}`])
      .send({
        ...laneData,
        boardId: board.id,
      });

    lane = laneResponse.body;
  });

  it('POST /api/cards it should create and return card', async () => {
    const cardData = {
      title: 'Card title',
      description: 'Card description',
      priority: 1,
      laneId: lane.id,
    };

    const response = await request(app)
      .post('/api/cards')
      .set('Cookie', [`access_token=${token}`])
      .send(cardData);

    expect.assertions(5);
    expect(response.statusCode).toBe(200);
    expect(response.body.laneId).toBe(cardData.laneId);
    expect(response.body.title).toBe(cardData.title);
    expect(response.body.description).toBe(cardData.description);
    expect(response.body.priority).toBe(cardData.priority);
  });

  it('PUT /api/cards it should update and return card', async () => {
    const cardData = {
      title: 'Card title',
      description: 'Card description',
      priority: 1,
      laneId: lane.id,
    };

    const { body: card } = await request(app)
      .post('/api/cards')
      .set('Cookie', [`access_token=${token}`])
      .send(cardData);

    const updateCardData = {
      ...card,
      title: 'new card title',
      description: 'new card description',
      priority: 2,
    };

    const response = await request(app)
      .put('/api/cards')
      .set('Cookie', [`access_token=${token}`])
      .send(updateCardData);

    expect.assertions(5);
    expect(response.statusCode).toBe(200);
    expect(response.body.laneId).toBe(updateCardData.laneId);
    expect(response.body.title).toBe(updateCardData.title);
    expect(response.body.description).toBe(updateCardData.description);
    expect(response.body.priority).toBe(updateCardData.priority);
  });

  it('DELETE /api/cards it should delete and return ok status', async () => {
    const cardData = {
      title: 'Card title',
      description: 'Card description',
      priority: 1,
      laneId: lane.id,
    };

    const { body: card } = await request(app)
      .post('/api/cards')
      .set('Cookie', [`access_token=${token}`])
      .send(cardData);

    const response = await request(app)
      .delete(`/api/cards/${card.id}`)
      .set('Cookie', [`access_token=${token}`]);

    expect.assertions(2);
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBeUndefined();
  });

  it('POST /api/cards/add-member it should assign user to card and return member', async () => {
    const cardData = {
      title: 'Card title',
      description: 'Card description',
      priority: 1,
      laneId: lane.id,
    };

    const { body: card } = await request(app)
      .post('/api/cards')
      .set('Cookie', [`access_token=${token}`])
      .send(cardData);

    const response = await request(app)
      .post('/api/cards/add-member')
      .set('Cookie', [`access_token=${token}`])
      .send({
        userId: user.id,
        cardId: card.id,
      });

    expect.assertions(3);
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(user.id);
    expect(response.body.fullName).toBe(user.fullName);
  });

  afterAll(() => db.close());
});
