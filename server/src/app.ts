import express, { Application, NextFunction, Request, Response } from 'express';
import routes from './routes/routes';
import initializeMiddlewares from './middleware/app.middleware';
import cors from 'cors'

const app: Application = express();

initializeMiddlewares(app);
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//     res.status(400).json({error: err})
// })

app.use(cors({
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: "*"
  }));
  
app.enable("trust proxy");
app.use(routes)

export default app;