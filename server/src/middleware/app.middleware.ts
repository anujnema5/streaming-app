// middlewares.ts
import express from 'express';
import cookieParser from 'cookie-parser';
import passport from './passport.middleware';
import cors from 'cors';

const initializeMiddlewares = (app: express.Application) => {
    app.use(express.json());
    app.use(cookieParser());

    app.use(passport.initialize());

    // var whitelist = ['streaming-app-client.vercel.app', 'http://localhost:3000']
    // var corsOptions = {
    //     origin: function (origin: any, callback: any) {
    //         if (whitelist.indexOf(origin) !== -1) {
    //             callback(null, true)
    //         } else {
    //             callback(new Error('Not allowed by CORS'))
    //         }
    //     }
    // }

    app.use(
        cors({
            origin: 'https://streaming-app-client.vercel.app',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true,
        })
    );

    // app.use(cors(corsOptions))
    app.enable("trust proxy");

};

export default initializeMiddlewares;