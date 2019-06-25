import express = require("express");

class Server {
    private app:express.Application;

    constructor(){
        this.app = express()
    }

    public getRoute(){
        this.app.get("/", (req:express.Request, res:express.Response)=>{
            res.send("okkkkk")
        })
    }

}

const server:Server  = new Server();