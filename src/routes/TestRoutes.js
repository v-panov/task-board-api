import authenticate from '../middlewares/authenticate';

export default (app) => {
  const route = app.route('/api/test');

  route
    .all(authenticate)
    .post(async (req, res) => {
      res.json({ post: true });
    })
    .put(async (req, res) => {
      res.json({ put: true });
    })
    .delete(async (req, res) => {
      res.sendStatus(200);
    });

  app.route('/api/test/list')
    .get(authenticate, async (req, res) => {
      res.json({ list: true });
    });

  app.route('/api/test/:id')
    .get(authenticate, async (req, res) => {
      const { id } = req.params;
      res.json({ id });
    });
};
