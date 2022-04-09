import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { userLoginRoute } from './routes/userLogin.route';
import { getUserRoute } from './routes/getUserDetails.route';
import { postTransactionRoute } from './routes/postTransaction.route';

const app = express();

app.use(json());
app.use(cors());

app.use('/api/user', userLoginRoute);
app.use('/api/user', getUserRoute);
app.use('/api/user', postTransactionRoute);

export { app };
