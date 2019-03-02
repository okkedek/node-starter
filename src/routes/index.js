import express from 'express';
import entityController from '../controllers/entity';

let router = express.Router();

router.get('/entities', entityController.list);

export default router;
