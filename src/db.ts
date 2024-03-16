import mongoose, {ConnectOptions} from "mongoose";
import config from "config";

 async function db (){

    const dbUri = process.env.DB_URI as string
    try {
        await mongoose
        .connect(dbUri, {useNewUrlParser:true, useUnifiedTopology:true}as ConnectOptions)
        .then(()=>{
            console.log(`db connected to ${dbUri}`);
            
        })
    } catch (e) {
        console.log(e)
    }

 }

export default db