import boom from 'boom';

import Card from '../models/Card';
import User from '../models/User';

export function getById(id) {
  return Card.findOne({ where: { id } });
}

export function create(data) {
  return Card.create(data);
}

export function remove(id) {
  return Card.destroy({ where: { id } });
}

export async function update(data) {
  const card = await getById(data.id);

  if (!card) {
    throw boom.badRequest('Card not found for update!');
  }

  return card.update(data);
}

export async function addMember(cardId, userId) {
  const user = await User.findOne({ where: { id: userId } });
  const card = await Card.findOne({ where: { id: cardId } });

  if (!user || !card) {
    throw boom.badRequest('Card or user not found!');
  }

  await user.addCard(cardId);
  return user;
}
