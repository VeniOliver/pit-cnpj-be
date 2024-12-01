import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config({
  silent: process.env.NODE_ENV === 'production'
})

import connect from './db.js';
import auth from './model/auth.class.js';
import DefaultRoutes from './router/default.router.js';
import CNPJRoutes from './router/cnpj.router.js';

//connect to database
await connect()

//create app
const app = express()
// adding Helmet to enhance your API's security
app.use(helmet())
// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json({limit: '5mb', extended: true}))
// enabling CORS
app.use(cors({
  origin: ['http://localhost:4200', 'https://pit-cnpj.venith.com.br']
}))
//check api key
app.use(auth.apiKeyVerify)
//routers
app.use(DefaultRoutes)
app.use('/cnpj', CNPJRoutes)

export default app
