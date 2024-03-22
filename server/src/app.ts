import express, { Application, NextFunction, Request, Response } from 'express';
import routes from './routes/routes';
import initializeMiddlewares from './middleware/app.middleware';
import cors from 'cors';

const app: Application = express();
initializeMiddlewares(app);

app.use(routes)

export default app;