import mongoose from "mongoose";
import "dotenv/config";

const connectDB=async()=>{
    try{
await mongoose.connect(`${process.env.mongo_uri}/Ekart`);
console.log("mongoDB connected successfully");
    }
    catch(error){
        console.log(error)
    }
};

export default connectDB