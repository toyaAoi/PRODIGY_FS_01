import express from 'express';
import mongoose from 'mongoose';
import { config } from './config.js';
import cors from 'cors'
import router from './routes.js';
import bodyParser from 'body-parser';



const app = express();
// app.use(express.json());
app.use(bodyParser.json()); 

mongoose
.connect (config.dbUrl)
.then(()=>{
    console.log("Database is connected successfully")
})
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials:true
}));
app.use("/",router)


app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
