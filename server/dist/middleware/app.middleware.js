"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// middlewares.ts
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_middleware_1 = __importDefault(require("./passport.middleware"));
const cors_1 = __importDefault(require("cors"));
const initializeMiddlewares = (app) => {
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.use(passport_middleware_1.default.initialize());
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
    app.use((0, cors_1.default)({
        origin: 'https://streaming-app-client.vercel.app',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    }));
    // app.use(cors(corsOptions))
    app.enable("trust proxy");
};
exports.default = initializeMiddlewares;
