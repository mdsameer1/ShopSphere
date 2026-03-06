import express from "express";
import "dotenv/config";
import connectDB from "./database/db.js";
import userRoute from "./routes/userRoute.js"

const app =express();
const port=process.env.port||3000;

app.use(express.json());

app.use('/api/v1/user',userRoute)

//http:localhost:8000/api/v1/user/register

app.listen(port,()=>{
    connectDB()
    console.log(`server is listening on port ${port}`)
})