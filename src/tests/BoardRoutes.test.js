import request from 'supertest';

import db from '../db';
import app from '../server';

describe('REST /api/boards', () => {
  const userData = {
    email: 'test@email.com',
    password: 'password',
    firstName: 'John',
    lastName: 'Smitt',
  };

  let user;
  let token;

  beforeEach(async () => {
    await db.sync({ force: true });

    const response = await request(app)
      .post('/api/auth/sign-up')
      .send(userData);

    token = response.body.token;
    user = response.body;
  });

  it('GET /api/boards/:id it should return full board', async () => {
    const boardData = {
      title: 'some title',
    };

    const { body: createdBoard } = await request(app)
      .post('/api/boards')
      .set('Cookie', [`access_token=${token}`])
      .send(boardData);

    const laneData = {
      title: 'lane title',
      description: 'lane description',
      boardId: createdBoard.id,
    };

    const { body: createdLane } = await request(app)
      .post('/api/lanes')
      .set('Cookie', [`access_token=${token}`])
      .send(laneData);

    const cardData = {
      title: 'Card title',
      description: 'Card description',
      priority: 1,
      boardId: createdBoard.id,
      laneId: createdLane.id,
    };

    const { body: createdCard } = await request(app)
      .post('/api/cards')
      .set('Cookie', [`access_token=${token}`])
      .send(cardData);

    const { body: cardMember } = await request(app)
      .post('/api/cards/add-member')
      .set('Cookie', [`access_token=${token}`])
      .send({
        userId: user.id,
        cardId: createdCard.id,
      });

    const response = await request(app)
      .get(`/api/boards/${createdBoard.id}`)
      .set('Cookie', [`access_token=${token}`]);

    expect.assertions(14);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(boardData.title);

    expect(response.body.lanes.length).toBe(1);
    expect(response.body.lanes[0].title).toBe(laneData.title);
    expect(response.body.lanes[0].boardId).toBe(laneData.boardId);
    expect(response.body.lanes[0].description).toBe(laneData.description);

    expect(response.body.cards.length).toBe(1);
    expect(response.body.cards[0].title).toBe(cardData.title);
    expect(response.body.cards[0].description).toBe(cardData.description);
    expect(response.body.cards[0].boardId).toBe(cardData.boardId);
    expect(response.body.cards[0].laneId).toBe(cardData.laneId);
    expect(response.body.cards[0].priority).toBe(cardData.priority);

    expect(response.body.cards[0].members.length).toBe(1);
    expect(response.body.cards[0].members[0].id).toBe(cardMember.id);
  });

  it('GET /api/boards it should return user boards', async () => {
    const boardData1 = {
      title: 'board 1',
    };
    const boardData2 = {
      title: 'board 2',
    };

    const { body: createdBoard1 } = await request(app)
      .post('/api/boards')
      .set('Cookie', [`access_token=${token}`])
      .send(boardData1);

    const { body: createdBoard2 } = await request(app)
      .post('/api/boards')
      .set('Cookie', [`access_token=${token}`])
      .send(boardData2);


    const response = await request(app)
      .get('/api/boards')
      .set('Cookie', [`access_token=${token}`]);

    expect.assertions(4);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body.find(({ id }) => id === createdBoard1.id).title).toBe(createdBoard1.title);
    expect(response.body.find(({ id }) => id === createdBoard2.id).title).toBe(createdBoard2.title);
  });

  it('POST /api/boards it should create and return board', async () => {
    const boardData = {
      title: 'some title',
    };

    const response = await request(app)
      .post('/api/boards')
      .set('Cookie', [`access_token=${token}`])
      .send(boardData);

    expect.assertions(2);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(boardData.title);
  });

  it('PUT /api/boards it should update and return board', async () => {
    const boardData = {
      title: 'some title',
    };

    const { body: board } = await request(app)
      .post('/api/boards')
      .set('Cookie', [`access_token=${token}`])
      .send(boardData);

    const updateBoardData = {
      id: board.id,
      title: 'new title',
    };

    const response = await request(app)
      .put('/api/boards')
      .set('Cookie', [`access_token=${token}`])
      .send(updateBoardData);

    expect.assertions(2);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(updateBoardData.title);
  });

  it('DELETE /api/boards it should delete and return ok status', async () => {
    const boardData = {
      title: 'some title',
    };

    const { body: board } = await request(app)
      .post('/api/boards')
      .set('Cookie', [`access_token=${token}`])
      .send(boardData);

    const response = await request(app)
      .delete(`/api/boards/${board.id}`)
      .set('Cookie', [`access_token=${token}`]);

    expect.assertions(2);
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBeUndefined();
  });

  afterAll(() => db.close());
});
