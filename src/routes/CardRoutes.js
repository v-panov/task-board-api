import express from 'express';
import * as CardService from '../services/CardService';

const router = express.Router();

router.post('/', async (req, res) => {
  const cardData = req.body;
  const card = await CardService.create(cardData);
  res.json(card);
});

router.put('/', async (req, res) => {
  const cardData = req.body;
  const card = await CardService.update(cardData);
  res.json(card);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await CardService.remove(id);
  res.sendStatus(200);
});

router.post('/add-member', async (req, res) => {
  const { cardId, userId } = req.body;
  const user = await CardService.addMember(cardId, userId);
  res.json(user.toMember());
});

export default router;
