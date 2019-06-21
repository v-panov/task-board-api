import express from 'express';
import * as CommentService from '../services/CommentService';

const router = express.Router();

router.post('/', async (req, res) => {
  const { user: { id } } = req;
  const cardData = req.body;
  const card = await CommentService.create(id, cardData);
  res.json(card);
});

router.put('/', async (req, res) => {
  const cardData = req.body;
  const card = await CommentService.update(cardData);
  res.json(card);
});

router.delete('/', async (req, res) => {
  const { id } = req.query;
  await CommentService.remove(id);
  res.sendStatus(200);
});

export default router;
