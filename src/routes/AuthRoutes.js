import express from 'express';
import * as AuthService from '../services/AuthService';

const router = express.Router();

router.post('/sign-up', async (req, res) => {
  const user = await AuthService.signUp(req.body);
  const retVal = user.toUIModel();
  res.cookie('access_token', retVal.token);
  res.json(retVal);
});

router.post('/sign-in', async (req, res) => {
  const { email, password } = req.body;
  const user = await AuthService.signIn(email, password);
  const retVal = user.toUIModel();
  res.cookie('access_token', retVal.token);
  res.json(retVal);
});

export default router;
