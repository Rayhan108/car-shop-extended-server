import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import cookieParser from 'cookie-parser';
import router from './app/routes';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
const app: Application = express();
//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));
app.use('/api/v1', router);
app.get('/', (req: Request, res: Response) => {
  res.send('Car Store Server is Running...');
});
app.use(globalErrorHandler);
app.use(notFound);
export default app;
