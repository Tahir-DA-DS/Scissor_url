import express from 'express'
import config from 'config'
import cors, { CorsOptions } from 'cors'
import routes from './routes'
import db from './db'
import bodyParser from 'body-parser'
const app = express()

const port = config.get("port")

const allowedOrigins: string[] = [
    'https://scissor-ui.vercel.app',
    'https://scissor-lxuc4wqvv-tahirdads-projects.vercel.app',  // Your new Vercel frontend
  ];
  
  const corsOptions: CorsOptions = {
    origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);  // Allow the request
      } else {
        callback(new Error('Not allowed by CORS'));  // Deny the request
      }
    },
  };
  
  app.use(cors(corsOptions));
  
  // Handle preflight requests
  app.options('*', cors(corsOptions));
app.use(bodyParser.json())



app.listen(port, ()=>{
    console.log(`App running on http://localhost:${port}`)
    db();
    routes(app)
})