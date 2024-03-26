// middlewares.ts
import express from 'express';
import cookieParser from 'cookie-parser';
import passport from './passport.middleware';
import cors from 'cors';

const initializeMiddlewares = (app: express.Application) => {
    app.use(express.json());
    app.use(cookieParser());

    app.use(passport.initialize());

    app.use(
        cors({
            origin: 'https://streaming-app-client.vercel.app',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true,
        })
    );

    app.enable("trust proxy");
};

export default initializeMiddlewares;