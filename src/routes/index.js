import express from 'express';
import Layer from 'express/lib/router/layer';
import boom from 'boom';

import AuthRoutes from './AuthRoutes';
import UserRoutes from './UserRoutes';
import CommentRoutes from './CommentRoutes';
import CardRoutes from './CardRoutes';
import LaneRoutes from './LaneRoutes';
import BoardRoutes from './BoardRoutes';
import errorHandler from '../middlewares/errorHandler';
import authenticate from '../middlewares/authenticate';

/**
 * Wraps express handlers in order to be able to use async routes
 * and to catch exceptions by the express error handler
 */
Layer.prototype.handle_request = function handle(req, res, next) {
  const fn = this.handle;

  if (fn.length > 3) {
    // not a standard request handler
    return next();
  }

  try {
    const maybePromise = fn(req, res, next);
    if (maybePromise && maybePromise.catch && typeof maybePromise.catch === 'function') {
      maybePromise.catch(next);
    }
  } catch (err) {
    next(err);
  }
};

const router = express.Router();

router.use('/api/auth', AuthRoutes);
router.use(authenticate);

router.use('/api/user/me', UserRoutes);
router.use('/api/comments', CommentRoutes);
router.use('/api/cards', CardRoutes);
router.use('/api/lanes', LaneRoutes);
router.use('/api/boards', BoardRoutes);

router.use((req, res, next) => {
  throw boom.notFound('Not Found');
});
router.use(errorHandler);

export default router;
