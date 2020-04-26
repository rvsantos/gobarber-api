import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) =>
  response.json({ message: 'Hello Rafael' }),
);

export default routes;
