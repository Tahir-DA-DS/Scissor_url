import express from 'express'
import config from 'config'
import cors from 'cors'
import routes from './routes'
import db from './db'
import bodyParser from 'body-parser'
const app = express()

const port = config.get("port")

const allowedOrigins = [
    'https://scissor-ui.vercel.app',
    'https://scissor-lxuc4wqvv-tahirdads-projects.vercel.app',  // Add your new Vercel deployment here
  ];
  
  const corsOptions = {
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };
  
  app.use(cors(corsOptions));
app.use(bodyParser.json())



app.listen(port, ()=>{
    console.log(`App running on http://localhost:${port}`)
    db();
    routes(app)
})