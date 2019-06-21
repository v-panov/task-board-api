import express from 'express';
import * as BoardService from '../services/BoardService';

const router = express.Router();

router.post('/', async (req, res) => {
  const { user: { id } } = req;
  const boardData = req.body;
  const board = await BoardService.create(id, boardData);
  res.json(board);
});

router.put('/', async (req, res) => {
  const boardData = req.body;
  const board = await BoardService.update(boardData);
  res.json(board);
});

router.get('/', async (req, res) => {
  const { user: { id } } = req;
  const boards = await BoardService.getUserBoards(id);
  res.json(boards);
});

router.get('/add-member', async (req, res) => {
  const { user: { id } } = req;
  const boards = await BoardService.getUserBoards(id);
  res.json(boards);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const board = await BoardService.getById(id);
  res.json(board);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await BoardService.remove(id);
  res.sendStatus(200);
});

export default router;
