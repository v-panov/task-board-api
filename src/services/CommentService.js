import boom from 'boom';

import Comment from '../models/Comment';

export function getById(id) {
  return Comment.findOne({ where: { id } });
}

export function getByCardId(cardId) {
  return Comment.find({ where: { cardId } });
}

export function create(userId, data) {
  return Comment.create({
    ...data,
    userId,
  });
}

export function remove(id) {
  return Comment.destroy({ where: { id } });
}

export async function update(data) {
  const comment = await getById(data.id);

  if (!comment) {
    throw boom.badRequest('Card not found for update!');
  }

  return comment.updateAttributes(data);
}
