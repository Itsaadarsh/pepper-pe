import express from 'express';
import { producerController } from '../controller/producer';

const router = express.Router();

router.get('/produce', producerController);

export { router as producerRoute };
