import bcrypt from 'bcryptjs';
import boom from 'boom';

import * as UserService from './UserService';

async function checkPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export async function signUp(data) {
  const password = await bcrypt.hash(data.password, 10);

  const user = await UserService.create({
    ...data,
    password,
  });

  return user;
}

export async function signIn(email, password) {
  const user = await UserService.getByEmail(email);
  if (!user) {
    throw boom.unauthorized('Invalid credentials');
  }

  // check password
  const isValidPass = await checkPassword(password, user.password);

  if (!isValidPass) {
    throw boom.unauthorized('Invalid credentials');
  }

  return user;
}
