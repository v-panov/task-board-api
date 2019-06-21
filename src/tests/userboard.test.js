import db from '../db';
import Board from '../models/Board';
import User from '../models/User';

describe('User board', () => {
  let user = null;

  beforeAll(async () => {
    await db.sync({ force: true });

    user = await User.create({
      firstName: 'John',
      email: 'john@doe.com',
      password: 'john@doe.com',
    });

    const board = await Board.create({
      title: 'Board title',
    });

    await user.addBoard(board);
  });

  it('user contains board', async () => {
    const board = await Board.findOne({
      include: [
        {
          model: User,
          as: 'members',
          attributes: ['id'],
          through: {
            attributes: [],
          },
        },
      ],
    });

    expect(board.members[0].id).toBe(user.id);
  });

  afterAll(() => db.close());
});
