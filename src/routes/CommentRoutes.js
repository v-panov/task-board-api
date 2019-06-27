import express from 'express';
import * as CommentService from '../services/CommentService';

const router = express.Router();

router.post('/', async (req, res) => {
  const { user: { id } } = req;
  const commentData = req.body;
  const comment = await CommentService.create(commentData, id);
  res.json(comment);
});

router.put('/', async (req, res) => {
  const { user: { id } } = req;
  const commentData = req.body;
  const comment = await CommentService.update(commentData, id);
  res.json(comment);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await CommentService.remove(id);
  res.sendStatus(200);
});

export default router;
