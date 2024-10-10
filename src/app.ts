import express from 'express'
import config from 'config'
import cors from 'cors'
import routes from './routes'
import db from './db'
import bodyParser from 'body-parser'
const app = express()

const port = config.get("port")
const corsOptions = {
    origin: 'https://scissor-ui.vercel.app',  // Allow only your frontend URL
    optionsSuccessStatus: 200,  // Some legacy browsers choke on 204
  };
  
  app.use(cors(corsOptions));
app.use(bodyParser.json())



app.listen(port, ()=>{
    console.log(`App running on http://localhost:${port}`)
    db();
    routes(app)
})