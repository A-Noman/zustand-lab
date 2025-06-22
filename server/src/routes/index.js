import express from 'express';
import { getItems } from '../controllers/index.js';
import { baseURLHandler } from '../controllers/index.js';

const router = express.Router();

export function setRoutes(app) {
  router.get('/', baseURLHandler);
  router.get('/items', getItems);
  app.use('/', router);
}
