import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";




const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
        console.log(`Connected to MongoDB : ${connection.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
}


export default connectDB;