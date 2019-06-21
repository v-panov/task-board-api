import express from 'express';
import * as LaneService from '../services/LaneService';

const router = express.Router();

router.post('/', async (req, res) => {
  const boardData = req.body;
  const board = await LaneService.create(boardData);
  res.json(board);
});

router.put('/', async (req, res) => {
  const boardData = req.body;
  const board = await LaneService.update(boardData);
  res.json(board);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await LaneService.remove(id);
  res.sendStatus(200);
});

export default router;
