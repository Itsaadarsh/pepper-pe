import express from 'express';
import cors from 'cors';
import { adminAuthRoute } from './routes/adminAuth.route';
import { json } from 'body-parser';
import { createUserRoute } from './routes/createUser.route';

const app = express();

app.use(json());
app.use(cors());

app.use('/api/admin', adminAuthRoute);
app.use('/api/admin', createUserRoute);

export { app };