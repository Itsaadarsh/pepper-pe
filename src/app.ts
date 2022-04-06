import express from 'express';
import cors from 'cors';
import { producerRoute } from './routes/producer';

const app = express();
app.use(cors());

app.use('/api/admin', producerRoute);

export { app };
