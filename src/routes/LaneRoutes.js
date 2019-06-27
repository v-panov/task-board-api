import express from 'express';
import * as LaneService from '../services/LaneService';

const router = express.Router();

router.post('/', async (req, res) => {
  const laneData = req.body;
  const lane = await LaneService.create(laneData);
  res.json(lane);
});

router.put('/', async (req, res) => {
  const laneData = req.body;
  const lane = await LaneService.update(laneData);
  res.json(lane);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await LaneService.remove(id);
  res.sendStatus(200);
});

export default router;
