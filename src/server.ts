import express from "express";
import colors from "colors";
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan'
import router from "./router";
import db from "./config/db";
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from "./config/swagger";

//Connection to DB
export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.bgGreen.bold("Successfully connected to DB"));
  } catch (error) {
    console.log(error);
    console.log(colors.red.bold("Error trying to connect"));
  }
}

connectDB();

const server = express();

// Allow Connections
const corsOptions: CorsOptions = {
  origin: function(origin, callback){
    if (origin === process.env.FRONTEND_URL){
      callback(null, true)
    }else{
      callback(new Error('CORS error'))
    }
  }
}

server.use(cors(corsOptions))

//Read data
server.use(express.json());

server.use(morgan('dev'))
server.use("/api/products", router);

//Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default server;
