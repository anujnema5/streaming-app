// middlewares.ts
import express from 'express';
import cookieParser from 'cookie-parser';
import passport from './passport.middleware';
import cors from 'cors';

const initializeMiddlewares = (app: express.Application) => {
    app.use(express.json());
    app.use(cookieParser());

    app.use(passport.initialize());

    // app.use(
    //     cors({
    //         origin: 'https://www.streamingapp.live',
    //         methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    //         credentials: true,
    //     })
    // );

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', 'https://www.streamingapp.live, https://streamingapp.live');
        res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        next();
    });
    

    app.enable("trust proxy");
};

export default initializeMiddlewares;