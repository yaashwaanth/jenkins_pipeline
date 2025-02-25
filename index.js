const express = require("express");

const app = express();

app.get('/health',(req,res)=>{
    res.send({
        status: 200,
        message:"Server is working fine"
    })
})

app.listen(8000,()=>console.log("Sever is listenign to port 8000"))