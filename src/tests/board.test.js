import db from '../db';
import Board from '../models/Board';
import Lane from '../models/Lane';
import Card from '../models/Card';
import User from '../models/User';

describe('Database', () => {

  beforeAll(async () => {
    await db.sync({ force: true });

    const user = await User.create({
      firstName: 'John',
      email: 'john@doe.com',
      password: 'john@doe.com',
    });

    const board = await Board.create({
      title: 'Board title',
    });

    await user.addBoard(board);

    const lane = await Lane.create({
      title: 'Lane title',
      description: 'Lane description',
    });

    await board.addLane(lane);

    const card = await Card.create({
      title: 'Lane title',
      description: 'Lane description',
      priority: 1,
    });

    await lane.addCard(card);
    await card.addMember(user);
  });

  it('board contains lanes with cards', async () => {
    const board = await Board.findOne({
      include: [
        {
          model: Lane,
          attributes: ['id'],
          include: [
            {
              model: Card,
              attributes: ['id'],
            },
          ],
        },
      ],
    });

    expect(board.lanes.length).not.toBe(0);
    expect(board.lanes[0].cards.length).not.toBe(0);
  });

  it('lane contains cards', async () => {
    const lane = await Lane.findOne({
      include: [
        {
          model: Card,
          attributes: ['id'],
        }],
    });

    expect(lane.cards.length).not.toBe(0);
  });

  // it('card and lane belongs to the same board', async () => {
  //   const board = await Board.findOne({});
  //   const lane = await Lane.findOne({});
  //   const card = await Card.findOne({});
  //
  //   expect(lane.boardId).toBe(board.id);
  //   expect(card.boardId).toBe(lane.boardId);
  // });

  it('card has members', async () => {
    const card = await Card.findOne({
      include: [
        {
          model: User,
          as: 'members',
          attributes: ['id'],
          through: {
            attributes: [],
          },
        }],
    });

    expect(card.members.length).toBe(1);
  });

  afterAll(() => db.close());
});
