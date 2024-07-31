import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: "./.env"
});

connectDB()
.then(()=> {
    app.listen(process.env.PORT || 3000 , () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    });
})
.catch(err => {
    console.log(`Error connecting to DB : ${err}`);
});










// const app = express();

// ( async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
//         app.on("error" , (error) =>{
//             console.log('Error' , error);
//             throw error
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`App is running on port ${process.env.PORT}`)
//         })
//     } catch (error) {
//         console.log(`Error: ${error}`)
//         throw error
//     }
// })()
