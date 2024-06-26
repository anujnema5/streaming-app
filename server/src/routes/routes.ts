import { Router } from "express";
import authRoutes from "./auth/auth.controllers";
import cors from 'cors';

const routes = Router()
    .get('/', (req, res) => { return res.send("SERVER IS RUNNING") })
    .get('/test', (req, res)=> {return res.json({message: "Hello World Test"})})
    .use(authRoutes)

export default routes.use('/api/',  routes)