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
  const cardData = {
    title: 'Card title',
    description: 'Card description',
    priority: 1,
  };

  let user;
  let token;
  let board;
  let lane;
  let card;

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

    const cardResponse = await request(app)
      .post('/api/cards')
      .set('Cookie', [`access_token=${token}`])
      .send({
        ...cardData,
        boardId: board.id,
        laneId: lane.id,
      });

    card = cardResponse.body;
  });

  it('POST /api/comments it should create and return comment', async () => {
    const commentData = {
      text: 'Some text',
      cardId: card.id,
      userId: user.id,
    };

    const response = await request(app)
      .post('/api/comments')
      .set('Cookie', [`access_token=${token}`])
      .send(commentData);

    expect.assertions(4);
    expect(response.statusCode).toBe(200);
    expect(response.body.text).toBe(commentData.text);
    expect(response.body.cardId).toBe(commentData.cardId);
    expect(response.body.userId).toBe(commentData.userId);
  });

  it('PUT /api/comments it should update and return comment', async () => {
    const commentData = {
      text: 'Some text',
      cardId: card.id,
      userId: user.id,
    };

    const { body: comment } = await request(app)
      .post('/api/comments')
      .set('Cookie', [`access_token=${token}`])
      .send(commentData);

    const updateCommentData = {
      ...comment,
      text: 'new text',
    };

    const response = await request(app)
      .put('/api/comments')
      .set('Cookie', [`access_token=${token}`])
      .send(updateCommentData);

    expect.assertions(3);
    expect(response.statusCode).toBe(200);
    expect(response.body.text).toBe(updateCommentData.text);
    expect(comment.text).toBe(commentData.text);
  });

  it('DELETE /api/comments it should delete and return ok status', async () => {
    const commentData = {
      text: 'Some text',
      cardId: card.id,
      userId: user.id,
    };

    const { body: comment } = await request(app)
      .post('/api/comments')
      .set('Cookie', [`access_token=${token}`])
      .send(commentData);

    const response = await request(app)
      .delete(`/api/comments/${comment.id}`)
      .set('Cookie', [`access_token=${token}`]);

    expect.assertions(2);
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBeUndefined();
  });

  afterAll(() => db.close());
});
