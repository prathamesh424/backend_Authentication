import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"))
app.use(cookieParser());

   
// Import routes
import userRouter from './routes/user.routes.js';

app.get('/', (req, res) => {
    res.send('Hello World!');
  });


// routes declarations
app.use("/users", userRouter);




export {app}