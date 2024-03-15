import express from 'express'
import config from 'config'
import cors from 'cors'
import routes from './routes'
import db from './db'
import bodyParser from 'body-parser'
const app = express()

const port = config.get('port')

app.use(cors({origin:config.get("corsOrigin")}))
app.use(bodyParser.json())



app.listen(port, ()=>{
    console.log(`App running on http://localhost:${port}`)
    db();
    routes(app)
})