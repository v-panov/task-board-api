import boom from 'boom';

import Board from '../models/Board';
import User from '../models/User';
import Lane from '../models/Lane';
import Card from '../models/Card';

export function getUserBoards(userId) {
  return Board.getUserBoards(userId);
}

export function getById(id) {
  return Board.findOne({
    where: { id },
    include: [
      {
        model: Lane,
        include: [
          {
            model: Card,
            include: [
              {
                model: User,
                as: 'members',
                attributes: ['id', 'firstName', 'lastName', 'fullName', 'initials'],
                through: {
                  attributes: [],
                },
              },
            ],
          },
        ],
      },
    ],
  });
}

export async function create(userId, data) {
  const board = await Board.create(data);
  await board.addMember(userId);

  return board;
}

export function remove(id) {
  return Board.destroy({ where: { id } });
}

export async function update(data) {
  const board = await Board.findOne({ where: { id: data.id } });

  if (!board) {
    throw boom.badRequest('Board not found for update!');
  }

  return board.update(data);
}

export async function addMember(boardId, userId) {
  const board = await Board.findOne({ where: { id: boardId } });
  const user = await User.findOne({ where: { id: userId } });

  if (!user) {
    throw boom.badRequest('User not found!');
  }
  if (!board) {
    throw boom.badRequest('Board not found!');
  }

  await user.addCard(boardId);
  return user;
}
