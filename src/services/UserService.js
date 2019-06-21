import User from '../models/User';

export function getById(id) {
  return User.findOne({ where: { id } });
}

export function getByEmail(email) {
  return User.findOne({ where: { email } });
}

export async function create(data) {
  return User.create(data);
}

export function remove(id) {
  return User.destroy({ where: { id } });
}

export function update(id, data) {
  return User.update(data, { where: { id } });
}
