import express from 'express';
import * as UserService from '../services/UserService';

const router = express.Router();

router.get('/', async (req, res) => {
  const { user: { id } } = req;
  const user = await UserService.getById(id);
  res.json(user.toUIModel());
});

router.post('/', async (req, res) => {
  const { user: { id } } = req;
  const userForm = req.body;
  const updatedUser = await UserService.update(id, userForm);
  res.json(updatedUser.toUIModel());
});

export default router;
