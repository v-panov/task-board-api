import boom from 'boom';
import Lane from '../models/Lane';

export function getById(id) {
  return Lane.findOne({ where: { id } });
}

export function create(data) {
  return Lane.create(data);
}

export async function update(data) {
  const lane = await getById(data.id);

  if (!lane) {
    throw boom.badRequest('Lane not found for update!');
  }

  return lane.update(data);
}

export function remove(id) {
  return Lane.destroy({ where: { id } });
}
