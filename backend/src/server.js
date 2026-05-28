//const express = require('express')
import express from "express";
import dotenv from "dotenv";
import router from "./routes/auth.route.js";
import message from "./routes/message.route.js";
import messageRouter from "./routes/message.route.js";

dotenv.config();
const app = express();
app.use("/api/auth",router);

app.use("/api/message",messageRouter);

console.log(process.env.PORT);
app.listen(3000 , ()=>{
    console.log("server running on port : 12345")
})