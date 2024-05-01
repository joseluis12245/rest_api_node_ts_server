import express from "express";
import colors from "colors"
import router from "./router";
import db from "./config/db";

//Connection to DB
async function connectDB() {
  try {
    await db.authenticate()
    db.sync()
    console.log(colors.bgGreen.bold('Successfully connected to DB'))
  } catch (error) {
    console.log(error);
    console.log(colors.red.bold("Error trying to connect"));
  }
}

connectDB()


const server = express();

//Read data
server.use(express.json())

server.use("/api/products", router);

export default server;
