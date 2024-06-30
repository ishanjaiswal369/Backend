// require('dotenv').config()

import dotenv from "dotenv";
// import mongoose from "mongoose";
// import { DB_NAME } from "./constant";
import connectDB from "./db/index.js";
import express from "express";
const app = express();

dotenv.config({
  path: "./env",
});

connectDB().
then(()=>{
  app.listen(process.env.PORT || 8000, ()=>{
    console.log(`App is listening on PORT ${process.env.PORT}`)
  })
  app.on('error',(error)=>{
      console.log('Error:',error)
      throw error
  })
})
.catch((error)=>{
      console.log("MongoDb connection failed!!!", error);
})

// (async ()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on('error',(error)=>{
//             console.log(error) 
//             throw error
//         })

//         app.listen(process.env.PORT,()=>{
//             console.log(`App is listening on PORT ${process.env.PORT}`)
//         })
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// })()
