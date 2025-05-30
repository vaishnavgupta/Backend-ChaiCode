//require('dotenv').config({path:'./env'})

import dotenv from "dotenv"
import connectDB from "./db/index.js";


dotenv.config({
    path:"./env"
})


connectDB()








// Connecting DB using ifis --> A function that is executed immediately


/*

import express from "express"
const app = express()

( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

        app.on("error",(error) => {
            console.log("Express Error",error);
            throw error;
        })

        app.listen(process.env.PORT,()=>{
            console.log(`Express app listening on Port Number ${process.env.PORT}`);
        })

    } catch (error) {
        console.log("ERROR: ",error)
        throw error
    }
} )()

*/