import { app } from "./app.js";
import connection from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({ path: './.env' })
connection()
.then(()=>app.listen(process.env.PORT,()=> {console.log(`app listening on port ${process.env.PORT}`)}))
.catch((err)=>{
    console.log(err)
})
