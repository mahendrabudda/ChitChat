import express from "express";
const messageRouter = express.Router();


messageRouter.get("/send",(req,res)=>{
    res.send("Mahendra logged in")
})
export default messageRouter;