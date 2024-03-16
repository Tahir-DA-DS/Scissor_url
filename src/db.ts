import mongoose, {ConnectOptions} from "mongoose";
import config from "config";

 async function db (){

    const dbUri: string = config.get('dbUri')
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