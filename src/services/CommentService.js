import boom from 'boom';

import Comment from '../models/Comment';
import User from '../models/User';

export function getById(id) {
  return Comment.findOne({ where: { id } });
}

export function getByCardId(cardId) {
  return Comment.find({ where: { cardId } });
}

export async function create(data, userId) {
  const comment = await Comment.create({
    ...data,
    userId,
  });

  const member = await comment.getMember();
  comment.setDataValue('member', member.toMember());
  return comment;
}

export function remove(id) {
  return Comment.destroy({ where: { id } });
}

export async function update(data, userId) {
  const comment = await Comment.findOne({
    where: { id: data.id },
    include: [
      {
        model: User,
        as: 'member',
        attributes: ['id', 'firstName', 'lastName', 'fullName', 'initials'],
      },
    ],
  });

  if (!comment) {
    throw boom.badRequest('Card not found for update!');
  }

  if (comment.userId !== userId) {
    throw boom.badRequest('Update is not allowed!');
  }

  return comment.update(
    data,
    {
      fields: ['text'],
    },
  );
}
