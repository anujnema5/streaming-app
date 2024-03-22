import express, { Application, NextFunction, Request, Response } from 'express';
import routes from './routes/routes';
import initializeMiddlewares from './middleware/app.middleware';

const app: Application = express();
initializeMiddlewares(app);

// app.options("*", (_, res) => {
//     res.sendStatus(200);
// });

app.use(routes)

export default app;